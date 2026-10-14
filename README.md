# cintiaschutt.com

Personal portfolio for Cintia Schutt: a software developer moving into cybersecurity,
with a focus on identity and access management (IAM).

Built with React, TypeScript and Vite. The previous Angular site is kept, untouched, in
[`legacy-angular/`](legacy-angular/README.md) and in the git history.

## Run it

Requires Node 20.19 or newer.

```bash
npm install        # once
npm run dev        # local site at http://localhost:5173, with placeholder reminders shown
npm run check      # type-check and colour-contrast test (both themes)
npm run build      # production build into dist/ (also writes per-page HTML, sitemap, CSP)
npm run preview    # serve the production build locally
```

Pushing to `main` runs `.github/workflows/deploy.yml`, which checks, builds and publishes
`dist/` to the `gh-pages` branch (GitHub Pages, custom domain in `public/CNAME`). The workflow
needs a `GH_TOKEN` secret in the repository settings.

## Update the content

Everything you will edit lives in `src/content/`:

| To change | Edit |
| --- | --- |
| Add a project or lab write-up | `projects.ts` (copy an entry, put it at the top) |
| Add a course, certification or topic | `learning.ts` (`status`: `completed`, `in-progress` or `planned`) |
| Work history | `experience.ts` |
| Strengths and the evidence behind each | `strengths.ts` |
| Email, links, location, résumé | `site.ts` |
| Page titles and descriptions | `pages.json` |
| Career timeline and "why identity and access" | `src/pages/About.tsx` |

Entries marked `placeholder: true` show only in `npm run dev`, never on the published site.
Only mark learning `completed` when it is. Replace `public/cintia_schutt_resume.pdf` to update the résumé.

## Design

- **Themes:** light (warm paper, eggplant accent) and dark (the original near-black page, sand
  accent). The site follows the visitor's system setting; the button in the header overrides it
  and the choice is remembered in the browser. Colours are tokens in `src/styles/tokens.css`;
  run `npm run check:contrast` after changing any.
- **Logo:** `src/components/Logo.tsx` (theme-aware) and `public/favicon.svg`. Both are a clean
  redraw of the original CS mark. If you have the original vector file, swap it in.
- **Illustration:** `public/illustration.webp`, shown large on Home and faintly behind other pages.
- **Fonts:** Instrument Serif and Instrument Sans, loaded from Google Fonts (see below).

## Security notes

GitHub Pages cannot send HTTP security headers, so the site does what a static page can:

- A strict **Content-Security-Policy** meta tag is added to every page at build time
  (`scripts/postbuild.mjs`): scripts only from the site itself, no inline scripts, no frames,
  no plugins, `upgrade-insecure-requests`. The saved-theme script is an external file
  (`public/theme-init.js`) for that reason.
- No analytics, trackers, forms or backend. The only third-party requests are Google Fonts
  (`fonts.googleapis.com`, `fonts.gstatic.com`), allowed by name in the policy.
- External links use `rel="noopener noreferrer"`; `referrer` policy is `strict-origin-when-cross-origin`.
- `public/.well-known/security.txt` gives a contact for security reports. **Its `Expires` date must
  be renewed at least yearly** (currently 2027-10-14).
- The workflow runs with read-only repository permissions, and `.github/dependabot.yml` opens weekly
  pull requests for dependency and GitHub Actions updates.
- Not possible on GitHub Pages: response headers such as HSTS, `frame-ancestors` and
  `Permissions-Policy`. Putting the site behind a service that can add headers (for example Cloudflare)
  would close that gap. GitHub Pages' "Enforce HTTPS" setting should be on.

### Fonts: self-hosting instead of Google Fonts

To stop visitors' browsers contacting Google and tighten the policy further:

1. `npm install @fontsource/instrument-serif @fontsource-variable/instrument-sans`
   (check the package names on fontsource.org if npm cannot find them).
2. Import them at the top of `src/main.tsx`, for example `import '@fontsource/instrument-serif';`
   and `import '@fontsource-variable/instrument-sans';` (the variable package may register the family as
   "Instrument Sans Variable": if so, add that name first in `--font-body` in `tokens.css`).
3. Delete the three Google Fonts `<link>` tags in `index.html`.
4. In `scripts/postbuild.mjs`, change `style-src` to `'self'` and `font-src` to `'self'`.

## Project layout

```
src/content/    your words: projects, learning, experience, strengths, site details
src/pages/      one file per page
src/components/ header, logo, theme toggle, project card, experience entry, and so on
src/styles/     tokens (colours, type, space), base, layout, components
src/router.tsx  a small History API router that manages focus for keyboard and screen-reader users
scripts/        postbuild.mjs (per-page HTML, sitemap, CSP) and check-contrast.mjs
public/         files copied as they are: favicon, résumé, illustration, security.txt
```
