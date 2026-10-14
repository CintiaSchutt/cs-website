import { LearningItem } from '../components/LearningItem';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { learning } from '../content/learning';
import { visible } from '../content/placeholders';
import type { Status } from '../content/types';

const GROUPS: { status: Status; id: string; title: string }[] = [
  { status: 'in-progress', id: 'in-progress', title: 'In progress' },
  { status: 'planned', id: 'planned', title: 'Planned' },
  { status: 'completed', id: 'completed', title: 'Completed' },
];

export function Learning() {
  const entries = visible(learning);

  return (
    <div className="container page">
      <PageHeader
        title="What I’ve finished, and what I’m working through."
        lede="Every item is marked in words as completed, in progress or planned, so you can tell them apart."
      />

      {GROUPS.map((group) => {
        const items = entries.filter((entry) => entry.status === group.status);
        if (items.length === 0) return null;
        return (
          <Section key={group.id} id={group.id} title={group.title}>
            <ul className="learning-list">
              {items.map((entry) => (
                <LearningItem key={entry.id} entry={entry} />
              ))}
            </ul>
          </Section>
        );
      })}
    </div>
  );
}
