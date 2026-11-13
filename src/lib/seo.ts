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

/** "/menu" → "https://…/menu". Absolute URLs (e.g. images still on the old host) pass through. */
export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).href;
}

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
    alternates: { canonical: path },
    // A page that sets its own share text doesn't inherit the root share image, so it's listed here.
    openGraph: { type: "website", siteName: site.name, locale: "en_US", url: path, title, description, images: [shareImage] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
  };
}
