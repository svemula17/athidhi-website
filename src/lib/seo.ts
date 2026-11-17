import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * The site's public address, used for canonical links, share previews, the sitemap and Google's
 * restaurant data. Set NEXT_PUBLIC_SITE_URL (e.g. https://www.athidhinj.com) once the site has its
 * own domain; on Vercel it otherwise uses the project's production domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

/** Any file or page on this site: "/sitemap.xml" → "https://…/sitemap.xml" (keeps any sub-folder in siteUrl). */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

/**
 * A page's own address. The static build (GitHub Pages, and any static host) serves each page as a
 * folder, "/menu/", and redirects "/menu" there, so links to pages end in a slash in that build.
 */
export function pagePath(path: string): string {
  return process.env.GITHUB_PAGES === "true" && !path.endsWith("/") ? `${path}/` : path;
}

/** A page's full address: "/menu" → "https://…/menu/" in the static build. */
export function pageUrl(path: string): string {
  return absoluteUrl(pagePath(path));
}

/**
 * Keeps a build out of search results. Set for the github.io preview so only the official domain
 * (athidhinj.com) is indexed; leave unset for the official build.
 */
export const noIndex = process.env.NEXT_PUBLIC_NOINDEX === "true";

/** An image address from asset() or publicFile(), made absolute. */
export function absoluteAssetUrl(src: string): string {
  return new URL(src, siteUrl).href;
}

/** How search results describe the restaurant: the home page, the defaults, and Google's restaurant data. */
export const homeTitle = "Athidhi | Indian Restaurant & Banquet Hall in Plainsboro, NJ";
export const homeDescription =
  "Indian fine dining in Plainsboro, NJ, near Princeton: dosas, Hyderabadi biryani, tandoor and Indo-Chinese. Dine in, order online, or book our banquet hall.";

/** The picture shown when a page is shared (src/app/opengraph-image.png). */
const shareImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Athidhi — Athidhi Devo Bhava. Indian fine dining at 660 Plainsboro Rd, Plainsboro, NJ.",
};

/** Title, description, canonical link and share preview for one page. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pagePath(path) },
    // A page that sets its own share text doesn't inherit the root share image, so it's listed here.
    openGraph: { type: "website", siteName: site.name, locale: "en_US", url: pagePath(path), title, description, images: [shareImage] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
  };
}
