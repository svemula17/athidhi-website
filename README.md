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
| Restaurant menu: dishes, prices, veg / non-veg marks | `src/data/menu.ts` |
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
