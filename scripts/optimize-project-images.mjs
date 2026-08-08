// Converts realizácia gallery photos (data/projects.ts) to compressed WebP
// before each build, so the deployed site actually serves the lightweight
// versions instead of the original camera-size JPG/PNG files. data/projects.ts
// references the .webp paths directly; this script finds the matching
// original (.jpg/.jpeg/.png) for each one and (re)generates the .webp from
// it, skipping pairs that are already up to date. Runs as part of
// "prebuild" (see package.json), same pattern as generate-sitemap.mjs.

import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { projects } from '../data/projects.ts';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(rootDir, 'public');

const sourceExts = ['.jpg', '.jpeg', '.png'];

const webpPaths = new Set();
for (const project of projects) {
  for (const img of project.gallery) {
    if (path.extname(img).toLowerCase() === '.webp') {
      webpPaths.add(img);
    }
  }
}

let converted = 0;
let skipped = 0;
let missing = 0;
let savedBytes = 0;

for (const webpRelPath of webpPaths) {
  const base = webpRelPath.slice(0, -'.webp'.length);
  const outputPath = path.join(publicDir, webpRelPath);

  let inputPath = null;
  for (const ext of sourceExts) {
    const candidate = path.join(publicDir, base + ext);
    if (existsSync(candidate)) {
      inputPath = candidate;
      break;
    }
  }

  if (!inputPath) {
    if (existsSync(outputPath)) {
      skipped += 1;
    } else {
      console.warn(`optimize-project-images: no source (.jpg/.jpeg/.png) found for ${webpRelPath}`);
      missing += 1;
    }
    continue;
  }

  if (existsSync(outputPath) && statSync(outputPath).mtimeMs >= statSync(inputPath).mtimeMs) {
    skipped += 1;
    continue;
  }

  const inputSize = statSync(inputPath).size;
  // Realizácie photos only ever render as gallery tiles/cards, never full-bleed
  // hero images, so cap the width — several source photos come straight off a
  // camera at 3000px+ and stay oversized even after WebP compression alone.
  await sharp(inputPath)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 55 })
    .toFile(outputPath);
  const outputSize = statSync(outputPath).size;
  savedBytes += Math.max(0, inputSize - outputSize);
  converted += 1;
  console.log(
    `optimize-project-images: ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${(inputSize / 1024).toFixed(0)}KB -> ${(outputSize / 1024).toFixed(0)}KB)`
  );
}

console.log(
  `optimize-project-images: ${converted} converted, ${skipped} already up to date, ${missing} missing, ~${(
    savedBytes /
    1024 /
    1024
  ).toFixed(1)}MB saved.`
);
