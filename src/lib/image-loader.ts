"use client";

// Static build only (see next.config.ts). Static hosts have no image optimizer, so the site's own
// photos (/assets, /images) load as WebP copies sized for each screen, which
// scripts/image-variants.mjs writes after the build: "/assets/Hero.jpg" at 1080px wide becomes
// "/assets/w/Hero-1080.webp". Anything else loads as it is (Toast photos also pass `unoptimized`).
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const match = /^(.*\/(?:assets|images)\/)([^/?#]+)\.(?:jpe?g|png)$/i.exec(src);
  return match ? `${match[1]}w/${match[2]}-${width}.webp` : src;
}
