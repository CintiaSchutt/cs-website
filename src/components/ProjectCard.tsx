import type { Project } from '../content/types';
import { Link } from '../router';
import { ExternalLink } from './ExternalLink';
import { StatusBadge } from './StatusBadge';

interface Props {
  project: Project;
  /** "full" shows every field; "compact" is the short version used on the Home page. */
  variant?: 'full' | 'compact';
}

export function ProjectCard({ project, variant = 'full' }: Props) {
  const headingId = `${project.slug}-title`;
  const isFull = variant === 'full';

  return (
    <article
      className={`project project--${variant}`}
      id={isFull ? project.slug : undefined}
      tabIndex={isFull ? -1 : undefined}
      aria-labelledby={headingId}
    >
      <p className="project__status">
        <StatusBadge status={project.status} />
        {project.period ? <span className="project__period">{project.period}</span> : null}
      </p>

      <h3 id={headingId}>
        {isFull ? project.title : <Link to={`/projects#${project.slug}`}>{project.title}</Link>}
      </h3>
      <p className="project__summary">{project.summary}</p>

      {isFull ? (
        <>
          <dl className="project__facts">
            <div>
              <dt>Goal</dt>
              <dd>{project.goal}</dd>
            </div>
            <div>
              <dt>Tools and methods</dt>
              <dd>
                <ul className="chip-list">
                  {project.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>What I did</dt>
              <dd>
                <ul className="bullets">
                  {project.whatIDid.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>What I learned</dt>
              <dd>{project.whatILearned}</dd>
            </div>
          </dl>

          {project.links?.length ? (
            <ul className="project__links">
              {project.links.map((link) => (
                <li key={link.href}>
                  <ExternalLink href={link.href}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
    </article>
  );
}
