/**
 * Every image (and the catering PDF) still loads from the old deployment at athidi.vercel.app.
 * If that deployment is ever removed, the site loses its pictures — so self-host them by running
 *
 *   node scripts/download-assets.mjs
 *
 * It copies every file into /public at the same path, then sets ASSET_BASE = "" below.
 */
export const ASSET_BASE = "https://athidi.vercel.app";

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
