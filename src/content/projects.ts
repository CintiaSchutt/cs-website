import type { Project } from './types';

/**
 * Projects, labs and write-ups, newest first.
 *
 * To add one, copy an object below, change every field and put it at the top
 * of the list. The Projects page and the Home page update automatically.
 * Each entry answers four questions: the goal, the tools or methods, what you
 * did, and what you learned. Keep it honest and specific; a small lab that is
 * clearly described beats a large claim that is vague.
 *
 * Entries marked `placeholder: true` show in `npm run dev` only. Fill in the
 * bracketed text and delete the flag to publish.
 */
export const projects: Project[] = [
  {
    slug: 'placeholder-lab',
    placeholder: true,
    title: '[Lab or project title]',
    summary: '[One sentence: what this is and why it matters.]',
    status: 'in-progress',
    period: '[Month Year]',
    goal: '[What were you trying to figure out or build?]',
    tools: ['[Tool or platform]', '[Method or standard]'],
    whatIDid: ['[A concrete step you took]', '[Another concrete step]'],
    whatILearned: '[What you now understand, or would do differently.]',
    links: [{ label: '[Write-up or repository]', href: 'https://github.com/CintiaSchutt' }],
  },
  {
    slug: 'this-website',
    title: 'This website',
    summary:
      'A rebuild of my personal site as a React portfolio, designed to be accessible, quick to load and to leave very little to attack.',
    status: 'completed',
    period: '2026',
    goal: 'Replace a placeholder-heavy Angular site with a portfolio that tells the story of my move from software development into cybersecurity, backed by evidence.',
    tools: ['React', 'TypeScript', 'Vite', 'CSS', 'GitHub Actions', 'GitHub Pages'],
    whatIDid: [
      'Rebuilt the site in React with semantic HTML, keyboard-friendly navigation, visible focus states, a light and dark theme that follows the system setting, and support for reduced motion.',
      'Kept the page free of third-party scripts, analytics and trackers. Its Content-Security-Policy allows scripts only from the site itself, and the only outside hosts it permits are the two that serve the fonts.',
      'Checked colour contrast for both the light and dark themes with a script in the repository, and kept the original Angular project in the repository history.',
    ],
    whatILearned:
      'A static site can have a very small attack surface if you refuse third-party code by default. With no external scripts or trackers, a strict Content-Security-Policy is easy to write and easy to trust, and every outside host you do allow, such as a font service, is a deliberate trade-off.',
    links: [{ label: 'Source code on GitHub', href: 'https://github.com/CintiaSchutt/cs-website' }],
  },
];
