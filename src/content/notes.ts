import { Marked, type Tokens } from 'marked';
import { roadmap } from './notes-roadmap';

/**
 * Study notes, one Markdown file per topic in src/content/notes/.
 *
 * Each file starts with a small header between --- lines:
 *
 *   ---
 *   title: OpenID Connect
 *   summary: One sentence shown in the topic list.
 *   updated: 2026-10-15
 *   ---
 *
 * The file name is the topic's slug in notes-roadmap.ts: oidc.md is /notes/oidc.
 * The roadmap decides each note's area and order.
 */

export interface Note {
  slug: string;
  title: string;
  /** The roadmap area's name, or "Other" for a note not in the roadmap. */
  category: string;
  summary: string;
  updated?: string;
  html: string;
}

export interface NoteCategory {
  name: string;
  notes: Note[];
}

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

function render(body: string): string {
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
        return `<h${level} id="${id}" tabindex="-1">${inner}</h${level}>\n`;
      },
    },
  });
  return marked.parse(body, { async: false });
}

const areaForSlug = new Map(roadmap.flatMap((area) => area.topics.map((topic) => [topic.slug, area.name])));

const notesBySlug = new Map<string, Note>(
  Object.entries(files).map(([file, source]) => {
    const slug = file.replace(/^.*\/|\.md$/g, '');
    const { data, body } = parseFrontMatter(source);
    const note: Note = {
      slug,
      title: data.title ?? slug,
      category: areaForSlug.get(slug) ?? 'Other',
      summary: data.summary ?? '',
      updated: data.updated,
      html: render(body),
    };
    return [slug, note];
  }),
);

/** Published notes grouped by roadmap area, in roadmap order. Areas with no notes yet are left out. */
export const noteCategories: NoteCategory[] = [
  ...roadmap.map((area) => ({
    name: area.name,
    notes: area.topics.map((topic) => notesBySlug.get(topic.slug)).filter((note): note is Note => !!note),
  })),
  {
    name: 'Other',
    notes: [...notesBySlug.values()].filter((note) => note.category === 'Other'),
  },
].filter((category) => category.notes.length > 0);

export function noteForSlug(slug: string): Note | undefined {
  return notesBySlug.get(slug);
}
