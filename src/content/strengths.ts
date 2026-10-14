import type { Strength } from './types';

/**
 * Strengths that carry over into security work. Each one must point to
 * something real (a role, a course, a project) in `evidence`. If you cannot
 * point to evidence, do not add the strength.
 */
export const strengths: Strength[] = [
  {
    id: 'authentication',
    title: 'Hands-on with authentication',
    summary:
      'I’ve integrated OAuth-based authentication and worked with Okta and Azure AD B2C, and I’m studying how WebAuthn strengthens application security.',
    evidence: [
      { label: 'Software Developer, QHR Technologies', to: '/experience#qhr' },
      { label: 'WebAuthn study', to: '/projects#webauthn' },
    ],
  },
  {
    id: 'detail',
    title: 'Attention to detail',
    summary:
      'Building WCAG-compliant components, reviewing teammates’ code and resolving defects all depend on noticing the small things.',
    evidence: [{ label: 'Software Developer, QHR Technologies', to: '/experience#qhr' }],
  },
  {
    id: 'communication',
    title: 'Clear communication with different audiences',
    summary:
      'Years of client-facing work in sales and banking taught me to explain things plainly and build trust. Today I work alongside designers, backend engineers and product managers.',
    evidence: [
      { label: 'Customer Service Representative, Banco do Brasil', to: '/experience#banco-do-brasil' },
      { label: 'Inside Sales Representative, Dell Computers', to: '/experience#dell' },
      { label: 'Software Developer, QHR Technologies', to: '/experience#qhr' },
    ],
  },
  {
    id: 'analysis',
    title: 'Analytical judgment',
    summary:
      'At Banco do Brasil I handled a wide range of financial inquiries and evaluated loan and credit conditions through internal systems, which is where my analytical habits started.',
    evidence: [
      { label: 'Customer Service Representative, Banco do Brasil', to: '/experience#banco-do-brasil' },
    ],
  },
  {
    id: 'learning',
    title: 'Learning new stacks on purpose',
    summary:
      'I retrained in software development at BCIT and graduated with distinction. I work with newer tools such as Nx and the NgRx Signal Store, and I keep studying Spring Boot, Kubernetes and WebAuthn.',
    evidence: [
      { label: 'BCIT certificate', to: '/experience#bcit' },
      { label: 'Current study', to: '/projects#studying' },
    ],
  },
];
