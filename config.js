// Edit this file to change what the site says. Everything else is fetched from GitHub.
window.SITE = {
  user: "Jadiouo",
  name: "何皓廷 · Hao-Ting (Lex) Ho",
  tagline: "東海大學電機，2027 畢業。做機器人：狀態估計與感測器融合最深，控制從國中開始，ROS 2 與嵌入式做到實機，現在把力氣放在多機器人。每個演算法自己寫一遍、放進模擬器裡量給自己看。",
  taglineEn: "Robotics student, Tunghai University (EE, class of 2027). State estimation and sensor fusion, control, ROS 2 and embedded down to real hardware; now working on multi-robot systems. I write the algorithms myself so I know where they break.",
  links: [
    { label: "GitHub", href: "https://github.com/Jadiouo" },
    // { label: "Email", href: "mailto:you@example.com" },
    // { label: "CV", href: "cv.pdf" },
  ],

  // Repos pinned at the top, in this order. Optional `blurb` overrides the GitHub description.
  featured: [
    { repo: "gz-drone-swarm-pursuit", blurb: "3D 無人機群體合作追捕（Gazebo Harmonic + ROS 2 Jazzy）。自由飛行的微重力動力學，同時是太空近距離操作的地面試驗台。" },
    { repo: "boids-swarm-pursuit", blurb: "ROS 2 多機器人群體智慧：分散式、局部感知的 boids 合作圍捕 2× 速度的目標。" },
    { repo: "pixels-to-pose", blurb: "ArUco 偵測 + 6-DoF 位姿估計，合成資料、驗證優先；為 JAXA Kibo-RPC 的視覺模組而做。" },
    { repo: "path-planning-and-tracking", blurb: "A*/RRT* 規劃與 Pure Pursuit / Stanley / LQR 追蹤，自己的模擬器與 benchmark，速度包絡前瞻煞車消融實驗。" },
    { repo: "linear-algebra-lab", blurb: "從向量空間公理到 AI：八個互動專案，核心演算法全部手刻，588 個單元測試。" },
    { repo: "bayesian-inference-portfolio", blurb: "一條式子 p(θ|D) ∝ p(D|θ)·p(θ)，五個領域、十個完整專案。" },
    { repo: "scarce-actuator-arbitration", blurb: "兩台機器人都呼叫唯一能幫忙的致動器時，「先服務最緊急的」在 urgency 不可驗證時還成立嗎？" },
    { repo: "voicetype", blurb: "Fcitx5 語音聽寫模組（Rust）：按住熱鍵說話、放開後文字出現在游標處，全本機推論、0 VRAM。" },
  ],

  // Topic -> group. First match wins; repos with no matching topic go to "other".
  groups: [
    { id: "robotics", title: "機器人與多機器人", en: "Robotics & multi-robot",
      topics: ["swarm-robotics", "multi-robot", "drone-swarm", "space-robotics", "ros2", "gazebo", "webots", "robotics", "kibo-rpc"] },
    { id: "control", title: "控制與規劃", en: "Control & planning",
      topics: ["control-theory", "path-planning", "path-tracking", "lqr", "cart-pole", "a-star", "rrt-star", "decision-making", "game-theory"] },
    { id: "perception", title: "感知與機器學習", en: "Perception & ML",
      topics: ["computer-vision", "pose-estimation", "rag", "llm", "embeddings", "speech-to-text", "sensor-fusion", "imu", "bayesian-inference", "statistics"] },
    { id: "math", title: "數學與教學", en: "Math & teaching",
      topics: ["linear-algebra", "education", "math-visualization"] },
    { id: "embedded", title: "嵌入式與硬體", en: "Embedded & hardware",
      topics: ["arduino", "esp32", "embedded", "oled", "pyserial"] },
    { id: "tools", title: "工具", en: "Tools",
      topics: ["cli", "productivity", "markdown", "pandoc", "transcription", "fcitx5", "simulation", "monte-carlo"] },
  ],

  // Repos never shown (forks are hidden automatically).
  hide: ["Jadiouo", "Jadiouo.github.io", "desktop-tutorial"],

  about: `
    <p>目前在做的：<strong>TartanIMU Challenge</strong>（CMU AirLab，IROS 2026 workshop）——單一模型跨 car / drone / quadruped / handheld 四種平台的 IMU 估計；<strong>感知劣化環境下的多機器人主動探索</strong>——大學專題，寫成 letter 投 IEEE RA-L；一篇關於 sensor-only 加速度計偏差估計之測量效度的論文，投稿 IEEE Transactions on Instrumentation and Measurement（審稿中）。</p>
    <p>這個頁面沒有建置步驟：<code>config.js</code> 決定精選與分組，其餘資料由瀏覽器直接向 GitHub API 讀取，所以新增 repo、加上 topics 之後這裡就會自動出現。</p>
  `,
};
