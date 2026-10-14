import { PageHeader } from '../components/PageHeader';
import { ExternalLink } from '../components/ExternalLink';
import { ProjectCard } from '../components/ProjectCard';
import { Section } from '../components/Section';
import { visible } from '../content/placeholders';
import { projects } from '../content/projects';
import { site } from '../content/site';

export function Projects() {
  const items = visible(projects);

  return (
    <div className="container page">
      <PageHeader
        title="What I’m building, and what I’m learning from it."
        lede="Labs, builds and write-ups. Each entry says what I set out to do, which tools and methods I used, what I did, and what I took from it."
      />

      <Section id="work" title="Work">
        <div className="projects">
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section id="more" title="More to come">
        <p>
          Lab write-ups and security projects will be added here as I complete them. The rest of my
          code is on{' '}
          <ExternalLink href={site.github.href}>GitHub</ExternalLink>.
        </p>
      </Section>
    </div>
  );
}
