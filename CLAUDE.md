# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio + demo site for Valerio Francesco Puglisi (AI Architect / Senior ML Engineer), hosted on **GitHub Pages** at `valeriopuglisi.github.io`. Pure static site — no build step, no package manager, no framework, no bundler. Files are served as-is from the repo root.

## Commands

There is no build/test tooling. Development is direct file editing + browser reload.

- **Preview locally**: open any `.html` file directly, or run a static server:
  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000/
  ```
- **Deploy**: any push to `main` is auto-published by GitHub Pages. There is no CI, no linter, no test runner.

## Architecture

### Two independent style systems

The repo hosts **two visually disjoint sites** under one domain, and they must stay CSS-isolated:

1. **Portfolio** (root: `index.html`, `about.html`, `experience.html`, `projects.html`, `blog/*`)
   - Dark futuristic theme: navy/teal/indigo, `Outfit`/`Inter`/`JetBrains Mono` fonts, glassmorphism, neural-network canvas background.
   - Shared assets: `style.css` (single file, all portfolio styles) and `script.js` (neural canvas + mobile nav + typing animation).
   - Every portfolio page reloads the same nav manually (there is no include/template system) — when navigation changes, edit **every** page (`index.html`, `about.html`, `experience.html`, `projects.html`, `demos/index.html`, `blog/index.html`, `blog/antigravity.html`).

2. **Demo sites** (`demos/*.html`)
   - Standalone client-facing mock sites (e.g. `demos/dental.html` = "Studio Dentistico Sorriso"), each meant to look like a real business site — NOT part of the portfolio visually.
   - Each demo brings its own CSS (e.g. `demos/dental.css`) and its own `<body class="…">` scope class. Do **not** load `style.css` in a standalone demo, and do **not** put demo-specific rules into `style.css`.
   - Demos usually embed an ElevenLabs Convai widget at the bottom:
     ```html
     <elevenlabs-convai agent-id="agent_..."></elevenlabs-convai>
     <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async></script>
     ```
     Each demo has its **own** agent-id (dental agent ≠ homepage agent). Do not swap them.

### Shared conventions across portfolio pages

- Navbar and footer are **duplicated** in every HTML file. There is no partial/include mechanism — accept the duplication and edit all files together.
- Font Awesome 6.4.0 and Google Fonts are loaded from CDN.
- The neural-network background canvas (`<canvas id="neural-canvas">`) is required only on portfolio pages; `script.js` guards on element presence so it is safe to keep the script tag on any portfolio page.
- The homepage contact section (`index.html#contact`) contains the primary ElevenLabs agent `agent_5701k8n7bzyyfasb5nn7086zyt20` — this is the "AI clone of Valerio", distinct from any demo agent.

### External dependencies (all CDN, no local install)

- Google Fonts (Inter, Outfit, JetBrains Mono)
- Font Awesome 6.4.0
- `@elevenlabs/convai-widget-embed` (loaded per-page only where the widget appears)

## When adding a new demo

1. Create `demos/<slug>.html` + `demos/<slug>.css`, standalone (portfolio navbar/footer removed, replaced by the demo's own brand).
2. Add a card in `demos/index.html` under the appropriate sector section.
3. Do not touch `style.css` for demo styles; keep them in the demo's own CSS file.
4. Add a small discreet back-link to `../index.html` so users can return to the portfolio.

## When editing global navigation

Update the `<ul class="nav-menu">` in **all** portfolio HTML files at once. The numbered prefixes (`01. About`, `02. Experience`, …) must stay sequential across pages; adjust numbers everywhere when inserting/removing items.
