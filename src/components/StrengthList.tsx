import type { Strength } from '../content/types';
import { Link } from '../router';
import { ExternalLink } from './ExternalLink';

/**
 * Strengths, each followed by the evidence that backs it up. The evidence tags
 * are the site's signature detail: nothing is claimed without a place to check it.
 */
export function StrengthList({ items }: { items: Strength[] }) {
  return (
    <ul className="strengths">
      {items.map((item) => (
        <li key={item.id} className="strength">
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <div className="evidence">
            <span className="evidence__label">Evidence</span>
            <ul>
              {item.evidence.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to}>{link.label}</Link>
                  ) : (
                    <ExternalLink href={link.href}>{link.label}</ExternalLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
