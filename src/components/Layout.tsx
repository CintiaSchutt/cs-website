import type { ReactNode } from 'react';
import { useRouter } from '../router';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function Layout({ children }: { children: ReactNode }) {
  const { path } = useRouter();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      {/* Decorative: the Home page shows the illustration in its hero, other pages get a faint copy. */}
      {path !== '/' ? (
        <img className="ghost" src="/illustration.webp" alt="" width="1100" height="1033" aria-hidden="true" />
      ) : null}
    </>
  );
}
