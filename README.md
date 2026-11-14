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
| Restaurant menu | Comes from Toast every hour (`scripts/sync-toast-menu.mjs` → `src/data/toast-menu.json`); change dishes, prices and photos in Toast |
| Veg / non-veg marks, "Most Loved" dishes, fallback menu | `src/data/menu.ts` |
| Catering menu (keep the PDF in step) | `src/data/catering.ts` |
| Share image, favicon, app icons | `src/app/opengraph-image.png`, `favicon.ico`, `icon.png`, `apple-icon.png` |

## Before going live

1. **Self-host the photos.** They still load from the old deployment (athidi.vercel.app). Run
   `node scripts/download-assets.mjs` — it copies every file into `public/` and switches the site
   over. Commit `public/` and `src/lib/assets.ts`.
2. **Set the site address.** With a custom domain, add `NEXT_PUBLIC_SITE_URL` (e.g.
   `https://www.example.com`) in the Vercel project settings. It's used for canonical links, share
   previews, the sitemap and Google's restaurant data. Without it, Vercel's production domain is used.
3. **Turn on Web Analytics** in the Vercel project (Analytics tab) to see visitor numbers.

## Toast menu sync

The deploy workflow (`.github/workflows/pages.yml`) copies the menu from Toast every hour and
redeploys when it changes. It uses read-only Toast Standard API credentials stored as repository
secrets: `TOAST_CLIENT_ID`, `TOAST_CLIENT_SECRET`, `TOAST_RESTAURANT_GUID` (and optionally
`TOAST_API_HOSTNAME`, default `https://ws-api.toasttab.com`). Only dishes visible on Toast online
ordering are shown; catering trays are left off the menu page. To sync now, run the workflow from
the Actions tab.
