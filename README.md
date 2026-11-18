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

The official site (athidhinj.com) is hosted on IONOS Web Hosting, where the domain is registered,
because GitHub Pages' terms don't allow business websites. The github.io preview stays, marked so
search engines skip it.

1. **Make an SFTP login.** In IONOS, under Hosting → SFTP, create an account of the type *SFTP*
   with access to the whole webspace, and save its server, user name and password in this
   repository's Actions secrets as `IONOS_SFTP_HOST`, `IONOS_SFTP_USER` and
   `IONOS_SFTP_PASSWORD`. The next deploy builds the official site and uploads it to the webspace
   folder `athidhinj` (repository variable `IONOS_SITE_DIR` to change it), with the web server
   settings from `scripts/ionos-htaccess.mjs`. The first upload prints the server's key; save it
   as the repository variable `IONOS_KNOWN_HOSTS` so later uploads only trust that key.
2. **Make the menu sync hourly.** GitHub skips many scheduled runs, so a timer on IONOS
   (`ionos/menu-sync.sh`) starts the sync every hour instead. Create a fine-grained GitHub token
   (Settings → Developer settings → Personal access tokens → Fine-grained tokens) for this
   repository only, with *Actions: Read and write*, and add it as the Actions secret
   `MENU_SYNC_TOKEN`. The next push or manual run puts the script and token in the webspace folder
   `athidhi-cron`, readable only by the hosting account. Then, in IONOS under Hosting → Cron jobs,
   create a *UnixCron* job whose command is the script's full path
   (`/home/www/athidhi-cron/menu-sync.sh` on this contract), with the extended interval minute
   17, every hour. Each run writes its result to `athidhi-cron/last-run.log`. When the token
   expires, replace the secret and run the workflow again.
3. **Point the domain.** In IONOS, set athidhinj.com's destination to the webspace folder
   `athidhinj`, turn on the SSL certificate included with the hosting for athidhinj.com and
   www.athidhinj.com, and remove the old `_acme-challenge` record that pointed to Toast's website
   service. Email records aren't affected.
4. **Update the website link** on Google Business Profile and Toast, and add the site to Google
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
redeploys when it changes. The hourly runs are started by the timer on IONOS once it's set up
("Before going live", step 2); until then they rely on GitHub's own schedule, which skips many
runs. It uses read-only Toast Standard API credentials stored as repository
secrets: `TOAST_CLIENT_ID`, `TOAST_CLIENT_SECRET`, `TOAST_RESTAURANT_GUID` (and optionally
`TOAST_API_HOSTNAME`, default `https://ws-api.toasttab.com`). Only dishes visible on Toast online
ordering are shown; catering trays are left off the menu page. To sync now, run the workflow from
the Actions tab.
