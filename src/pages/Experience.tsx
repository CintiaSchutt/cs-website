import { ExperienceEntry } from '../components/ExperienceEntry';
import { LearningItem } from '../components/LearningItem';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { StrengthList } from '../components/StrengthList';
import { roles } from '../content/experience';
import { learning } from '../content/learning';
import { visible } from '../content/placeholders';
import { site } from '../content/site';
import { strengths } from '../content/strengths';

export function Experience() {
  const education = visible(learning).filter((entry) => entry.kind === 'Education');

  return (
    <div className="container page">
      <PageHeader
        title="Healthcare software, banking and sales."
        lede="The short version."
      />

      <Section id="history" title="Work history">
        <div className="entries">
          {roles.map((role) => (
            <ExperienceEntry key={role.id} role={role} />
          ))}
        </div>
        <p>
          Résumé available on request: <a href={`mailto:${site.email}?subject=Résumé request`}>email me</a>.
        </p>
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
