import type { ReactNode } from 'react';
import { PageHeader } from '../components/PageHeader';
import { noteCategories, noteForSlug } from '../content/notes';
import { roadmap } from '../content/notes-roadmap';
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

function NotesShell({ children }: { children: ReactNode }) {
  return (
    <div className="container page">
      <div className="notes">
        <NotesSidebar />
        <div className="notes__main">{children}</div>
      </div>
    </div>
  );
}

export function NotesIndex() {
  return (
    <NotesShell>
      <PageHeader
        title="Notes"
        lede="My study notes on identity and access management, in the order I’m learning it."
      />
      <ol className="roadmap">
        {roadmap.map((area, index) => (
          <li key={area.id} className="roadmap__area">
            <h2 id={`area-${area.id}`}>
              <span className="roadmap__number">{index + 1}</span> {area.name}
            </h2>
            <p className="roadmap__description">{area.description}</p>
            <ul className="roadmap__topics">
              {area.topics.map((topic) => {
                const note = noteForSlug(topic.slug);
                return (
                  <li key={topic.slug} className={note ? undefined : 'roadmap__topic--planned'}>
                    {note ? (
                      <Link to={`/notes/${topic.slug}`}>{topic.title}</Link>
                    ) : (
                      <span>
                        {topic.title}
                        <span className="visually-hidden"> (planned)</span>
                      </span>
                    )}
                    {topic.vendor ? <span className="notes-tag">{topic.vendor}</span> : null}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </NotesShell>
  );
}

export function NotePage({ slug }: { slug: string }) {
  const note = noteForSlug(slug);
  if (!note) return <NotFound />;

  return (
    <NotesShell>
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
