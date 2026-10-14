/**
 * Checks the colour pairings in src/styles/tokens.css against WCAG 2.2 AA.
 *
 * tokens.css defines three palettes: light (the base `:root`), dark for visitors
 * whose system asks for it (`:root:not([data-theme])` inside the
 * prefers-color-scheme media query) and dark for visitors who chose it
 * (`:root[data-theme='dark']`). This script reads all three, fails if the two
 * dark palettes differ, and computes the contrast ratio for every pairing the
 * site uses. Exits with a non-zero status if anything falls short.
 *
 * Usage: npm run check:contrast
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = await readFile(path.join(root, 'src/styles/tokens.css'), 'utf8');

function blockAfter(selector) {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`Could not find "${selector}" in tokens.css`);
  const open = css.indexOf('{', start);
  const close = css.indexOf('}', open);
  return css.slice(open + 1, close);
}

function parsePalette(block) {
  const palette = {};
  for (const match of block.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    palette[match[1]] = match[2].toLowerCase();
  }
  return palette;
}

const light = parsePalette(blockAfter(':root {'));
const darkSystem = parsePalette(blockAfter(':root:not([data-theme])'));
const darkChosen = parsePalette(blockAfter(":root[data-theme='dark']"));

let failures = 0;

// The two dark blocks must stay identical, otherwise the theme would depend on how it was reached.
for (const name of new Set([...Object.keys(darkSystem), ...Object.keys(darkChosen)])) {
  if (darkSystem[name] !== darkChosen[name]) {
    failures += 1;
    console.error(
      `MISMATCH  --color-${name}: system dark is ${darkSystem[name]}, chosen dark is ${darkChosen[name]}`,
    );
  }
}
for (const name of Object.keys(light)) {
  if (!(name in darkChosen)) {
    failures += 1;
    console.error(`MISSING   dark palette has no --color-${name}`);
  }
}

const palettes = { light, dark: darkChosen };

function luminance(hex) {
  const channels = [1, 3, 5].map((index) => {
    const value = parseInt(hex.slice(index, index + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

// [foreground, background, minimum ratio, where it is used]
const TEXT = 4.5; // WCAG 1.4.3, normal text
const UI = 3; // WCAG 1.4.11 (interface components) and 1.4.3 (large text)
const pairs = [
  ['ink', 'bg', TEXT, 'body text'],
  ['ink', 'surface', TEXT, 'text on cards and the illustration disc'],
  ['ink-muted', 'bg', TEXT, 'secondary text'],
  ['ink-muted', 'surface', TEXT, 'secondary text on cards'],
  ['accent', 'bg', TEXT, 'links, accent words in headings, nav underline'],
  ['accent', 'surface', TEXT, 'links on cards'],
  ['on-accent', 'accent', TEXT, 'primary button, skip link'],
  ['focus', 'bg', UI, 'focus ring'],
  ['focus', 'surface', UI, 'focus ring on cards'],
  ['grape', 'bg', UI, 'decorative marks only (no text uses it)'],
];

for (const [theme, palette] of Object.entries(palettes)) {
  console.log(`\n${theme} theme`);
  for (const [foreground, background, minimum, usage] of pairs) {
    const value = ratio(palette[foreground], palette[background]);
    const pass = value >= minimum;
    if (!pass) failures += 1;
    console.log(
      `  ${pass ? 'PASS' : 'FAIL'}  ${value.toFixed(2).padStart(5)}:1  (needs ${minimum}:1)  ${foreground} on ${background}  — ${usage}`,
    );
  }
}

console.log('\nDecorative borders and rules (--color-rule) are not text or controls and are not checked.');
if (failures > 0) {
  console.error(`\n${failures} problem(s) found.`);
  process.exit(1);
}
console.log('\nAll pairings meet WCAG AA and both dark palettes match.');
