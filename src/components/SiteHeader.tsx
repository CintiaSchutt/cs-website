import { useEffect, useRef, useState } from 'react';
import { pages } from '../content/pages';
import { Link, NavLink, useRouter } from '../router';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Escape closes the menu and returns focus to its button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // The DOM order (logo, menu button, nav, theme button) is deliberate: it keeps keyboard
  // order in step with what the menu reveals. layout.css lines them up visually.
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label="Cintia Schutt, home">
          <Logo />
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>

        <nav id="site-nav" className="site-nav" aria-label="Primary" data-open={open}>
          <ul>
            {pages.map((page) => (
              <li key={page.path}>
                <NavLink to={page.path}>{page.nav}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
