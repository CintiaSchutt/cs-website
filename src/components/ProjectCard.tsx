import type { Project } from '../content/types';
import { ExternalLink } from './ExternalLink';
import { StatusBadge } from './StatusBadge';

/** One project on the Projects page. Its `id` is a link target (/projects#this-website). */
export function ProjectCard({ project }: { project: Project }) {
  const headingId = `${project.slug}-title`;

  return (
    <article className="project" id={project.slug} tabIndex={-1} aria-labelledby={headingId}>
      <p className="project__status">
        <StatusBadge status={project.status} />
        {project.period ? <span className="project__period">{project.period}</span> : null}
      </p>

      <h3 id={headingId}>{project.title}</h3>
      <p className="project__summary">{project.summary}</p>

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
    </article>
  );
}
