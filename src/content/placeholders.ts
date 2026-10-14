/**
 * Placeholder entries are template content that helps you see where your own
 * material goes. They are visible while you run `npm run dev`, and hidden from
 * production builds so nothing unfinished is ever published.
 *
 * To preview them in a production build, set VITE_SHOW_PLACEHOLDERS=true.
 */
export const showPlaceholders: boolean =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === 'true';

export function visible<T extends { placeholder?: boolean }>(items: readonly T[]): T[] {
  return items.filter((item) => showPlaceholders || !item.placeholder);
}
