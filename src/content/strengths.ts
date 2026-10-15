import type { Strength } from './types';

/**
 * Strengths that carry over into security work. Each one must be backed by
 * something real in the work history or education. If you cannot back it up,
 * do not add it.
 */
export const strengths: Strength[] = [
  {
    id: 'authentication',
    title: 'Hands-on with authentication',
    summary: 'OAuth 2.0, OpenID Connect and secure APIs at work; WebAuthn in my own study.',
  },
  {
    id: 'regulated',
    title: 'Regulated, sensitive environments',
    summary: 'Healthcare software today, a financial institution before that.',
  },
  {
    id: 'communication',
    title: 'Clear communication',
    summary: 'Years of client-facing work, now with engineers, designers and product teams.',
  },
  {
    id: 'learning',
    title: 'Learning on purpose',
    summary: 'Retrained at BCIT with distinction, and still studying Spring Boot, Kubernetes and WebAuthn.',
  },
];
