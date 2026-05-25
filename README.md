# lecture-recorder-website

Public landing page and privacy policy for the [Lecture Recorder](https://github.com/Alkhimik888/lecture-recorder) Chrome extension. Hosted on Cloudflare Pages at `lecture-recorder.app`.

## What's in here (production deploy)

- `index.html` — landing page (Pietra warm palette: cream + orange)
- `privacy.html` — full privacy policy
- `welcome/index.html` — post-install welcome page with pin-to-toolbar walkthrough
- `welcome/mockup-1.png`, `welcome/mockup-2.png` — screenshots used on the welcome page
- `icons/icon{16,32,128}.png` — favicons + Apple touch icon
- `wrangler.jsonc` — Cloudflare Pages deploy config

## Local preview

Open `index.html` directly in any browser. No build step, no dependencies.

```
start index.html
```

Or run a local server:

```
python -m http.server 8765
```

Then visit `http://localhost:8765`.

## Deploy

The site is deployed via Cloudflare Pages (auto-deploys on push to `main`). Custom domain `lecture-recorder.app` is configured in the Cloudflare dashboard.

The privacy policy URL used in the Chrome Web Store listing is `https://lecture-recorder.app/privacy.html`.

## Design

The landing and welcome page share the **Pietra warm palette** (matches the extension popup):

- Background: warm cream `#f7eddc` / `#fbf4e6`
- Primary text (espresso): `#1a0e08`
- Muted: `#6b554a` / `#8a7669`
- Orange accent: `#d14525` (links, CTAs, brand mark)
- Lines / borders: `#e4d4b6` / `#d8c39b`

Dark theme is supported via `html[data-theme="dark"]`.

Font: Inter (weights 400–900).

## License

Site content: MIT, same as the Lecture Recorder extension.
