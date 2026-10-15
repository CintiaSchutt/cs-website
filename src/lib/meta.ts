import { siteMeta, type PageMeta } from '../content/pages';

/** "/about" -> "https://cintiaschutt.com/about/" (GitHub Pages serves folders with a trailing slash). */
export function canonicalUrl(path: string): string {
  return `${siteMeta.url}${path === '/' ? '/' : `${path}/`}`;
}

function setContent(selector: string, attribute: 'content' | 'href', value: string): void {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
}

/** Keeps the document title and metadata in step with the current route. */
export function applyPageMeta(page: PageMeta): void {
  const url = canonicalUrl(page.path);
  document.title = page.title;
  setContent('meta[name="description"]', 'content', page.description);
  setContent('link[rel="canonical"]', 'href', url);
  setContent('meta[property="og:title"]', 'content', page.title);
  setContent('meta[property="og:description"]', 'content', page.description);
  setContent('meta[property="og:url"]', 'content', url);
  setContent('meta[name="twitter:title"]', 'content', page.title);
  setContent('meta[name="twitter:description"]', 'content', page.description);
}
