import type { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  children: ReactNode;
}

/** A titled block with the heading in a left column on wide screens. Its `id` is a link target (/projects#studying). */
export function Section({ id, title, children }: Props) {
  return (
    <section id={id} tabIndex={-1} className="section" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="section__title">
        {title}
      </h2>
      <div className="section__body">{children}</div>
    </section>
  );
}
