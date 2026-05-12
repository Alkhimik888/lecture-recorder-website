# lecture-recorder-website

Public landing page and privacy policy for the [Lecture Recorder](https://github.com/Alkhimik888/lecture-recorder) Chrome extension. Hosted via GitHub Pages.

## What's in here (production deploy)

- `index.html` — landing page (Linear-minimal light theme, palette F gamma: graphite/amber/red on warm off-white)
- `privacy.html` — full privacy policy (matching style)
- `README.md` — this file

Everything else in this folder (files starting with `v1-`, `v2-`, `v3-`, etc., plus `chooser*.html`, `compare.html`, `a-default.html`) are design drafts kept for reference. They are not part of the deploy.

## Local preview

Open `index.html` directly in any browser. No build step, no dependencies.

```
start index.html
```

Or via address bar: copy-paste the absolute path into Chrome.

## Deploy to GitHub Pages

1. Create a **public** repo named `lecture-recorder-website` under your GitHub account (`Alkhimik888`).
2. Copy `index.html`, `privacy.html`, and this `README.md` to the repo root. Do **not** include the v*-*.html drafts.
3. Push to `main`.
4. Repo Settings → Pages → Source: `Deploy from a branch` → `main` / `(root)` → Save.
5. After ~1 minute the site is live at `https://Alkhimik888.github.io/lecture-recorder-website/`.
6. Use `https://Alkhimik888.github.io/lecture-recorder-website/privacy.html` in the Chrome Web Store listing's **Privacy policy URL** field.

## Before publishing — placeholders to fill

The privacy page has three placeholders that need to be replaced before going live:

- `[will-be-set-on-publish]` — replace with the date when the policy goes live (e.g., `12 May 2026`).
- `[vps-region]` — replace with the VPS region (e.g., `Hetzner, Germany` or `DigitalOcean, NYC`).
- `[subprocessors-url]` — replace with the URL of the sub-processors list, once a domain is registered. Until then, can leave the placeholder text or remove that sentence.

Email contact `lecturerecorder8@gmail.com` is already filled in.

## Design notes

The landing follows **palette F** from `D:\Dev\bootcamp\design\01-tokens.md` (graphite/amber/red), inverted to light theme:

- Background: warm off-white `#FAFAF7`
- Primary text: `#1A1A1A`
- Secondary text: `#5C5C5A`
- Amber accent (surfaces, buttons): `#E0A040` base, `#A06820` for text-on-light readability
- Red REC: `#E14545` (used only on the brand-mark dot and in the popup mockup)
- Fonts: Inter (UI) + JetBrains Mono (technical / mono labels)

The **dark popup mockup** in the hero stays in actual product colors from `D:\Dev\bootcamp\popup\popup.css` (`#1A1A1A` / `#F59E0B` / `#DC2626`) — it looks like a real Chrome extension popup floating over the light page.

## Changes from spec

Content reflects current product decisions (as of 2026-05-12):

- Three recording modes: **Audio / Audio + Mic / Video** (the old "Audio + Video" two-file mode is gone)
- AI Notes is in MVP, not a v1.1 feature
- 300 minutes a month for free, no signup, no API key entry
- Backend handles AI processing (Deepgram + OpenAI), audio deleted in 60 seconds
- Anonymous `install_id` for quota tracking, no PII

Privacy policy reflects the same architecture and lists sub-processors generically (the names will live on a separate `/subprocessors` page once the domain is registered).

## License

Site content: MIT, same as the Lecture Recorder extension.
