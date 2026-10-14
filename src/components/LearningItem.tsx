import type { LearningEntry } from '../content/types';
import { Placeholder } from './Placeholder';
import { StatusBadge } from './StatusBadge';

/** One course, certification or topic. The `id` is a link target (/projects#webauthn). */
export function LearningItem({ entry }: { entry: LearningEntry }) {
  const headingId = `${entry.id}-title`;
  return (
    <li className="learning-item" id={entry.id} tabIndex={-1}>
      <article aria-labelledby={headingId}>
        <p className="learning-item__meta">
          <StatusBadge status={entry.status} />
          <span className="learning-item__kind">{entry.kind}</span>
          {entry.period ? <span>{entry.period}</span> : null}
        </p>
        <h3 id={headingId}>{entry.title}</h3>
        {entry.provider ? <p className="learning-item__provider">{entry.provider}</p> : null}
        {entry.note ? <p>{entry.note}</p> : null}
        {entry.placeholder ? (
          <Placeholder>
            Replace the bracketed text, then delete <code>placeholder: true</code> in{' '}
            <code>src/content/learning.ts</code> to publish it.
          </Placeholder>
        ) : null}
      </article>
    </li>
  );
}
