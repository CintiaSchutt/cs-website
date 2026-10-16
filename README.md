# cintiaschutt.com

Personal portfolio for Cintia Schutt, a software developer who specializes in identity:
sign-in, single sign-on and identity and access management (IAM).

Built with React, TypeScript and Vite. The previous Angular site is in the git history.

## Run it

Requires Node 20.19 or newer.

```bash
npm install        # once
npm run dev        # local site at http://localhost:5173
npm run check      # type-check
npm run build      # production build into dist/ (also writes per-page HTML, sitemap, CSP)
npm run preview    # serve the production build locally
```

Pushing to `main` runs `.github/workflows/deploy.yml`, which checks, builds and publishes
`dist/` with GitHub's official Pages actions (Settings → Pages → Source: GitHub Actions). It uses a
short-lived token GitHub issues for each run, so no secret is stored. The custom domain is set in
Settings → Pages.

## Design

- **Themes:** light (warm paper, eggplant accent) and dark (the original near-black page, sand
  accent). The site follows the visitor's system setting; the button in the header overrides it
  and the choice is remembered in the browser. Colours are tokens in `src/styles/tokens.css`;
  change a dark colour in both dark blocks and check the result by eye.
- **Logo:** `src/components/Logo.tsx` (theme-aware) and `public/favicon.svg`. Both are a clean
  redraw of the original CS mark. If you have the original vector file, swap it in.
- **Illustration:** `public/illustration.webp`, shown large on Home and faintly behind other pages.
- **Fonts:** Instrument Serif and Instrument Sans, loaded from Google Fonts (see below).

## Security notes

GitHub Pages cannot send HTTP security headers, so the site does what a static page can:

- A strict **Content-Security-Policy** meta tag is added to every page at build time
  (`scripts/postbuild.mjs`): everything from the site itself by default, no inline scripts,
  no plugins, `upgrade-insecure-requests`. The saved-theme script is an external file
  (`public/theme-init.js`) for that reason.
- No analytics, trackers, forms or backend. The only third-party requests are Google Fonts
  (`fonts.googleapis.com`, `fonts.gstatic.com`), allowed by name in the policy.
- External links use `rel="noopener noreferrer"`; `referrer` policy is `strict-origin-when-cross-origin`.
- `public/.well-known/security.txt` gives a contact for security reports. **Its `Expires` date must
  be renewed at least yearly** (currently 2027-10-14).
- Deployment uses GitHub's official Pages actions: the build job can only read the repository, the
  deploy job can only publish to Pages, and its token lasts one run. Actions are pinned to commit SHAs.
- `.github/dependabot.yml` opens grouped pull requests once a month for dependency and GitHub Actions
  updates. Security fixes arrive as soon as an alert is raised (with Dependabot security updates on).
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
src/content/                  the words: pages, projects, education, experience, strengths, site details
src/content/notes/            study notes, one Markdown file per topic (oidc.md is /notes/oidc)
src/content/notes-roadmap.ts  the Notes topics, grouped by area; unwritten topics show greyed out
src/pages/                    one file per page
src/components/               header, logo, theme toggle, project card, experience entry, and so on
src/styles/                   tokens (colours, type, space), base, layout, components, notes
src/router.tsx                a small History API router that manages focus for keyboard and screen-reader users
scripts/                      postbuild.mjs (per-page HTML including each note, sitemap, CSP)
.github/                      deploy workflow and Dependabot settings
public/                       files copied as they are: favicon, illustration, security.txt
```
