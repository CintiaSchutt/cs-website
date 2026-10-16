import type { LearningEntry } from './types';

/**
 * Education and certifications. Entries of kind 'Education' appear on the
 * Experience page; labs and builds go in projects.ts instead.
 *
 * Only mark an entry 'completed' when it is, and name a certificate or
 * credential exactly as it was issued.
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
