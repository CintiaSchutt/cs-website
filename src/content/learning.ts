import type { LearningEntry } from './types';

/**
 * Courses, certifications, topics and education.
 *
 * Entries of kind 'Education' appear on the Experience page. Labs, builds and
 * what you are studying go in projects.ts (Projects page), written up as entries.
 *
 * To add an entry, copy one of the objects below and change it.
 * - `status` is 'completed', 'in-progress' or 'planned'. Be strict: only mark
 *   something 'completed' when you have finished it, and name the certificate
 *   or credential exactly as it was issued.
 * - Entries marked `placeholder: true` show in `npm run dev` only. Replace
 *   their bracketed text with the real thing and delete the flag to publish.
 */
export const learning: LearningEntry[] = [
  {
    id: 'bcit',
    title: 'Certificate in Computer Systems – Software Development',
    provider: 'British Columbia Institute of Technology (BCIT), Burnaby, BC',
    kind: 'Education',
    status: 'completed',
    period: '2017 – 2019',
    note: 'Graduated with Distinction and the Dean’s Award. Focused on software development, cloud computing and Agile methodologies.',
  },
];
