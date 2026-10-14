import { MembershipLink } from '../components/MembershipLink';
import { PageHeader } from '../components/PageHeader';
import { Placeholder } from '../components/Placeholder';
import { Section } from '../components/Section';
import { memberships } from '../content/site';

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
    detail: 'Client-facing sales in Brazil.',
  },
  {
    when: '2012 – 2016',
    title: 'Customer Service Representative, Banco do Brasil',
    detail: 'Client-facing work in a regulated financial institution.',
  },
  {
    when: '2017 – 2019',
    title: 'Certificate in Computer Systems, BCIT',
    detail: 'Software development, cloud computing and Agile. Graduated with Distinction.',
  },
  {
    when: '2019 – present',
    title: 'Software Developer, QHR Technologies',
    detail: 'Secure SaaS for healthcare, including OAuth 2.0 and OpenID Connect.',
  },
  {
    when: 'Now',
    title: 'Studying identity and access',
    detail: 'Identity and access management, with WebAuthn, Kubernetes and Spring Boot.',
  },
];

export function About() {
  return (
    <div className="container page">
      <PageHeader
        title="How I got here, and where I’m heading."
        lede="Sales, banking, a software certificate, and healthcare software since 2019."
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
          Authentication is the part of my work I keep coming back to. Identity and access
          management is where that curiosity points: who gets in, and what they can do once they do.
        </p>
        <Placeholder>
          Add one or two sentences in your own words about what first drew you to identity and
          access management or security. Edit <code>src/pages/About.tsx</code>.
        </Placeholder>
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
    </div>
  );
}
