import { ExperienceEntry } from '../components/ExperienceEntry';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { StrengthList } from '../components/StrengthList';
import { roles } from '../content/experience';
import { strengths } from '../content/strengths';

export function Experience() {
  return (
    <div className="container page">
      <PageHeader
        title="Healthcare software, banking and sales."
        lede="Three roles, newest first, followed by the strengths that carry over into security work and where each one is backed up."
      />

      <Section id="history" title="Work history">
        <div className="entries">
          {roles.map((role) => (
            <ExperienceEntry key={role.id} role={role} />
          ))}
        </div>
      </Section>

      <Section id="strengths" title="What carries over">
        <p className="section__intro">
          These are connections I can support with the work above, not a wish list.
        </p>
        <StrengthList items={strengths} />
      </Section>
    </div>
  );
}
