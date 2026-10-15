import type { Role } from '../content/types';
import { formatMonth } from '../lib/format';

/** One role in the work history. The `id` is a link target (/experience#qhr). */
export function ExperienceEntry({ role }: { role: Role }) {
  const headingId = `${role.id}-title`;
  return (
    <article className="entry" id={role.id} tabIndex={-1} aria-labelledby={headingId}>
      <div className="entry__meta">
        <p>
          <time dateTime={role.start}>{formatMonth(role.start)}</time>
          {' – '}
          {role.end ? <time dateTime={role.end}>{formatMonth(role.end)}</time> : 'Present'}
        </p>
        <p>{role.location}</p>
      </div>
      <div className="entry__body">
        <h3 id={headingId}>
          {role.title}{' '}
          <span className="entry__org">{role.organization}</span>
        </h3>
        {role.context ? <p className="entry__context">{role.context}</p> : null}
        {role.highlights.length > 0 ? (
          <ul className="bullets">
            {role.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {role.tools ? (
          <ul className="chip-list" aria-label={`Tools and technologies at ${role.organization}`}>
            {role.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
