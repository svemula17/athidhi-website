# Athidhi — restaurant website

Next.js site for Athidhi, Indian fine dining at 660 Plainsboro Rd, Plainsboro Township, NJ.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Where to change things

| What | File |
| --- | --- |
| Phone, email, address, hours, social links | `src/data/site.ts` |
| Online ordering link (empty = "Call to Order" buttons) | `orderOnlineUrl` in `src/data/site.ts` |
| Dish pop-up and dine-in list on the menu page | `src/components/DineIn.tsx`, `src/lib/dine-in-list.ts` |
| Restaurant menu | Comes from Toast every hour (`scripts/sync-toast-menu.mjs` → `src/data/toast-menu.json`); change dishes, prices and photos in Toast |
| Veg / non-veg marks, "Most Loved" dishes, fallback menu | `src/data/menu.ts` |
| Catering menu (keep the PDF in step) | `src/data/catering.ts` |
| Share image, favicon, app icons | `src/app/opengraph-image.png`, `favicon.ico`, `icon.png`, `apple-icon.png` |

## Before going live

The official site (athidhinj.com) is hosted on Cloudflare Pages, because GitHub Pages' terms don't
allow business websites. The github.io preview stays, marked so search engines skip it.

1. **Connect Cloudflare.** In a free Cloudflare account, create an API token with the
   *Account → Cloudflare Pages → Edit* permission. Add it to this repository's Actions secrets as
   `CLOUDFLARE_API_TOKEN`, and the account ID (Cloudflare dashboard) as `CLOUDFLARE_ACCOUNT_ID`.
   The next deploy builds the official site and publishes it to the Cloudflare Pages project
   `athidhi` (repository variable `CLOUDFLARE_PROJECT` to change it).
2. **Point the domain.** Add athidhinj.com to Cloudflare (it copies the existing DNS records,
   including email), switch the domain's name servers at IONOS to Cloudflare's, then add
   athidhinj.com and www.athidhinj.com as custom domains of the Pages project.
3. **Update the website link** on Google Business Profile and Toast, and add the site to Google
   Search Console with its sitemap (`/sitemap.xml`).

The site address used in canonical links, share previews, the sitemap and Google's restaurant data
is `https://athidhinj.com` (repository variable `SITE_URL` to change it).

## Ordering

Every "Order Online" button opens Athidhi's Toast online ordering, where guests build the whole
pickup or delivery order and pay. On the menu page, tapping a dish opens a pop-up where guests can
add it to their **dine-in list** (to show their server at the table) or open it on Toast. The list
is kept only in the guest's browser; nothing is sent to the restaurant.

## Toast menu sync

The deploy workflow (`.github/workflows/pages.yml`) copies the menu from Toast every hour and
redeploys when it changes. It uses read-only Toast Standard API credentials stored as repository
secrets: `TOAST_CLIENT_ID`, `TOAST_CLIENT_SECRET`, `TOAST_RESTAURANT_GUID` (and optionally
`TOAST_API_HOSTNAME`, default `https://ws-api.toasttab.com`). Only dishes visible on Toast online
ordering are shown; catering trays are left off the menu page. To sync now, run the workflow from
the Actions tab.
