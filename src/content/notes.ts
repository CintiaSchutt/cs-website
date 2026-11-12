import { Lexer, Marked, type Tokens } from 'marked';
import { roadmap } from './notes-roadmap';

/**
 * Study notes, one Markdown file per topic in src/content/notes/.
 *
 * Each file starts with a small header between --- lines:
 *
 *   ---
 *   title: OpenID Connect
 *   summary: One sentence shown in the topic list.
 *   ---
 *
 * The file name is the topic's slug in notes-roadmap.ts: oidc.md is /notes/oidc.
 * The roadmap decides each note's area and order.
 *
 * A fenced block with the language "flashcards" becomes a set of cards. Cards
 * are separated by a blank line; each has a "Q:" line and an "A:" line (the
 * answer may continue on the next lines). Inline Markdown works in both.
 */

export interface Note {
  slug: string;
  title: string;
  /** The roadmap area's name, or "Other" for a note not in the roadmap. */
  category: string;
  summary: string;
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

const escapeAttribute = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type RendererThis = { parser: { parseInline: (tokens: Tokens.Generic[]) => string } };

interface Flashcard {
  question: string;
  answer: string;
}

function parseFlashcards(text: string): Flashcard[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => /^Q:\s*([\s\S]+?)\n\s*A:\s*([\s\S]+)$/.exec(block.trim()))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => ({ question: match[1].trim(), answer: match[2].replace(/\s*\n\s*/g, ' ').trim() }));
}

/** Native <details> cards: keyboard and screen-reader friendly, and no script needed under the CSP. */
function renderFlashcards(cards: Flashcard[], inline: (source: string) => string): string {
  const items = cards
    .map(
      (card) =>
        `<li><details class="flashcard"><summary class="flashcard__question">${inline(card.question)}` +
        `<span class="flashcard__toggle" aria-hidden="true"><span class="flashcard__show">Show answer</span>` +
        `<span class="flashcard__hide">Hide answer</span></span></summary>` +
        `<div class="flashcard__answer">${inline(card.answer)}</div></details></li>`,
    )
    .join('');
  return (
    `<div class="flashcards"><p class="flashcards__hint">Answer in your head first, then open a card to check.</p>` +
    `<ol class="flashcards__list">${items}</ol></div>\n`
  );
}

function render(body: string): string {
  const used = new Set<string>();
  const marked = new Marked({
    renderer: {
      code(this: RendererThis, { text, lang }: Tokens.Code) {
        if (lang !== 'flashcards') return false;
        const cards = parseFlashcards(text);
        if (cards.length === 0) return false;
        return renderFlashcards(cards, (source) => this.parser.parseInline(Lexer.lexInline(source) as Tokens.Generic[]));
      },
      // External links open in a new tab, like components/ExternalLink.tsx.
      // Links between notes (/notes/...) keep marked's default output.
      link(this: RendererThis, { href, title, tokens }: Tokens.Link) {
        if (!/^https?:\/\//i.test(href)) return false;
        const inner = this.parser.parseInline(tokens);
        const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : '';
        return `<a href="${escapeAttribute(href)}"${titleAttribute} target="_blank" rel="noopener noreferrer">${inner}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
      },
      heading(this: RendererThis, { tokens, depth }: Tokens.Heading) {
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
