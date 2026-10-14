/**
 * The CS monogram: two offset rounded frames with the initials in front.
 * It is drawn with currentColor, so it follows the active theme (dark ink on
 * the light theme, light ink on the dark one). The static favicon.svg is the
 * same mark on a dark tile.
 */
export function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg
      className="logo"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round">
        <rect x="8" y="8" width="64" height="64" rx="8" />
        <rect x="28" y="28" width="64" height="64" rx="8" className="logo__front" />
      </g>
      <path fill="currentColor" d="M36.49 60.26Q36.49 53.48 40.66 49.24Q44.83 45 51.05 45Q53.83 45 56.27 45.72Q58.7 46.43 59.1 46.43Q60.53 46.43 60.92 45H61.83L62.23 54.83H61.23Q58.83 46.74 51.88 46.74Q47.14 46.74 44.33 50.26Q41.53 53.78 41.53 59.7Q41.53 63.48 42.51 66.24Q43.49 69 45.14 70.41Q46.79 71.83 48.55 72.46Q50.31 73.09 52.31 73.09Q57.44 73.09 62.01 68.7L62.79 69.48Q60.79 72.13 57.7 73.57Q54.62 75 50.92 75Q44.49 75 40.49 70.96Q36.49 66.91 36.49 60.26Z M79.12 68.52Q79.12 66.48 77.69 64.89Q76.25 63.3 74.21 62.17Q72.17 61.04 70.14 59.85Q68.12 58.65 66.69 56.78Q65.25 54.91 65.25 52.43Q65.25 49.13 67.49 47.07Q69.73 45 72.77 45Q74.6 45 76.73 45.74Q78.86 46.48 79.3 46.48Q80.43 46.48 80.69 45H81.6L82.56 54.26H81.47Q80.43 50.43 78.27 48.61Q76.12 46.78 73.51 46.78Q71.51 46.78 70.25 47.91Q68.99 49.04 68.99 50.83Q68.99 52.57 70.47 54.13Q71.95 55.7 75.38 57.61Q79.69 59.91 81.6 62.15Q83.51 64.39 83.51 67.09Q83.51 70.43 80.95 72.72Q78.38 75 74.64 75Q72.47 75 70.23 74.26Q67.99 73.52 67.47 73.52Q66.99 73.52 66.64 73.93Q66.3 74.35 66.25 74.96H65.3L63.99 65.74H64.99Q66.6 69.7 68.73 71.57Q70.86 73.43 73.77 73.43Q76.17 73.43 77.64 72.07Q79.12 70.7 79.12 68.52Z" />
    </svg>
  );
}
