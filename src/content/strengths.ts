import type { Strength } from './types';

/** Strengths that carry over into identity work. Each one is backed by the work history or education. */
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
    summary: 'Retrained at BCIT with distinction. Now studying identity and access management and sharing my notes on this site.',
  },
];
