import { ExperienceEntry } from '../components/ExperienceEntry';
import { LearningItem } from '../components/LearningItem';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { StrengthList } from '../components/StrengthList';
import { roles } from '../content/experience';
import { learning } from '../content/learning';
import { strengths } from '../content/strengths';

export function Experience() {
  const education = learning.filter((entry) => entry.kind === 'Education');

  return (
    <div className="container page">
      <PageHeader
        title="Healthcare software now, banking and sales before."
        lede="Three roles and a certificate, and what I carry from them into identity and access work."
      />

      <Section id="history" title="Work history">
        <div className="entries">
          {roles.map((role) => (
            <ExperienceEntry key={role.id} role={role} />
          ))}
        </div>
      </Section>

      {education.length > 0 ? (
        <Section id="education" title="Education">
          <ul className="learning-list">
            {education.map((entry) => (
              <LearningItem key={entry.id} entry={entry} />
            ))}
          </ul>
        </Section>
      ) : null}

      <Section id="strengths" title="What carries over">
        <StrengthList items={strengths} />
      </Section>
    </div>
  );
}
