# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Standalone client-facing **demo sites** — each `demos/<slug>.html` is meant to look and feel like a real business site (a dental clinic, a hotel, a restaurant, …), not like part of the portfolio at the repo root. `demos/index.html` is the demo hub that lists them by sector.

Each demo showcases a voice AI agent (ElevenLabs Convai) grounded on the demo's content as knowledge base — the site content **is** the agent's context, so page copy and pricing tables must stay consistent with what the agent should say.

## Hard rules for this folder

1. **No `style.css` here.** Demos never link the root portfolio stylesheet. Each demo ships its own `demos/<slug>.css`. Do not add demo rules to the root `style.css`, and do not import it from a demo page.
2. **Own `<body>` scope class.** Use `<body class="<slug>-site">` so styles are namespaceable and cannot leak. Example: `body.dental-site`.
3. **No portfolio navbar/footer** on a standalone demo. Replace them with the demo's own brand nav and footer. The only link back to the portfolio is a small discreet back-link (see `demos/dental.html`'s `.portfolio-back`).
4. **Each demo has its own ElevenLabs agent-id.** They are not interchangeable. The homepage agent (`agent_5701k8n7bzyyfasb5nn7086zyt20`, "AI clone of Valerio") must never appear in a demo, and demo agent-ids must never appear on the portfolio.
5. **Language matches the demo persona.** The default `lang` reflects the primary market of the demo (dental → `lang="it"`). For multi-language demos, load `<slug>.i18n.js` and mark every user-visible string with `data-i18n="key"` (or `data-i18n-attr="attr:key"` for attributes) — do NOT hardcode both languages side by side.

## i18n pattern (see `dental.i18n.js`)

- Dictionary is a single JSON object per locale under `dict[lang]`. Keep keys stable; refactor only when the whole language block changes.
- The engine reads the target language from `?lang=` URL param first, then `localStorage`, then `navigator.language`, then falls back to the demo's default. Persist the user's choice in `localStorage` and reflect it in the URL (`history.replaceState`) — never full-reload.
- Update `<html lang>`, `<meta name="description">`, `<meta property="og:locale">` and `<title>` on every language change (SEO enterprise).
- Add `<link rel="alternate" hreflang="…">` tags for each supported locale in `<head>`.
- The language switcher exposes `window.__setLang(lang)` and `window.__getLang()`. Use them from inline `onclick` (e.g. `onclick="window.__setLang('en')"`) and to branch runtime strings like alert texts.

## Enterprise checklist for a new demo

When building a demo, target the polish level of a real production site — this is what makes the agent credible. Every demo should include:

- SEO: `<title>`, `meta description`, `meta keywords`, Open Graph, `theme-color`, correct `lang`
- **JSON-LD Schema.org** for the vertical (e.g. `Dentist`, `Restaurant`, `Hotel`) with address, hours, aggregate rating
- Accessibility: skip-link to `#main`, `aria-label` on nav/toggle, `aria-expanded` toggled by JS, semantic sections
- Sticky top bar with contacts + sticky nav with a **prominent orange "Chiama Ora" / call CTA** — clicking-to-call is the primary conversion goal
- `tel:` and `mailto:` links everywhere phone/email appear (not just plain text)
- Cookie banner (static, no tracking logic needed — just the UI)
- Mobile floating call button
- Booking form with HTML5 validation and GDPR consent checkbox
- Footer with legal info that the vertical actually requires (for healthcare in Italy: P.IVA, REA, Direttore Sanitario + n. Albo, autorizzazione sanitaria)
- ElevenLabs Convai widget block near the bottom, wrapped in a card that signals "AI powered"

## Adding a new demo

1. Create `demos/<slug>.html` and `demos/<slug>.css` (copy `dental.*` as a starting scaffold; rename the `<body>` class and CSS namespace).
2. Update the agent-id and all copy.
3. Add a `<a href="<slug>.html" class="demo-card">` card in `demos/index.html` under the right sector section (create the section if the sector is new). Placeholder future demos use `class="demo-card glass-card coming-soon"` and no `href`.
4. Add a card in `demos/index.html`; do **not** touch other portfolio pages.
5. Keep the discreet back-link `<a href="../index.html" class="portfolio-back">` so users can return.

## `demos/index.html` exception

The demo hub `demos/index.html` is the one file in this folder that **does** use the portfolio look (it loads `../style.css` and shows the portfolio navbar). It is the bridge between portfolio and demos, not a demo itself. Do not restyle it to look like a business site.
