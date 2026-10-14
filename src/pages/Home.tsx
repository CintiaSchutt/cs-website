import { ButtonLink } from '../components/ButtonLink';
import { ProjectCard } from '../components/ProjectCard';
import { Section } from '../components/Section';
import { StatusBadge } from '../components/StatusBadge';
import { StrengthList } from '../components/StrengthList';
import { learning } from '../content/learning';
import { projects } from '../content/projects';
import { visible } from '../content/placeholders';
import { site } from '../content/site';
import { strengths } from '../content/strengths';
import { Link } from '../router';

export function Home() {
  const studying = visible(learning).filter((entry) => entry.status === 'in-progress');
  const latestProject = visible(projects)[0];

  return (
    <div className="container page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">Software developer · Calgary, Alberta</p>
          <h1 id="hero-title" tabIndex={-1}>
            Software developer, <em>moving into cybersecurity.</em>
          </h1>
          <p className="lede">
            Since 2019 I’ve built Angular applications for healthcare and worked with Okta, Azure AD
            B2C and OAuth along the way. Now I’m focusing on identity and access management: how
            organizations decide who gets in, and what they can do once they’re inside.
          </p>
          <p className="hero__actions">
            <ButtonLink to="/projects">See what I’m building</ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </p>
        </div>

        {studying.length > 0 ? (
          <aside className="now-card" aria-labelledby="now-title">
            <h2 id="now-title">Currently studying</h2>
            <ul>
              {studying.map((entry) => (
                <li key={entry.id}>
                  <Link to={`/learning#${entry.id}`}>{entry.title}</Link>
                  <StatusBadge status={entry.status} />
                </li>
              ))}
            </ul>
            <p>
              <Link to="/learning">See all learning</Link>
            </p>
          </aside>
        ) : null}
      </section>

      <Section id="bring" title="What I bring">
        <p className="section__intro">
          Each strength below points to the role, course or project that backs it up.
        </p>
        <StrengthList items={strengths.slice(0, 3)} />
        <p className="section__more">
          <Link to="/experience">See the full work history</Link>
        </p>
      </Section>

      {latestProject ? (
        <Section id="latest" title="Latest project">
          <ProjectCard project={latestProject} variant="compact" />
          <p className="section__more">
            <Link to="/projects">All projects</Link>
          </p>
        </Section>
      ) : null}

      <Section id="talk" title="Let’s talk">
        <p className="section__intro">
          If you’re hiring, building, or working in identity and access management or application
          security, I’d like to hear from you.
        </p>
        <p>
          <ButtonLink href={`mailto:${site.email}`}>Email me</ButtonLink>
        </p>
      </Section>
    </div>
  );
}
