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
const categories=JSON.parse(await fs.readFile('src/data/categories.json','utf8'));
const slug=s=>s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-');
const titles=new Set(),descriptions=new Set();
for(const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)){
 const url=match[1],relative=new URL(url).pathname.replace('/nidhi-cosmetics/','');
 const html=await fs.readFile('dist/'+relative+'index.html','utf8');
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 assert(html.includes(`rel="canonical" href="${url}"`));
 const title=html.match(/<title>(.*?)<\/title>/)[1],description=html.match(/name="description" content="([^"]+)"/)[1];
 assert(!titles.has(title),'Duplicate title '+title);titles.add(title);
 assert(!descriptions.has(description),'Duplicate description '+url);descriptions.add(description);
}
for(const category of categories){const html=await fs.readFile(`dist/categories/${slug(category)}/index.html`,'utf8');for(const p of products.filter(p=>p.category===category))assert(html.includes(`/products/${p.id}/`));assert(html.includes('"@type":"ItemList"'));assert(home.includes(`/categories/${slug(category)}/`))}
assert.equal((sitemap.match(/<image:loc>/g)||[]).length,126);
assert((await fs.readFile('dist/404.html','utf8')).includes('noindex,follow'));
assert(!sitemap.includes('404.html'));
console.log('SEO crawl checks passed: unique metadata, consistent canonical URLs, category-to-product links, 126 sitemap images and a noindex 404 page.');
