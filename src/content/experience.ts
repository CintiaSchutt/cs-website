import type { Role } from './types';

/**
 * Work history, newest first. Everything here comes from the résumé and the
 * previous site. Do not add detail that is not true: this page is evidence.
 */
export const roles: Role[] = [
  {
    id: 'qhr',
    title: 'Software Developer',
    organization: 'QHR Technologies',
    location: 'Calgary, AB',
    start: '2019-04',
    end: null,
    context: 'Enterprise healthcare SaaS used by millions of people, handling sensitive health information.',
    highlights: [
      'Worked on replacing our internal identity provider with Azure AD B2C for millions of users, including a temporary fallback to the old login.',
      'Work with OAuth 2.0 and OpenID Connect authentication and design secure REST APIs.',
      'Investigate and resolve production issues with cross-functional teams.',
      'Support CI/CD with GitHub Actions, Docker and Azure Kubernetes Service.',
    ],
  },
  {
    id: 'banco-do-brasil',
    title: 'Customer Service Representative',
    organization: 'Banco do Brasil',
    location: 'Brazil',
    start: '2012-04',
    end: '2016-07',
    context: 'Client-facing work in a highly regulated financial institution.',
    highlights: [],
  },
  {
    id: 'dell',
    title: 'Inside Sales Representative',
    organization: 'Dell Computers',
    location: 'Brazil',
    start: '2010-02',
    end: '2011-11',
    context: 'Top Performer in Customer Experience; drove a 25% revenue increase.',
    highlights: [],
  },
];
