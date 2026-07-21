// Prerenders every known route (7 main pages + all service/city SEO combinations)
// to static HTML in dist/, so crawlers get real markup instead of an empty
// <div id="root">. Runs after the client build and a throwaway SSR build
// (see "build" in package.json); the SSR build output is deleted at the end
// since it is only needed here, not at runtime.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { ROUTE_PATHS } from '../routePaths.ts';
import { cityData, serviceNames } from '../data/cities.js';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')));

const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const urls = [
  ...Object.values(ROUTE_PATHS),
  ...Object.keys(serviceNames).flatMap((service) =>
    Object.keys(cityData).map((city) => `/sluzby/${service}/${city}`)
  ),
];

// React 19 (via react-helmet-async's <Helmet>) hoists <title>/<meta>/<link>
// tags to the front of the rendered output. Peel them off so they can be
// placed in the template's real <head> instead of ending up inside
// <div id="root">.
function splitHoistedHead(appHtml) {
  const leadingTagRe = /^\s*(<title>.*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/is;
  let head = '';
  let rest = appHtml;
  let match;
  while ((match = leadingTagRe.exec(rest))) {
    head += match[1];
    rest = rest.slice(match[0].length);
  }
  return { head, body: rest };
}

function outputPathFor(url) {
  if (url === '/') {
    return path.join(distDir, 'index.html');
  }
  return path.join(distDir, url.slice(1), 'index.html');
}

let failures = 0;

for (const url of urls) {
  try {
    const rawAppHtml = await render(url);
    const { head, body } = splitHoistedHead(rawAppHtml);

    const html = template
      .replace('<title>TMS-HYDRA | Hydroizolácie a zateplenie striech</title>', head)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

    const outPath = outputPathFor(url);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, 'utf-8');
  } catch (error) {
    failures += 1;
    console.error(`Failed to prerender ${url}:`, error);
  }
}

console.log(`Prerendered ${urls.length - failures}/${urls.length} routes.`);

if (existsSync(ssrDir)) {
  rmSync(ssrDir, { recursive: true, force: true });
}

if (failures > 0) {
  process.exit(1);
}
