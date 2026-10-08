// ILANG
// TYPE:worker ROLE:canonical-host-and-real-404
const CANONICAL_HOST = "pet-fresh-food-decisions.pages.dev";
const VALID_PATHS = new Set(["/", "/8d1fdad53bc6f2222cc7db4d6d221019.txt", "/about", "/assets/favicon.svg", "/assets/fresh-food-price-units.svg", "/assets/justfoodfordogs-14-pack-prices.svg", "/assets/ollie-cost-per-day.svg", "/assets/ollie-vs-tfd-price-units.svg", "/assets/raw-delivery-price-units.svg", "/assets/style.css", "/best-fresh-dog-food-subscriptions", "/best-raw-dog-food-delivery", "/contact", "/justfoodfordogs-fresh-food", "/justfoodfordogs-review", "/ollie-cost-per-day", "/ollie-fresh-dog-food", "/ollie-vs-the-farmers-dog", "/privacy", "/robots.txt", "/sitemap.xml", "/the-farmers-dog"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname !== CANONICAL_HOST) {
      return Response.redirect(new URL(url.pathname + url.search, `https://${CANONICAL_HOST}`).toString(), 301);
    }

    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path.endsWith(".html")) {
      const bare = path === "/index.html" ? "/" : path.slice(0, -5);
      if (VALID_PATHS.has(bare)) {
        return Response.redirect(new URL(bare + url.search, `https://${CANONICAL_HOST}`).toString(), 308);
      }
    }

    if (VALID_PATHS.has(path)) {
      return env.ASSETS.fetch(request);
    }

    const notFound = await env.ASSETS.fetch(new URL("/404.html", url));
    return new Response(notFound.body, {
      status: 404,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "x-robots-tag": "noindex",
      },
    });
  },
};
