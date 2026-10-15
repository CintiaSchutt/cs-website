import { MembershipLink } from '../components/MembershipLink';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { memberships } from '../content/site';

interface TimelineItem {
  when: string;
  title: string;
  detail: string;
}

/** The career in five lines. Every item comes from your résumés or your own account of your path. */
const timeline: TimelineItem[] = [
  {
    when: '2010 – 2011',
    title: 'Inside Sales Representative, Dell Computers',
    detail: 'Recognized as a Top Performer in Customer Experience.',
  },
  {
    when: '2012 – 2016',
    title: 'Customer Service Representative, Banco do Brasil',
    detail: 'Joined through a national-level exam. Client work in a highly regulated bank.',
  },
  {
    when: '2017 – 2019',
    title: 'Certificate in Computer Systems, BCIT',
    detail: 'Software development in a new country and a second language. Graduated with Distinction and the Dean’s Award.',
  },
  {
    when: '2019 – present',
    title: 'Software Developer, QHR Technologies',
    detail:
      'Started as a junior developer and grew into an intermediate one, on a healthcare platform used by millions. Angular first, with some Java services, pipelines and migrations.',
  },
  {
    when: 'Now',
    title: 'Moving into identity and access',
    detail: 'Studying identity and access management and planning hands-on labs.',
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
          At work, sign-in is how millions of people reach sensitive health information, and the
          hard problems are rarely the happy path. Identity and access management is where I want to
          work on them: who gets in, and what they can do once they’re inside.
        </p>
      </Section>

      <Section id="community" title="Community">
        {memberships.map((membership) => (
          <p key={membership.id}>
            <MembershipLink membership={membership} />
          </p>
        ))}
      </Section>
    </div>
  );
}
