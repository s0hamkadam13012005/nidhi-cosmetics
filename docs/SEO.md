# Search visibility

The production build generates a pre-rendered homepage, 126 product pages, 10 category pages and a catalogue directory. All pages use canonical URLs, unique titles/descriptions and social sharing metadata. Product schema describes the supplied catalogue without invented prices, ratings or stock availability.

The sitemap is available at https://s0hamkadam13012005.github.io/nidhi-cosmetics/sitemap.xml. Submit it in Google Search Console after the site owner verifies the property. Search Console ownership and indexing are not configured by this build; rankings cannot be guaranteed.

The canonical origin is configured in scripts/build-site.mjs. When moving to the final business domain, update this origin, deploy there, redirect the old public URLs where supported, and submit the new sitemap. The generated robots.txt is usable at a domain root; GitHub project Pages does not control the account-level /robots.txt.

Opening motion plays once per browser session on the homepage, skips deep links, honors reduced motion, and can be dismissed via Skip intro, Escape or Tab. The underlying content is never held behind a network-dependent loader.
