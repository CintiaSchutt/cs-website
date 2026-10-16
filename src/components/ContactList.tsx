import { site } from '../content/site';
import { ExternalLink } from './ExternalLink';

/** Professional contact details as a labelled list. */
export function ContactList() {
  return (
    <dl className="contact-list">
      <div>
        <dt>LinkedIn</dt>
        <dd>
          <ExternalLink href={site.linkedin.href}>{site.linkedin.label}</ExternalLink>
        </dd>
      </div>
      <div>
        <dt>GitHub</dt>
        <dd>
          <ExternalLink href={site.github.href}>{site.github.label}</ExternalLink>
        </dd>
      </div>
      <div>
        <dt>Résumé</dt>
        <dd>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent('Résumé request')}`}>Available on request, by email</a>
        </dd>
      </div>
      <div>
        <dt>Location</dt>
        <dd>{site.location}</dd>
      </div>
    </dl>
  );
}
