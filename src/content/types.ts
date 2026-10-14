/** How far along a piece of work or study is. Shown as text, never as colour alone. */
export type Status = 'completed' | 'in-progress' | 'planned';

export interface ExternalLinkData {
  label: string;
  href: string;
}

/** A pointer from a claim to the thing that backs it up. Use `to` for pages on this site. */
export interface EvidenceLink {
  label: string;
  to?: string;
  href?: string;
}

export interface Role {
  id: string;
  title: string;
  organization: string;
  location: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or null for a current role */
  end: string | null;
  context?: string;
  highlights: string[];
  tools?: string[];
}

export interface Strength {
  id: string;
  title: string;
  summary: string;
  evidence: EvidenceLink[];
}

export type LearningKind = 'Education' | 'Certification' | 'Course' | 'Topic' | 'Lab';

export interface LearningEntry {
  id: string;
  title: string;
  provider?: string;
  kind: LearningKind;
  status: Status;
  period?: string;
  note?: string;
  /** Placeholders show in `npm run dev` only (see placeholders.ts). */
  placeholder?: boolean;
}

export interface Project {
  /** Used in the URL fragment (/projects#slug). Lowercase, hyphenated, unique. */
  slug: string;
  title: string;
  summary: string;
  status: Status;
  period?: string;
  goal: string;
  tools: string[];
  whatIDid: string[];
  whatILearned: string;
  links?: ExternalLinkData[];
  /** Placeholders show in `npm run dev` only (see placeholders.ts). */
  placeholder?: boolean;
}
