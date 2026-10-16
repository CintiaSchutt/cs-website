import type { Project, UpcomingProject } from './types';

/**
 * Projects, labs and write-ups, newest first.
 *
 * When you start a project from `comingSoon` below, remove it from that list
 * and add a full entry here. The template and the steps are in
 * docs/README.md, under "Publishing a project on the site".
 */
export const projects: Project[] = [
  {
    slug: 'this-website',
    title: 'This website',
    summary: 'My personal site, rebuilt in React to be simple, accessible and secure.',
    status: 'completed',
    period: '2026',
    goal: 'Replace my old Angular site with a portfolio that shows my focus on identity.',
    tools: ['React', 'TypeScript', 'Vite', 'Content-Security-Policy', 'GitHub Actions', 'GitHub Pages'],
    whatIDid: [
      'Built it to be keyboard-friendly, with light and dark themes.',
      'Added a strict Content-Security-Policy and left out trackers and third-party scripts.',
      'Set up automatic checks and deployment with GitHub Actions.',
    ],
    whatILearned:
      'Security choices shape design choices. GitHub Pages cannot send every security header, so moving to a host that can is my next step.',
    links: [{ label: 'Source code on GitHub', href: 'https://github.com/CintiaSchutt/cs-website' }],
  },
];

/**
 * Projects not started yet, in the order you plan to build them. Shown under
 * "Coming soon" on the Projects page. The plan for each is in docs/projects/.
 */
export const comingSoon: UpcomingProject[] = [
  {
    title: 'Single sign-on with OpenID Connect',
    summary: 'Signing users in to a small app and API through an identity provider.',
  },
  {
    title: 'Joiner, mover, leaver automation',
    summary: 'Creating, updating and disabling accounts automatically from an HR file.',
  },
  {
    title: 'Role-based access and access reviews',
    summary: 'A small role model and a script that flags excess or unused access.',
  },
  {
    title: 'SAML next to OIDC',
    summary: 'The same app connected both ways, and what is actually different.',
  },
  {
    title: 'Passkeys in Spring Boot',
    summary: 'Passwordless sign-in with WebAuthn.',
  },
  {
    title: 'Identity configuration as code',
    summary: 'Identity provider settings managed with Terraform and a CI pipeline.',
  },
];
