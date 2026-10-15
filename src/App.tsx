import { useEffect, type ReactNode } from 'react';
import { Layout } from './components/Layout';
import { notFoundPage, pageForPath } from './content/pages';
import { applyPageMeta } from './lib/meta';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Experience } from './pages/Experience';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Projects } from './pages/Projects';
import { useRouter } from './router';

const routes: Record<string, () => ReactNode> = {
  '/': Home,
  '/about': About,
  '/experience': Experience,
  '/projects': Projects,
  '/contact': Contact,
};

export function App() {
  const { path } = useRouter();
  const Page = routes[path] ?? NotFound;
  const meta = pageForPath(path) ?? notFoundPage;

  useEffect(() => {
    applyPageMeta(meta);
  }, [meta]);

  return (
    <Layout>
      <Page />
    </Layout>
  );
}
