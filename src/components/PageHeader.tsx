import type { ReactNode } from 'react';

interface Props {
  /** Decorative section number, e.g. "02". */
  index: string;
  /** Short label shown above the title, e.g. "About". */
  label: string;
  title: ReactNode;
  lede?: ReactNode;
}

/** The opening block of every inner page. Its <h1> receives focus after navigation. */
export function PageHeader({ index, label, title, lede }: Props) {
  return (
    <header className="page-header">
      <p className="page-header__label">
        <span className="page-header__index" aria-hidden="true">
          {index}
        </span>
        <span>{label}</span>
      </p>
      <h1 tabIndex={-1}>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  );
}
