/**
 * Checks the colour pairings in src/styles/tokens.css against WCAG 2.2 AA.
 *
 * It reads the light palette (the first `:root` block) and the dark palette
 * (the `:root` block inside the prefers-color-scheme media query) and
 * computes the contrast ratio for every pairing the site actually uses.
 * Exits with a non-zero status if any pairing falls short.
 *
 * Usage: npm run check:contrast
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = await readFile(path.join(root, 'src/styles/tokens.css'), 'utf8');

const blocks = [...css.matchAll(/:root\s*\{([^}]*)\}/g)].map((match) => match[1]);
if (blocks.length < 2) {
  throw new Error('Expected a light and a dark :root block in tokens.css');
}

function parsePalette(block) {
  const palette = {};
  for (const match of block.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    palette[match[1]] = match[2];
  }
  return palette;
}

const palettes = { light: parsePalette(blocks[0]), dark: parsePalette(blocks[1]) };
// The dark block only overrides some tokens in principle; here it redefines all of them.
for (const name of Object.keys(palettes.light)) {
  if (!(name in palettes.dark)) throw new Error(`Dark palette is missing --color-${name}`);
}

function luminance(hex) {
  const channels = [1, 3, 5].map((index) => {
    const value = parseInt(hex.slice(index, index + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

// [foreground, background, minimum ratio, where it is used]
const TEXT = 4.5; // WCAG 1.4.3, normal text
const UI = 3; // WCAG 1.4.11 (interface components) and 1.4.3 (large text)
const pairs = [
  ['ink', 'bg', TEXT, 'body text'],
  ['ink', 'surface', TEXT, 'text on cards'],
  ['ink-muted', 'bg', TEXT, 'secondary text'],
  ['ink-muted', 'surface', TEXT, 'secondary text on cards'],
  ['accent', 'bg', TEXT, 'links, headings accent, secondary button'],
  ['accent', 'surface', TEXT, 'links on cards'],
  ['on-accent', 'accent', TEXT, 'primary button, skip link'],
  ['focus', 'bg', UI, 'focus ring'],
  ['focus', 'surface', UI, 'focus ring on cards'],
  ['grape', 'bg', UI, 'large decorative section number (24px+)'],
];

let failures = 0;
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
  console.error(`\n${failures} pairing(s) below the required ratio.`);
  process.exit(1);
}
console.log('\nAll pairings meet WCAG AA.');
