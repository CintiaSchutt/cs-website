import { site } from '../content/site';
import { ExternalLink } from './ExternalLink';

/** Professional contact details as a labelled list. */
export function ContactList() {
  return (
    <dl className="contact-list">
      <div>
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </dd>
      </div>
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
      {site.phone ? (
        <div>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>
          </dd>
        </div>
      ) : null}
      <div>
        <dt>Location</dt>
        <dd>{site.location}</dd>
      </div>
      <div>
        <dt>Résumé</dt>
        <dd>
          <a href={`mailto:${site.email}?subject=Résumé request`}>Available on request, by email</a>
        </dd>
      </div>
    </dl>
  );
}
