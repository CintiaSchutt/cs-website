import { useEffect, type ReactNode } from 'react';
import { Layout } from './components/Layout';
import { noteForSlug } from './content/notes';
import { notFoundPage, pageForPath, siteMeta, type PageMeta } from './content/pages';
import { applyPageMeta } from './lib/meta';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Experience } from './pages/Experience';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { NotePage, NotesIndex } from './pages/Notes';
import { Projects } from './pages/Projects';
import { useRouter } from './router';

const routes: Record<string, () => ReactNode> = {
  '/': Home,
  '/about': About,
  '/experience': Experience,
  '/projects': Projects,
  '/notes': NotesIndex,
  '/contact': Contact,
};

/** Metadata for /notes/<slug>, built from the note itself. */
function noteMeta(path: string): PageMeta | undefined {
  const note = path.startsWith('/notes/') ? noteForSlug(path.slice('/notes/'.length)) : undefined;
  return note
    ? { path, nav: 'Notes', title: `${note.title} — Notes — ${siteMeta.name}`, description: note.summary }
    : undefined;
}

export function App() {
  const { path } = useRouter();
  const notePage = path.startsWith('/notes/') ? () => <NotePage slug={path.slice('/notes/'.length)} /> : undefined;
  const Page = routes[path] ?? notePage ?? NotFound;
  const meta = pageForPath(path) ?? noteMeta(path) ?? notFoundPage;

  useEffect(() => {
    applyPageMeta(meta);
  }, [meta]);

  return (
    <Layout>
      <Page />
    </Layout>
  );
}
