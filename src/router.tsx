import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';

/*
 * A deliberately small router for a site with a handful of static pages.
 * It uses the History API, so URLs are real paths (/about, /projects#slug),
 * and it takes care of the details that matter for accessibility: after a
 * navigation it moves focus to the page's <h1> (or to the #fragment target)
 * so keyboard and screen-reader users land at the start of the new content.
 */

type NavigationType = 'initial' | 'push' | 'pop';

interface Location {
  path: string;
  hash: string;
  type: NavigationType;
}

interface RouterValue extends Location {
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

/** "/about/" -> "/about", "" -> "/" */
function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function readLocation(type: NavigationType): Location {
  return {
    path: normalizePath(window.location.pathname),
    hash: window.location.hash,
    type,
  };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(() => readLocation('initial'));
  const handled = useRef<string | null>(null);

  useEffect(() => {
    const onPopState = () => setLocation(readLocation('pop'));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    const next = `${normalizePath(url.pathname)}${url.search}${url.hash}`;
    const current = `${normalizePath(window.location.pathname)}${window.location.search}${window.location.hash}`;
    if (next !== current) {
      window.history.pushState(null, '', next);
    }
    setLocation({ path: normalizePath(url.pathname), hash: url.hash, type: 'push' });
  }, []);

  // Scroll and focus management after the new page has rendered.
  useEffect(() => {
    const key = `${location.path}${location.hash}:${location.type}`;
    if (handled.current === key) return;
    const isFirstRender = handled.current === null;
    handled.current = key;

    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
        return;
      }
    }
    if (isFirstRender) return;
    if (location.type === 'push') window.scrollTo(0, 0);
    document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true });
  }, [location]);

  const value = useMemo<RouterValue>(() => ({ ...location, navigate }), [location, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterValue {
  const value = useContext(RouterContext);
  if (!value) throw new Error('useRouter must be used inside <RouterProvider>');
  return value;
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

/** A normal <a href> that navigates without a full page load. */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (rest.target && rest.target !== '_self')
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };

  return (
    <a {...rest} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

/** A <Link> that marks itself with aria-current="page" when it points at the current page. */
export function NavLink({ to, ...rest }: LinkProps) {
  const { path } = useRouter();
  const isCurrent = normalizePath(to.split('#')[0] || '/') === path;
  return <Link {...rest} to={to} aria-current={isCurrent ? 'page' : undefined} />;
}
