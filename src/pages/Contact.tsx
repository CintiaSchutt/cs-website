import { ButtonLink } from '../components/ButtonLink';
import { ContactList } from '../components/ContactList';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { site } from '../content/site';

export function Contact() {
  return (
    <div className="container page">
      <PageHeader
        index="06"
        label="Contact"
        title="Let’s talk."
        lede="I’d like to hear from recruiters, hiring managers and people working in identity and access management or application security. Email is the best way to reach me."
      />

      <Section id="reach" title="Get in touch">
        <p>
          <ButtonLink href={`mailto:${site.email}`}>Email {site.email}</ButtonLink>
        </p>
        <ContactList />
      </Section>

      <Section id="authorization" title="Working with teams">
        <p>{site.workAuthorization}</p>
      </Section>
    </div>
  );
}
