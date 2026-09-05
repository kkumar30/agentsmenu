# Counter — landing page

Static landing page for **Counter**, agent-ready pickup ordering for independent restaurants: a live page that Claude, ChatGPT, and Google can find, read, and order from, with the ticket sent straight to the kitchen.

No build step, no framework, no bundler. Plain HTML, one CSS file, one JS file. The only external resource is Google Fonts.

```
index.html          page markup (all copy lives here)
css/styles.css      styles; single light "flour" theme
js/main.js          hero chat->ticket loop, how-it-works diagram timeline, agent-first demo, signup confirmation
assets/favicon.svg  tab icon
assets/logos/       brand marks used on the page (see assets/logos/SOURCES.md)
.nojekyll           tells GitHub Pages to serve the folder as-is
```

## Run locally

Any static server works. From the repo root:

```
python3 -m http.server 8080
# or
npx serve
```

Then open http://localhost:8080. (Opening `index.html` directly from disk also works; the fonts load from Google either way.)

## Deploy

**GitHub Pages.** Push to GitHub, then Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`. The `.nojekyll` file is already there. All asset paths are relative, so it also works under a `/<repo>/` subpath.

**Vercel.** `npx vercel` from the repo root, or import the repo in the Vercel dashboard. Framework preset: *Other*. No build command, output directory `.`.

**Netlify.** Drag the folder onto app.netlify.com, or connect the repo. Build command: none. Publish directory: `.`.

## Where things live

- **Copy**: everything is in `index.html`, top to bottom in page order (nav, hero, how it works, agent-ready demo, works with, price, questions, signup, footer). The hero's example ticket and text message are in the `#mock` block. The agent-view menu (`/menu.md` demo) and the 86 replies are data in `js/main.js` (`items` array and `renderReply`).
- **Palette and type**: CSS custom properties at the top of `css/styles.css` (`--paper` flour ground, `--ink` charcoal, `--sun`/`--accent` butter yellow, `--hot` tomato for buttons, `--money` green).
- **Animations**: the hero loop timings are the `at(ms, ...)` calls in `js/main.js`; the diagram timeline is the `T` array (seconds). Both respect `prefers-reduced-motion`.

## Swapping a logo

Drop the new file into `assets/logos/` and reference it by path. Logos appear in four places:

1. Hero "Works with" row: `<img class="bi" src="assets/logos/x.svg" alt="X">`
2. Works-with tiles: same `<img class="bi">` inside `.wm`
3. The how-it-works diagram (an inline SVG): `<image href="assets/logos/x.svg" x=".." y=".." width="14" height="14"/>`
4. The chat titlebar, built in `js/main.js` (`apps` array: slug, display name, composer placeholder). The slug must match a filename in `assets/logos/`.

Sizes are set in CSS (`.bi`, `.works-row .bi`, `.appname .bi`), not in the image files. Record the source and license in `assets/logos/SOURCES.md`.

## Known placeholders

- **"Counter" is a working name** (the footer says so). Rename in `index.html` (`<title>`, meta tags, nav logo, footer, the "Reply from Counter" line in `js/main.js`) and `assets/favicon.svg`.
- **The signup form posts nowhere.** It is a real `<form method="post" action="#">` with an in-place confirmation handled in `js/main.js`. To wire it, point `action` at your endpoint (Formspree, Netlify Forms, a small worker) and remove that handler. There is a comment at both spots.
- **$99 a month is a proposal**, not a committed price. It appears in the hero lead, the Price section, and the meta description.
- **No `og:url` / `og:image` yet.** Add them once the site has a domain and a share image.
- Statistics cited in the footer (BrightLocal 2026, Uberall May 2026) should be re-checked before launch.
