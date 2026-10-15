import type { Status } from '../content/types';

const LABELS: Record<Status, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  planned: 'Planned',
};

/**
 * Status is always written out. The mark (filled, half-filled or empty circle)
 * reinforces it but is decorative, so meaning never depends on colour or shape.
 */
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`status status--${status}`}>
      <span className="status__mark" aria-hidden="true" />
      {LABELS[status]}
    </span>
  );
}
