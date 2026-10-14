import type { LearningEntry } from './types';

/**
 * Courses, certifications, topics and education.
 *
 * Where each shows: entries of kind 'Education' appear on the Experience page;
 * everything else appears under "Studying" on the Projects page (and in-progress
 * ones are listed on Home). Build labs and projects themselves in projects.ts.
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
    id: 'webauthn',
    title: 'WebAuthn',
    kind: 'Topic',
    status: 'in-progress',
    note: 'Studying how WebAuthn helps strengthen application security.',
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    kind: 'Topic',
    status: 'in-progress',
    note: 'Exploring Kubernetes for cloud environments, building on supporting the adoption of Azure Kubernetes Service (AKS) at work.',
  },
  {
    id: 'spring-boot',
    title: 'Backend development with Java and Spring Boot',
    kind: 'Course',
    status: 'in-progress',
    note: 'Ongoing training in backend development.',
  },
  {
    id: 'bcit',
    title: 'Certificate in Computer Systems – Software Development',
    provider: 'British Columbia Institute of Technology (BCIT), Burnaby, BC',
    kind: 'Education',
    status: 'completed',
    period: '2017 – 2019',
    note: 'Graduated with Distinction and the Dean’s Award. Focused on software development, cloud computing and Agile methodologies.',
  },
  {
    id: 'placeholder-certification',
    placeholder: true,
    title: '[Certification name, exactly as issued]',
    provider: '[Issuing organization]',
    kind: 'Certification',
    status: 'in-progress',
    period: '[Start – expected or actual completion]',
    note: '[One line on what it covers and why it matters for identity and access management.]',
  },
  {
    id: 'placeholder-lab',
    placeholder: true,
    title: '[Lab platform or course name]',
    provider: '[Platform or provider]',
    kind: 'Lab',
    status: 'planned',
    note: '[What you plan to practise.]',
  },
];
