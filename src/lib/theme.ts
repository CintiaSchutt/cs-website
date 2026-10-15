import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

function systemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/** The visitor's saved choice, or null when they have not made one (storage may be blocked). */
function savedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

/**
 * Light or dark theme.
 *
 * With no saved choice the site follows the system setting, live: if the
 * visitor's system switches at sunset, so does the site. Using the toggle saves
 * their choice in this browser and sets data-theme on <html>, which the CSS
 * prefers over the system setting. public/theme-init.js applies a saved choice
 * before first paint so the page never flashes the wrong theme.
 */
export function useTheme() {
  const [saved, setSaved] = useState<Theme | null>(savedTheme);
  const [system, setSystem] = useState<Theme>(systemTheme);

  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY);
    const onChange = () => setSystem(query.matches ? 'dark' : 'light');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const theme: Theme = saved ?? system;

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setSaved(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Storage unavailable: the choice still applies until the page is closed. */
    }
  }, [theme]);

  return { theme, toggle };
}
