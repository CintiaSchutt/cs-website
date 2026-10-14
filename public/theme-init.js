// Applies the visitor's saved theme before the page paints, so there is no
// flash of the wrong theme. It is an external file (not inline) because the
// site's Content-Security-Policy only allows scripts served from its own origin.
// No saved choice means the CSS follows the system setting (prefers-color-scheme).
try {
  var saved = window.localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    document.documentElement.setAttribute('data-theme', saved);
  }
} catch (error) {
  /* Storage can be unavailable (private mode, blocked cookies): fall back to the system theme. */
}
