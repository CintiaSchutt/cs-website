import type { ReactNode } from 'react';
import { showPlaceholders } from '../content/placeholders';

/**
 * A visible reminder that something still needs your own words or facts.
 * Renders only in `npm run dev` (or when VITE_SHOW_PLACEHOLDERS=true), so it
 * never appears on the published site.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  if (!showPlaceholders) return null;
  return (
    <p className="placeholder-note" role="note">
      <strong>Placeholder.</strong> {children}
    </p>
  );
}
