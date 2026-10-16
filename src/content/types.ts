/** How far along a piece of work or study is. Shown as text, never as colour alone. */
export type Status = 'completed' | 'in-progress' | 'planned';

export interface ExternalLinkData {
  label: string;
  href: string;
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
}

/** A project not started yet, listed under "Coming soon" on the Projects page. */
export interface UpcomingProject {
  title: string;
  /** One short sentence. */
  summary: string;
}

/** A professional community, shown on the About page. */
export interface Membership {
  id: string;
  /** Short description shown after the name, for example "a community for …". */
  description?: string;
  /** Full name, used in the link text. */
  name: string;
  href: string;
  /** Path to a logo in public/, e.g. "/wicys-badge.webp". Leave undefined to show the name only. */
  logo?: string;
}
