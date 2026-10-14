import { ButtonLink } from '../components/ButtonLink';
import { MembershipLink } from '../components/MembershipLink';
import { PageHeader } from '../components/PageHeader';
import { Placeholder } from '../components/Placeholder';
import { Section } from '../components/Section';
import { memberships, site } from '../content/site';

interface TimelineItem {
  when: string;
  title: string;
  detail: string;
}

/** The career in five lines. Every item comes from the résumé or the previous site. */
const timeline: TimelineItem[] = [
  {
    when: '2010 – 2011',
    title: 'Inside Sales Representative, Dell Computers',
    detail: 'Client-facing sales in Brazil. Strengthened my ability to understand client pain points.',
  },
  {
    when: '2012 – 2016',
    title: 'Customer Service Representative, Banco do Brasil',
    detail:
      'Guided clients through accounts and products, and evaluated loan and credit conditions through internal systems.',
  },
  {
    when: '2017 – 2019',
    title: 'Certificate in Computer Systems, BCIT',
    detail: 'Software development, cloud computing and Agile. Graduated with Distinction.',
  },
  {
    when: '2019 – present',
    title: 'Software Developer, QHR Technologies',
    detail: 'Angular applications for healthcare, with authentication through Okta and Azure AD B2C.',
  },
  {
    when: 'Now',
    title: 'Studying identity and access',
    detail: 'WebAuthn, Kubernetes and Spring Boot, with identity and access management as the focus.',
  },
];

export function About() {
  return (
    <div className="container page">
      <PageHeader
        title="How I got here, and where I’m heading."
        lede="My path so far: sales and banking, a software certificate at BCIT, and production web applications in healthcare since 2019."
      />

      <Section id="path" title="My path">
        <ol className="timeline">
          {timeline.map((item) => (
            <li key={item.title}>
              <p className="timeline__when">{item.when}</p>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="why" title="Why identity and access">
        <p>
          Alongside my front-end work I’ve been widening my view of how systems fit together:
          learning backend development with Spring Boot, exploring Kubernetes for cloud
          environments, and studying how technologies like WebAuthn help strengthen application
          security.
        </p>
        <p>
          Identity and access management is where that curiosity is pointing. It overlaps with what
          I already know: the authentication flows I’ve worked with in Okta and Azure AD B2C, and
          years of paying attention to what people need from the systems they use.
        </p>
        <Placeholder>
          Add one or two sentences in your own words about what first drew you to identity and
          access management or security. Edit <code>src/pages/About.tsx</code>.
        </Placeholder>
        <p>
          What motivates me most is creating software that solves real problems and being part of
          teams that share knowledge, collaborate and keep pushing each other forward.
        </p>
      </Section>

      <Section id="community" title="Community">
        {memberships.map((membership) => (
          <p key={membership.id}>
            <MembershipLink membership={membership} />
          </p>
        ))}
        <Placeholder>
          Add a sentence on what being a member means to you or what you take part in. Edit{' '}
          <code>src/pages/About.tsx</code>.
        </Placeholder>
      </Section>

      <Section id="resume" title="Résumé">
        <p>
          The full detail is on my résumé.
        </p>
        <p>
          <ButtonLink href={site.resume.href} variant="secondary">
            Open résumé (PDF)
          </ButtonLink>
        </p>
      </Section>
    </div>
  );
}
