import type { AnchorHTMLAttributes } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>;

/** A link that opens in a new tab, announced as such to assistive technology. */
export function ExternalLink({ children, ...rest }: Props) {
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
