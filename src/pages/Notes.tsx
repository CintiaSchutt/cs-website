import type { ReactNode } from 'react';
import { PageHeader } from '../components/PageHeader';
import { noteCategories, noteForSlug, type Note } from '../content/notes';
import { formatMonth } from '../lib/format';
import { Link, NavLink } from '../router';
import { NotFound } from './NotFound';

/** Sidebar with every topic, grouped by category. On small screens it folds into a "Topics" menu. */
function NotesSidebar() {
  const list = (
    <nav aria-label="Notes topics" className="notes-nav">
      <NavLink to="/notes" className="notes-nav__home">
        All topics
      </NavLink>
      {noteCategories.map((category) => (
        <div key={category.name} className="notes-nav__group">
          <p className="notes-nav__category">{category.name}</p>
          <ul>
            {category.notes.map((note) => (
              <li key={note.slug}>
                <NavLink to={`/notes/${note.slug}`}>{note.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <aside className="notes__sidebar">
      <details className="notes__menu">
        <summary>Topics</summary>
        {list}
      </details>
      <div className="notes__menu-wide">{list}</div>
    </aside>
  );
}

function NotesShell({ children, toc }: { children: ReactNode; toc?: ReactNode }) {
  return (
    <div className="container page">
      <div className={`notes ${toc ? 'notes--with-toc' : ''}`}>
        <NotesSidebar />
        <div className="notes__main">{children}</div>
        {toc}
      </div>
    </div>
  );
}

export function NotesIndex() {
  return (
    <NotesShell>
      <PageHeader title="Notes" lede="My study summaries on identity and access management, kept short and in my own words." />
      {noteCategories.map((category) => (
        <section key={category.name} className="notes-group" aria-labelledby={`cat-${category.name}`}>
          <h2 id={`cat-${category.name}`} className="section__title">
            {category.name}
          </h2>
          <ul className="notes-cards">
            {category.notes.map((note) => (
              <li key={note.slug} className="notes-card">
                <h3>
                  <Link to={`/notes/${note.slug}`}>{note.title}</Link>
                </h3>
                <p>{note.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </NotesShell>
  );
}

function OnThisPage({ note }: { note: Note }) {
  if (note.headings.length < 2) return null;
  return (
    <nav className="notes__toc" aria-label="On this page">
      <p className="notes-nav__category">On this page</p>
      <ul>
        {note.headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'notes__toc-sub' : undefined}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function NotePage({ slug }: { slug: string }) {
  const note = noteForSlug(slug);
  if (!note) return <NotFound />;

  return (
    <NotesShell toc={<OnThisPage note={note} />}>
      <p className="notes__breadcrumb">
        <Link to="/notes">Notes</Link> <span aria-hidden="true">/</span> {note.category}
      </p>
      <PageHeader title={note.title} lede={note.summary} />
      {/* Notes are your own Markdown files from src/content/notes, rendered at build time. */}
      <article className="prose" dangerouslySetInnerHTML={{ __html: note.html }} />
      {note.updated ? <p className="notes__updated">Last updated {formatMonth(note.updated.slice(0, 7))}</p> : null}
    </NotesShell>
  );
}
