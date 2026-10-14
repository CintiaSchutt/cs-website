import { site } from '../content/site';
import { ExternalLink } from './ExternalLink';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <ul className="site-footer__links">
          <li>
            <ExternalLink href={site.linkedin.href}>LinkedIn</ExternalLink>
          </li>
          <li>
            <ExternalLink href={site.github.href}>GitHub</ExternalLink>
          </li>
          <li>
            <ExternalLink href={site.sourceRepo}>Source for this site</ExternalLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}
