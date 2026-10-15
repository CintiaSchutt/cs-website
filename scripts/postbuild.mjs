/**
 * Runs after `vite build` (see the "build" script in package.json).
 *
 * GitHub Pages serves static files and cannot rewrite URLs, so a client-side
 * router alone would give every page the same <title>, and deep links such as
 * /about would 404. This script fixes that by turning the single built
 * index.html into one HTML file per route, each with its own title,
 * description and canonical URL. It also writes:
 *
 *   - 404.html      the same app shell, so unknown URLs show the "not found" page
 *   - sitemap.xml   every route in src/content/pages.json
 *
 * and adds a strict Content-Security-Policy <meta> tag to every page. GitHub
 * Pages cannot send HTTP security headers, so the meta tag is the available
 * mechanism. The policy allows this site's own files for scripts, styles and
 * images, and no third-party scripts. The tag is added here rather than in
 * index.html because Vite's dev server needs inline scripts that the policy
 * would block.
 *
 * The only third-party hosts allowed are Google Fonts' two (stylesheet and font
 * files). Self-hosting the fonts lets you delete both and tighten the policy.
 *
 * Usage: node scripts/postbuild.mjs [distDir]   (distDir defaults to ./dist)
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(process.argv[2] ?? path.join(root, 'dist'));

const { site, pages, notFound } = JSON.parse(
  await readFile(path.join(root, 'src/content/pages.json'), 'utf8'),
);

const START = '<!--page-meta:start-->';
const END = '<!--page-meta:end-->';

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com",
  "img-src 'self' data:",
  "font-src https://fonts.gstatic.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

const escapeHtml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const canonicalFor = (route) => `${site.url}${route === '/' ? '/' : `${route}/`}`;

function metaBlock(page, { indexable }) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const lines = [`<title>${title}</title>`, `<meta name="description" content="${description}" />`];
  if (indexable) {
    const url = canonicalFor(page.path);
    lines.push(`<link rel="canonical" href="${url}" />`);
    lines.push(`<meta property="og:url" content="${url}" />`);
  } else {
    lines.push('<meta name="robots" content="noindex" />');
  }
  lines.push(
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
  );
  return lines.map((line) => `    ${line}`).join('\n');
}

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const start = template.indexOf(START);
const end = template.indexOf(END);
if (start === -1 || end === -1 || end < start) {
  throw new Error(`Could not find ${START} … ${END} in ${path.join(dist, 'index.html')}`);
}

function withCsp(html) {
  if (html.includes('http-equiv="Content-Security-Policy"')) return html;
  const tag = `<meta http-equiv="Content-Security-Policy" content="${CSP}" />`;
  const charset = /<meta charset="[^"]*"\s*\/?>/i;
  return charset.test(html)
    ? html.replace(charset, (match) => `${match}\n    ${tag}`)
    : html.replace('<head>', `<head>\n    ${tag}`);
}

function render(page, options) {
  const html =
    template.slice(0, start + START.length) +
    '\n' +
    metaBlock(page, options) +
    '\n    ' +
    template.slice(end);
  return withCsp(html);
}

async function writePage(relativePath, html) {
  const target = path.join(dist, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
  console.log(`  wrote ${path.relative(root, target)}`);
}

console.log(`Post-processing ${path.relative(root, dist) || '.'}`);

for (const page of pages) {
  const file = page.path === '/' ? 'index.html' : path.join(page.path.slice(1), 'index.html');
  await writePage(file, render(page, { indexable: true }));
}
await writePage('404.html', render(notFound, { indexable: false }));

const urls = pages
  .map((page) => `  <url><loc>${canonicalFor(page.path)}</loc></url>`)
  .join('\n');
await writePage(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log('Done.');
