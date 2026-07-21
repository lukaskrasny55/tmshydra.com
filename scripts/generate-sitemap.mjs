// Generates public/sitemap.xml from data/cities.js so the sitemap always
// matches the URLs the app can actually serve. Runs automatically before
// `npm run build` (see "prebuild" in package.json) and can also be run
// manually with `npm run generate-sitemap`.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { cityData, serviceNames } from '../data/cities.js';
import { ROUTE_PATHS } from '../routePaths.ts';

const baseUrl = 'https://www.tmshydra.com';

const mainPagePriorities = {
  [ROUTE_PATHS.home]: '1.0',
  [ROUTE_PATHS.services]: '0.9',
  [ROUTE_PATHS.about]: '0.8',
  [ROUTE_PATHS.projects]: '0.8',
  [ROUTE_PATHS.contact]: '0.8',
  [ROUTE_PATHS.otherServices]: '0.7',
  [ROUTE_PATHS.tech]: '0.7',
};

const urls = Object.entries(mainPagePriorities).map(([routePath, priority]) => ({
  loc: `${baseUrl}${routePath}`,
  priority,
}));

for (const service of Object.keys(serviceNames)) {
  for (const city of Object.keys(cityData)) {
    urls.push({ loc: `${baseUrl}/sluzby/${service}/${city}`, priority: '0.7' });
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'sitemap.xml'
);

writeFileSync(outPath, xml, 'utf-8');

console.log(`sitemap.xml generated: ${urls.length} URLs -> ${outPath}`);
