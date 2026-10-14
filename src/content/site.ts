import type { Membership } from './types';

/**
 * Contact details and links used across the site.
 *
 * `phone` is intentionally null: the previous site published it, but a public
 * phone number mostly attracts spam. Set it to a string (for example
 * '+1 555 555 5555') to show it on the Contact page again.
 */
export const site = {
  name: 'Cintia Schutt',
  email: 'cintiaschutt@gmail.com',
  phone: null as string | null,
  location: 'Calgary, Alberta, Canada',
  github: {
    label: 'github.com/CintiaSchutt',
    href: 'https://github.com/CintiaSchutt',
  },
  linkedin: {
    label: 'linkedin.com/in/cintia-schutt',
    href: 'https://www.linkedin.com/in/cintia-schutt/',
  },
  sourceRepo: 'https://github.com/CintiaSchutt/cs-website',
  resume: {
    href: '/cintia_schutt_resume.pdf',
    label: 'Résumé (PDF)',
  },
} as const;

/**
 * Communities you belong to. To show a logo, put the file in public/ (for example
 * public/wicys-badge.webp), set `logo: '/wicys-badge.webp'`, and check the organization's
 * logo-usage guidelines first.
 */
export const memberships: Membership[] = [
  {
    id: 'wicys',
    name: 'Women in CyberSecurity (WiCyS)',
    href: 'https://www.wicys.org',
    logo: '/wicys-badge.webp',
  },
];
