/**
 * Every image (and the catering PDF) still loads from the old deployment at athidi.vercel.app.
 * If that deployment is ever removed, the site loses its pictures — so self-host them by running
 *
 *   node scripts/download-assets.mjs
 *
 * It copies every file into /public at the same path, then sets ASSET_BASE = "" below.
 */
export const ASSET_BASE = "https://athidi.vercel.app";

export function asset(path: string): string {
  return `${ASSET_BASE}${path}`;
}
