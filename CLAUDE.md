# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

The public marketing site for the **Lecture Recorder** Chrome extension — a
landing page, a privacy policy, and a post-install welcome page. It is a
**static site with no build step, no dependencies, and no framework**. Just
hand-written HTML with inline `<style>` and a few lines of inline vanilla JS.

- **Live site:** `lecture-recorder.app` (Cloudflare Pages)
- **Extension repo:** https://github.com/Alkhimik888/lecture-recorder
- **Chrome Web Store:** `chromewebstore.google.com/detail/lecture-recorder/gainffdhnjidkmidjnapihokjpdcajeh`

## Repository layout

```
index.html          Landing page (hero, modes, promises, privacy teaser, footer)
privacy.html         Full privacy policy (12 numbered sections)
welcome/
  index.html         Post-install page — pin-to-toolbar walkthrough (noindex)
  mockup-1.png        Screenshot: pin via the puzzle menu
  mockup-2.png        Screenshot: pinned toolbar icon
icons/
  icon16.png          Favicon 16x16
  icon32.png          Favicon 32x32
  icon128.png         Apple touch icon
wrangler.jsonc        Cloudflare Pages deploy config
README.md             Human-facing overview
```

Every page is **fully self-contained**: CSS lives in a `<style>` block in the
`<head>`, and JS lives in a `<script>` block before `</body>`. There are no
shared/external CSS or JS files — edits to one page do not propagate to others.

## Local preview

No build, no install. Open a file directly or serve the folder:

```
python -m http.server 8765   # then visit http://localhost:8765
```

## Deploy

Cloudflare Pages **auto-deploys on push to `main`**. `wrangler.jsonc` serves
the repo root as static assets (`"directory": "."`). The custom domain and DNS
are configured in the Cloudflare dashboard, not in this repo.

There is **no CI, no test suite, and no linter**. Verify changes by opening the
page in a browser (check both light and dark themes, and the mobile breakpoint).

## Conventions

### Design system — "Pietra warm" palette

All three pages share the same warm cream + orange palette (it matches the
extension popup). Colors are defined as CSS custom properties in a
`:root, html[data-theme="light"]{ … }` block, with a `html[data-theme="dark"]{ … }`
override block. **Reuse the existing tokens — never hard-code a hex value** that
duplicates a token. Core tokens:

| Token         | Light       | Meaning                        |
|---------------|-------------|--------------------------------|
| `--bg`        | `#f7eddc`   | page background (cream)        |
| `--bg-soft`   | `#fbf4e6`   | soft surface                   |
| `--espresso`  | `#1a0e08`   | primary text                   |
| `--muted`     | `#6b554a`   | muted text                     |
| `--orange`    | `#d14525`   | accent — links, CTAs, brand    |
| `--line`      | `#e4d4b6`   | borders / dividers             |

`index.html` and `privacy.html` carry the full token set; `welcome/index.html`
uses a trimmed subset. If you add a page, copy the full token block from
`index.html`.

Font: **Inter** (weights 400–900) loaded from Google Fonts. System sans-serif
fallback. Monospace (`code`) uses SF Mono / JetBrains Mono.

### Theme toggle

Each page has a fixed circular `.theme-toggle` button (moon/sun SVGs) wired by a
small IIFE before `</body>`. The script reads/writes a **page-specific**
localStorage key and toggles `data-theme` on `<html>`:

- Landing → `lr-landing-theme`
- Welcome → `lr-welcome-theme`

Pages **default to light** (`<html data-theme="light">`). Auto-dark via
`prefers-color-scheme` was intentionally removed (commit `8a3f8bc`) — do not
reintroduce it. Keep the `<html>` opening tag's `data-theme="light"` default.

### Markup style

- HTML5, `<!doctype html>`, `lang="en"`.
- Sections delimited with comment rules like `/* ── Section ── */` in CSS and
  semantic `<section id="…">`, `<header class="site">`, `<footer class="site">`.
- External links use `target="_blank" rel="noopener"`.
- Responsive: a `@media (max-width:640px)` block per page. Respect
  `@media (prefers-reduced-motion:reduce)` for animations.
- Keep accessibility affordances: `aria-label` on the toggle, `aria-hidden` on
  decorative `.glow`, descriptive `alt` text on images.

### Analytics

`index.html` and `welcome/index.html` include the **Yandex.Metrika** counter
(ID `109790116`) at the top of `<head>`. `privacy.html` does **not**. Keep this
snippet intact when editing those pages; the welcome page is `noindex`.

## Key facts to keep consistent

When editing copy, these claims must stay aligned across pages and with the
actual extension behavior:

- The recording is captured by Chrome's `tabCapture` API and written **straight
  to the user's Downloads** — the site/operator never sees the media file.
- AI Notes audio is sent over HTTPS, transcribed, and **deleted within 60
  seconds**.
- There is a **300-minute monthly limit** on AI Notes.
- Every mode produces a media file plus a `.docx` (summary + transcript).
- The footer version string (`© 2026 lecture-recorder · v0.3`) tracks the
  extension release — bump it deliberately, not incidentally.

The privacy policy URL used in the Chrome Web Store listing is
`https://lecture-recorder.app/privacy.html` — do not rename or move that file.

## Git workflow

- Commit messages follow **Conventional Commits** scoped by page/area, e.g.
  `feat(landing): …`, `feat(welcome): …`, `feat(privacy): …`,
  `fix(theme): …`, `feat(analytics): …`.
- `.claude/` and wrangler local files (`.wrangler`, `.dev.vars*`, `.env*`) are
  gitignored.
- Pushing to `main` triggers a production deploy — be deliberate.
