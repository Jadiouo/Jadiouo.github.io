# jadiouo.github.io

Personal project index, served by GitHub Pages from this repo's `main` branch. No build step.

- `config.js` — name, tagline, links, featured repos, topic → group mapping, about text. Edit this.
- `app.js` — fetches public repos from the GitHub API, groups them by topic, renders cards (cached 30 min in sessionStorage).
- `style.css` — layout and light/dark theme.

Preview locally: `python -m http.server 8765` then open http://localhost:8765.
