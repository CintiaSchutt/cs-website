import { ButtonLink } from "../components/ButtonLink";

export function Home() {
  return (
    <div className="container page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">Cintia Schutt · Calgary, Alberta</p>
          <h1 id="hero-title" tabIndex={-1}>
            The right people, the right access, <em>and nobody else.</em>
          </h1>
          <p className="lede">
            I’m a software developer who specializes in identity. I’ve built
            OAuth 2.0 and OpenID Connect <span className="nowrap">sign-in</span>{" "}
            for healthcare software and worked on moving millions of users to a
            new identity provider. I’m open to developer and identity and access
            management roles where identity matters.
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
