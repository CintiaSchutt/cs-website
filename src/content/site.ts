import type { Membership } from './types';

/** Contact details and links used across the site. No phone number, on purpose: it mostly attracts spam. */
export const site = {
  name: 'Cintia Schutt',
  email: 'cintiaschutt@gmail.com',
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
} as const;

/**
 * Professional communities, shown on the About page. To show a logo, put the file
 * in public/ and set `logo` to its path (check the organization's logo guidelines first).
 */
export const memberships: Membership[] = [
  {
    id: 'wicys',
    name: 'Women in CyberSecurity (WiCyS)',
    href: 'https://www.wicys.org',
    description: 'a community for women working and learning in cybersecurity',
    logo: '/wicys-badge.webp',
  },
];
