(function () {
  const S = window.SITE;
  const API = `https://api.github.com/users/${S.user}/repos?per_page=100&sort=updated`;
  const CACHE_KEY = "repos:" + S.user;
  const CACHE_TTL = 30 * 60 * 1000; // 30 min, keeps well inside the 60 req/h unauthenticated limit

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else node.setAttribute(k, v);
    }
    for (const c of children) if (c != null) node.append(c);
    return node;
  };

  // ---------------------------------------------------------------- header
  $("#site-name").textContent = S.name;
  $("#tagline").textContent = S.tagline;
  $("#tagline-en").textContent = S.taglineEn || "";
  for (const l of S.links) $("#links").append(el("a", { href: l.href, rel: "me" }, l.label));
  $("#about-body").innerHTML = S.about;

  // ---------------------------------------------------------------- data
  async function loadRepos() {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      if (cached && Date.now() - cached.at < CACHE_TTL) return cached.repos;
    } catch (_) { /* storage unavailable: fall through */ }
    const res = await fetch(API, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repos = await res.json();
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos })); } catch (_) { /* ignore */ }
    return repos;
  }

  const LANG_COLORS = { Python: "#3572A5", Rust: "#dea584", JavaScript: "#f1e05a", "C++": "#f34b7d", C: "#555555",
    "Jupyter Notebook": "#DA5B0B", HTML: "#e34c26", Shell: "#89e051", TypeScript: "#3178c6" };

  function fmtDate(iso) {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }

  function card(repo, blurb) {
    const lang = repo.language;
    const meta = el("div", { class: "meta" });
    if (lang) meta.append(el("span", { class: "lang" }, el("i", { style: `background:${LANG_COLORS[lang] || "#999"}` }), lang));
    if (repo.stargazers_count) meta.append(el("span", {}, `★ ${repo.stargazers_count}`));
    meta.append(el("span", { class: "muted" }, `更新 ${fmtDate(repo.pushed_at)}`));
    const topics = el("div", { class: "topics" }, ...(repo.topics || []).slice(0, 6).map((t) => el("span", { class: "chip" }, t)));
    const links = el("div", { class: "card-links" }, el("a", { href: repo.html_url }, "GitHub ↗"));
    if (repo.homepage) links.append(el("a", { href: repo.homepage }, "Demo ↗"));
    return el("article", { class: "card" },
      el("h3", {}, el("a", { href: repo.html_url }, repo.name)),
      el("p", { class: "desc" }, blurb || repo.description || ""),
      topics, meta, links);
  }

  function groupOf(repo) {
    const topics = new Set(repo.topics || []);
    for (const g of S.groups) if (g.topics.some((t) => topics.has(t))) return g.id;
    return "other";
  }

  // ---------------------------------------------------------------- render
  loadRepos().then((all) => {
    const byName = Object.fromEntries(all.map((r) => [r.name, r]));
    const visible = all.filter((r) => !r.fork && !S.hide.includes(r.name));

    // featured: keep config order, skip repos the API cannot see (private / renamed)
    const fg = $("#featured-grid");
    fg.innerHTML = "";
    for (const f of S.featured) {
      const r = byName[f.repo];
      if (r) fg.append(card(r, f.blurb));
    }
    if (!fg.children.length) fg.append(el("p", { class: "muted" }, "（尚無公開的精選專案）"));

    // all projects grouped
    const groups = $("#groups");
    const buckets = {};
    for (const r of visible) (buckets[groupOf(r)] ||= []).push(r);
    const order = [...S.groups, { id: "other", title: "其他", en: "Other" }];
    for (const g of order) {
      const repos = (buckets[g.id] || []).sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
      if (!repos.length) continue;
      groups.append(el("h3", { class: "group-title" }, g.title, " ", el("span", { class: "en" }, g.en),
        el("span", { class: "count" }, ` ${repos.length}`)));
      groups.append(el("div", { class: "grid" }, ...repos.map((r) => card(r))));
    }
    $("#all-note").textContent = `${visible.length} 個公開專案，依 topic 分組；資料來自 GitHub API。`;
  }).catch((err) => {
    $("#featured-grid").innerHTML = "";
    $("#all-note").textContent = `無法從 GitHub 讀取資料（${err.message}）。直接看 github.com/${S.user}。`;
  });
})();
