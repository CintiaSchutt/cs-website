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
    context: 'Frontend development on production healthcare SaaS applications.',
    highlights: [
      'Built and maintained production-scale SaaS applications with Angular, TypeScript, RxJS and NgRx, supporting Medeo Health’s 4M+ user base.',
      'Integrated RESTful APIs and OAuth-based authentication to support secure, dynamic data flows across distributed services, and worked with Okta and Azure AD B2C.',
      'Developed WCAG-compliant UI components and dashboards with Angular Material, improving accessibility and user experience.',
      'Led the migration to an Nx monorepo, improving code modularity, build performance and team efficiency across services.',
      'Contributed to CI/CD pipeline improvements with GitHub Actions and Docker, and supported adoption of Azure Kubernetes Service (AKS).',
      'Conducted peer code reviews, resolved frontend defects and modernized legacy components to align with Angular best practices.',
      'Worked in Agile, cross-functional teams with designers, backend engineers and product managers.',
    ],
    tools: [
      'Angular',
      'TypeScript',
      'RxJS',
      'NgRx',
      'Angular Material',
      'Nx',
      'Jest',
      'OAuth',
      'Okta',
      'Azure AD B2C',
      'GitHub Actions',
      'Azure DevOps Pipelines',
      'Docker',
      'AKS',
    ],
  },
  {
    id: 'banco-do-brasil',
    title: 'Customer Service Representative',
    organization: 'Banco do Brasil',
    location: 'Brazil',
    start: '2012-04',
    end: '2016-07',
    context: 'Client-facing work at a financial institution.',
    highlights: [
      'Delivered personalized financial solutions, guiding clients through account management, product offerings and support.',
      'Built client relationships on trust and clarity, driving satisfaction and retention.',
      'Handled a wide range of financial inquiries and evaluated loan and credit conditions through internal systems.',
      'Gained insight into end-user behaviour and needs, which still informs my user-centred approach to software.',
    ],
  },
  {
    id: 'dell',
    title: 'Inside Sales Representative',
    organization: 'Dell Computers',
    location: 'Brazil',
    start: '2010-02',
    end: '2011-11',
    highlights: [
      'Recognized as a “Top Performer in Customer Experience” for consistently exceeding client expectations.',
      'Used product knowledge and client insights to drive a 25% revenue increase.',
      'Consistently exceeded monthly quotas through strategic communication and data-driven sales approaches.',
      'Strengthened my ability to understand client pain points.',
    ],
  },
];
