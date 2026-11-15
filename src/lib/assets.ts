/**
 * The photos and the catering PDF were copied from the old site (athidi.vercel.app) into /public
 * by scripts/download-assets.mjs, so ASSET_BASE is empty and they're served from this site.
 */
export const ASSET_BASE = "";

/** Set when the site is served from a sub-folder, e.g. "/athidhi-website" on GitHub Pages. */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** A photo or PDF from the old deployment (or from /public once self-hosted). */
export function asset(path: string): string {
  return `${ASSET_BASE || BASE_PATH}${path}`;
}

/** A file that lives in /public, e.g. "/images/catering-buffet.jpg". */
export function publicFile(path: string): string {
  return `${BASE_PATH}${path}`;
}
