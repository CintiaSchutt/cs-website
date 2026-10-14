import type { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  lede?: ReactNode;
}

/** The opening block of every inner page. Its <h1> receives focus after navigation. */
export function PageHeader({ title, lede }: Props) {
  return (
    <header className="page-header">
      <h1 tabIndex={-1}>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  );
}
