import data from './pages.json';

export interface PageMeta {
  path: string;
  nav: string;
  title: string;
  description: string;
}

export const siteMeta = data.site;
export const pages: PageMeta[] = data.pages;
export const notFoundPage: PageMeta = data.notFound;

export function pageForPath(path: string): PageMeta | undefined {
  return pages.find((page) => page.path === path);
}
