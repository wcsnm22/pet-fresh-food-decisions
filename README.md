# pet-fresh-food-decisions

Static site for pillar 2 (fresh food & subscriptions) of the Pet Care Decisions project:
**Pet Fresh Food Decisions** — https://pet-fresh-food-decisions.pages.dev

Rules (same as the sibling sites):
- Pure static: `build.py` renders `data/brands.json` + `data/articles.json` into `site/`
  (JSON-LD, canonical, sitemap.xml, robots.txt, real 404 via the generated `_worker.js`).
- English pages only. Every fact carries its official source URL and check date;
  a missing source fails the build. Prices/promos are never invented — if the brand's
  own site doesn't publish it, the page says so.
- Source domains are whitelisted in `build.py` (`OFFICIAL_HOSTS`) and re-checked by
  `selfcheck.py` (four checks: no Chinese output, fact provenance, rendered
  provenance per page, JSON-LD/canonical/nav).

Build locally:

```
python build.py
python selfcheck.py
```

Deploy: GitHub Actions (`.github/workflows`, wrangler) → Cloudflare Pages project
`pet-fresh-food-decisions`. For a local deploy set the canonical host first, e.g.
`PET_SITE_CANONICAL_HOST=pet-fresh-food-decisions.pages.dev python build.py`.

Sites: [Ollie](/ollie-fresh-dog-food), [The Farmer's Dog](/the-farmers-dog),
[JustFoodForDogs](/justfoodfordogs-fresh-food).
