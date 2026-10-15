import { PageHeader } from '../components/PageHeader';
import { ExternalLink } from '../components/ExternalLink';
import { ProjectCard } from '../components/ProjectCard';
import { Section } from '../components/Section';
import { visible } from '../content/placeholders';
import { comingSoon, projects } from '../content/projects';
import { site } from '../content/site';

export function Projects() {
  const items = visible(projects);

  return (
    <div className="container page">
      <PageHeader title="What I’m building, and what I’m learning from it." />

      <Section id="work" title="Work">
        <div className="projects">
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section id="coming-soon" title="Coming soon">
        <p>Identity and access management labs I’m working on next. Write-ups will appear here as I finish them.</p>
        <ul className="bullets">
          {comingSoon.map((project) => (
            <li key={project.title}>
              <strong>{project.title}</strong>: {project.summary}
            </li>
          ))}
        </ul>
        <p>
          The rest of my code is on <ExternalLink href={site.github.href}>GitHub</ExternalLink>.
        </p>
      </Section>
    </div>
  );
}
