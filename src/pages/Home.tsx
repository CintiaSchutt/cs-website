import { ButtonLink } from '../components/ButtonLink';
import { MembershipLink } from '../components/MembershipLink';
import { learning } from '../content/learning';
import { visible } from '../content/placeholders';
import { memberships } from '../content/site';
import { Link } from '../router';

export function Home() {
  const studying = visible(learning).filter((entry) => entry.status === 'in-progress');

  return (
    <div className="container page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">Cintia Schutt · Calgary, Alberta</p>
          <h1 id="hero-title" tabIndex={-1}>
            I’ve built <span className="nowrap">sign-in</span> for healthcare software.{' '}
            <em>Now I’m learning to secure it.</em>
          </h1>
          <p className="lede">
            I work on Angular applications for healthcare, including sign-in with OAuth, Okta and
            Azure AD B2C. Now I’m focusing on identity and access management: who gets in, and what
            they can do once they’re inside.
          </p>
          <p className="hero__actions">
            <ButtonLink to="/projects">See my work</ButtonLink>
            <ButtonLink to="/contact" variant="link">
              Get in touch
            </ButtonLink>
          </p>
          <ul className="hero__facts">
            <li>
              <span className="hero__dot" aria-hidden="true" />
              Open to identity and access management roles
            </li>
            {studying.length > 0 ? (
              <li>
                Currently studying:{' '}
                {studying.map((entry, index) => (
                  <span key={entry.id}>
                    {index > 0 ? ', ' : ''}
                    <Link to={`/projects#${entry.id}`}>{entry.title}</Link>
                  </span>
                ))}
              </li>
            ) : null}
            {memberships.map((membership) => (
              <li key={membership.id}>
                <MembershipLink membership={membership} />
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__art" aria-hidden="true">
          <div className="hero__disc" />
          <img src="/illustration.webp" alt="" width="1100" height="1033" />
        </div>
      </section>
    </div>
  );
}
