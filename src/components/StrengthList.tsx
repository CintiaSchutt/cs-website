import type { Strength } from '../content/types';

/** The strengths that carry over into security work: a short title and one line each. */
export function StrengthList({ items }: { items: Strength[] }) {
  return (
    <ul className="strengths">
      {items.map((item) => (
        <li key={item.id} className="strength">
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </li>
      ))}
    </ul>
  );
}
