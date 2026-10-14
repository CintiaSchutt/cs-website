import { ButtonLink } from '../components/ButtonLink';

export function Home() {
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
            I’m a software developer in healthcare, with hands-on OAuth 2.0 and OpenID Connect
            experience. I’m now focusing on identity and access management, and I’m open to IAM
            roles.
          </p>
          <p className="hero__actions">
            <ButtonLink to="/projects">See my work</ButtonLink>
            <ButtonLink to="/contact" variant="link">
              Get in touch
            </ButtonLink>
          </p>
        </div>

        <div className="hero__art" aria-hidden="true">
          <div className="hero__disc" />
          <img src="/illustration.webp" alt="" width="1100" height="1033" />
        </div>
      </section>
    </div>
  );
}
