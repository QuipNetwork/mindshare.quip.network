import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../dist-ssr/entry-server.js';

const output = new URL('../dist/', import.meta.url);
const index = new URL('index.html', output);
const template = await readFile(index, 'utf8');
const outlet = '<div id="root"></div>';
const canonical = template.match(/<link rel="canonical" href="([^"]+)"/)?.[1];

if (!template.includes(outlet) || !canonical) {
  throw new Error(
    'The page template must contain the root outlet and canonical URL.'
  );
}

await writeFile(
  index,
  template.replace(outlet, () => `<div id="root">${render()}</div>`)
);
await writeFile(
  new URL('sitemap.xml', output),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${canonical}</loc></url>
</urlset>
`
);
await writeFile(
  new URL('robots.txt', output),
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', canonical).href}\n`
);
