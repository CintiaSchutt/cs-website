import type { ReactNode } from 'react';
import { Link } from '../router';

interface Props {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  /** Internal page, e.g. "/projects". */
  to?: string;
  /** Any other URL, e.g. "mailto:…" or a file download. */
  href?: string;
}

/** A link styled as a button. Use `to` for pages on this site and `href` for everything else. */
export function ButtonLink({ children, variant = 'primary', to, href }: Props) {
  const className = `button button--${variant}`;
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
