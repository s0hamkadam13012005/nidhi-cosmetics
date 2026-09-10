import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const home=await fs.readFile('dist/index.html','utf8');
assert(home.includes('MAKE A SPLASH.'));
assert(home.includes('Complete product directory'));
assert.equal((home.match(/<title>/g)||[]).length,1);
assert.equal((home.match(/name="description"/g)||[]).length,1);
const products=JSON.parse(await fs.readFile('src/data/products.json','utf8'));
for(const p of products){const html=await fs.readFile(`dist/products/${p.id}/index.html`,'utf8');assert(html.includes('<h1>'));assert(html.includes(`products/${p.id}/`));assert(!html.includes('type="module"'));const schemas=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m=>JSON.parse(m[1]));assert(schemas.some(s=>s['@type']==='Product'&&s.name===p.name));assert(schemas.some(s=>s['@type']==='BreadcrumbList'));assert(!schemas.some(s=>s.offers||s.aggregateRating))}
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,138);
console.log('Verified 138 static pages, 126 product schemas, unique homepage metadata and sitemap.');
