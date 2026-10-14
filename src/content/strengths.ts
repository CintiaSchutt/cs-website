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
    summary: 'OAuth 2.0, OpenID Connect and secure APIs at work; WebAuthn in my own study.',
    evidence: [
      { label: 'QHR Technologies', to: '/experience#qhr' },
      { label: 'Projects', to: '/projects' },
    ],
  },
  {
    id: 'regulated',
    title: 'Regulated, sensitive environments',
    summary: 'Healthcare software today, a financial institution before that.',
    evidence: [
      { label: 'QHR Technologies', to: '/experience#qhr' },
      { label: 'Banco do Brasil', to: '/experience#banco-do-brasil' },
    ],
  },
  {
    id: 'communication',
    title: 'Clear communication',
    summary: 'Years of client-facing work, now with engineers, designers and product teams.',
    evidence: [
      { label: 'Dell Computers', to: '/experience#dell' },
      { label: 'QHR Technologies', to: '/experience#qhr' },
    ],
  },
  {
    id: 'learning',
    title: 'Learning on purpose',
    summary: 'Retrained at BCIT with distinction, and still studying Spring Boot, Kubernetes and WebAuthn.',
    evidence: [
      { label: 'BCIT', to: '/experience#bcit' },
      { label: 'Projects', to: '/projects' },
    ],
  },
];
