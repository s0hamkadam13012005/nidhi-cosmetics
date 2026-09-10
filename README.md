# Nidhi Cosmetics

React + Vite catalogue with 126 product listings across 10 categories, including 14 EYLIN bath-and-body collections.

## Run

```sh
npm ci
npm run dev
```

## Verify and build

```sh
node scripts/test-catalogue.mjs
npm run build
npm run preview
```

The GitHub Pages workflow publishes `main`. The original nidhicosmetic.com website is unchanged.

## Catalogue

- Search, category and collection filters, alphabetical sorting and progressive product loading
- 258 selected product photographs with responsive WebP sizes and detail galleries
- Persistent sample shortlist with quantities
- Enquiry form that prepares an email or downloads a text enquiry
- Responsive layouts, self-hosted fonts, light/dark theme and reduced-motion support

Product data is in `src/data/products.json`; the source-photo mapping is in `docs/product-catalogue.csv`. Names and categories were reconciled against the supplied September 2026 product archive. Alternate compositions are grouped in galleries. Sizes are included where legible; availability, kit contents and pricing are confirmed on enquiry.

To regenerate assets, extract the supplied archive locally to `source-assets/full-catalogue/website folder`, then run `node scripts/catalogue-inventory.mjs` and `node scripts/import-catalogue.mjs`. The original archive and inspection output are excluded from Git.

## Search and opening experience

The build produces 138 static pages, including all product and category pages, with metadata, canonical URLs, structured data and a sitemap. See docs/SEO.md for Search Console and final-domain setup. The homepage has a brief, skippable brand reveal with reduced-motion support.
