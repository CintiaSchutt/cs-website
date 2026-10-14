import { ButtonLink } from '../components/ButtonLink';
import { learning } from '../content/learning';
import { visible } from '../content/placeholders';
import { Link } from '../router';

export function Home() {
  const studying = visible(learning).filter((entry) => entry.status === 'in-progress');

  return (
    <div className="container page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">Cintia Schutt · Calgary, Alberta</p>
          <h1 id="hero-title" tabIndex={-1}>
            Software developer, <em>moving into cybersecurity.</em>
          </h1>
          <p className="lede">
            I have built healthcare web applications since 2019, including sign-in with OAuth, Okta
            and Azure AD B2C. Now I am focusing on identity and access management: who gets in, and
            what they can do once they are inside.
          </p>
          <p className="hero__actions">
            <ButtonLink to="/projects">See my work</ButtonLink>
            <ButtonLink to="/contact" variant="link">
              Get in touch
            </ButtonLink>
          </p>
          {studying.length > 0 ? (
            <p className="hero__now">
              Currently studying:{' '}
              {studying.map((entry, index) => (
                <span key={entry.id}>
                  {index > 0 ? ', ' : ''}
                  <Link to={`/learning#${entry.id}`}>{entry.title}</Link>
                </span>
              ))}
              .
            </p>
          ) : null}
        </div>

        <div className="hero__art" aria-hidden="true">
          <div className="hero__disc" />
          <img src="/illustration.webp" alt="" width="1100" height="1033" />
        </div>
      </section>
    </div>
  );
}
