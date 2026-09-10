# Search visibility

The production build generates a pre-rendered homepage, 126 product pages, 10 category pages and a catalogue directory. All pages use canonical URLs, unique titles/descriptions and social sharing metadata. Product schema describes the supplied catalogue without invented prices, ratings or stock availability.

The sitemap is available at https://s0hamkadam13012005.github.io/nidhi-cosmetics/sitemap.xml. Submit it in Google Search Console after the site owner verifies the property. Search Console ownership and indexing are not configured by this build; rankings cannot be guaranteed.

The canonical origin is configured in scripts/build-site.mjs. When moving to the final business domain, update this origin, deploy there, redirect the old public URLs where supported, and submit the new sitemap. The generated robots.txt is usable at a domain root; GitHub project Pages does not control the account-level /robots.txt.

The logo reveal plays on every homepage load, including versioned links, and opens outward before starting the product slideshow. Product enquiry deep links and reduced-motion preferences bypass the intro. Skip intro, Escape or Tab dismiss it. The four-slide carousel rotates every 6.5 seconds and loops; selecting a slide or focusing its controls stops rotation for manual browsing. Reduced-motion users browse slides manually. The underlying content is never held behind a network-dependent loader.

## Search improvements

Search supports common product-name variants, plurals, word prefixes and conservative one-character spelling corrections. Results rank stronger matches first and require every meaningful search term to match. Header and mobile search show up to six suggestions, support arrow keys and Enter, and provide a link to the full result set. Product and category pages include a search form leading to the homepage results using a shareable `q` parameter.

Category navigation uses crawlable links. Category pages include individual descriptions, breadcrumbs and an ItemList linking to every product in that category. The sitemap includes product images, and the generated 404 page is excluded from indexing. Verification checks all 138 canonical pages for distinct titles/descriptions and confirms category/product reachability.

Prices, stock status, customer ratings and shipping policies are intentionally absent from structured data until the business supplies them. Product schema alone does not guarantee Google rich results; price/rating requirements and indexing remain separate from the site's technical checks.
