import { Marked, type Tokens } from 'marked';

/**
 * Study notes, one Markdown file per topic in src/content/notes/.
 *
 * Each file starts with a small header between --- lines:
 *
 *   ---
 *   title: OpenID Connect
 *   category: Identity protocols
 *   summary: One sentence shown in the topic list.
 *   updated: 2026-10-15
 *   ---
 *
 * The file name becomes the address: oidc.md is /notes/oidc. Topics are
 * grouped by `category` in the sidebar, in the order of CATEGORY_ORDER below.
 */

export interface NoteHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Note {
  slug: string;
  title: string;
  category: string;
  summary: string;
  updated?: string;
  html: string;
  headings: NoteHeading[];
}

export interface NoteCategory {
  name: string;
  notes: Note[];
}

/** Categories listed here come first, in this order; any others follow alphabetically. */
const CATEGORY_ORDER = ['Identity protocols', 'Authentication', 'Access control'];

const files = import.meta.glob('./notes/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

function parseFrontMatter(source: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { data: {}, body: source };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(':');
    if (index > 0) data[line.slice(0, index).trim()] = line.slice(index + 1).trim();
  }
  return { data, body: source.slice(match[0].length) };
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function render(body: string): { html: string; headings: NoteHeading[] } {
  const headings: NoteHeading[] = [];
  const used = new Set<string>();
  const marked = new Marked({
    renderer: {
      heading(this: { parser: { parseInline: (tokens: Tokens.Generic[]) => string } }, { tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        // Notes start at h2: the page title is the only h1.
        const level = Math.min(Math.max(depth, 2), 6);
        let id = slugify(inner) || 'section';
        while (used.has(id)) id += '-1';
        used.add(id);
        if (level === 2 || level === 3) {
          headings.push({ id, text: inner.replace(/<[^>]+>/g, ''), level });
        }
        return `<h${level} id="${id}" tabindex="-1">${inner}</h${level}>\n`;
      },
    },
  });
  return { html: marked.parse(body, { async: false }), headings };
}

export const notes: Note[] = Object.entries(files)
  .map(([file, source]) => {
    const slug = file.replace(/^.*\/|\.md$/g, '');
    const { data, body } = parseFrontMatter(source);
    return {
      slug,
      title: data.title ?? slug,
      category: data.category ?? 'Other',
      summary: data.summary ?? '',
      updated: data.updated,
      ...render(body),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export const noteCategories: NoteCategory[] = [...new Set(notes.map((note) => note.category))]
  .sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
    return a.localeCompare(b);
  })
  .map((name) => ({ name, notes: notes.filter((note) => note.category === name) }));

export function noteForSlug(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}
