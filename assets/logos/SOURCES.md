# Logo sources

All files are the brands' own marks. Trademarks belong to their respective owners and are used nominatively (to say "works with X"), not to imply endorsement. Marks are used as fetched; none were recolored.

| File | Source URL | Notes / license |
|---|---|---|
| `google.svg` | https://cdn.simpleicons.org/google | Simple Icons, CC0. Brand fill baked in (`#4285F4`). |
| `apple.svg` | https://cdn.simpleicons.org/apple | Simple Icons, CC0. Fill `#000000`. |
| `square.svg` | https://cdn.simpleicons.org/square | Simple Icons, CC0. Fill `#3E4348`. |
| `stripe.svg` | https://cdn.simpleicons.org/stripe | Simple Icons, CC0. Fill `#635BFF`. |
| `claude.svg` | https://cdn.simpleicons.org/claude | Simple Icons, CC0. Fill `#D97757`. |
| `openai.svg` | https://cdn.jsdelivr.net/npm/simple-icons@13/icons/openai.svg | Simple Icons v13 npm package, CC0. `cdn.simpleicons.org/openai` now 404s (icon removed from later releases). No `fill` attribute, so it renders black inside `<img>`. |
| `microsoftbing.svg` | https://cdn.jsdelivr.net/npm/simple-icons@11/icons/microsoftbing.svg | Simple Icons v11 npm package, CC0. Removed from later releases. No `fill` attribute, renders black. |
| `clover.svg` | https://cloverstatic.com/content/icons/web/favicons/safari-pinned-tab.svg | Clover's own site asset (the monochrome "pinned tab" variant of the official four-leaf mark, linked from clover.com's homepage). Clover trademark. Note: server sends it gzip-encoded; fetch with `curl --compressed`. |
| `toast.svg` | https://commons.wikimedia.org/wiki/File:Toast_logo.svg (https://upload.wikimedia.org/wikipedia/commons/3/3d/Toast_logo.svg) | The Commons file is the full "toast" wordmark in brand orange `#ff4c00`, credited to pos.toasttab.com. This repo keeps only the toast-slice path (the 4th path, viewBox cropped to `0 0 5.2 4.753`); nothing was redrawn or recolored. Commons lists it as public domain, which is a copyright claim only: the mark remains a Toast, Inc. trademark. Toast's own press/brand pages (pos.toasttab.com) return 403 to non-browser requests, and Google's favicon service only returned a 31 px raster, so this was the best vector source. |

Not used: Brandfetch's CDN (`cdn.brandfetch.io/<domain>`) returned HTML, not an image, without a client id; Clearbit's logo API no longer resolves.

The printer icon in the page is not a brand and stays as an inline SVG symbol in `index.html`.
