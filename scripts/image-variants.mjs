// Run after a static build (GITHUB_PAGES=true npm run build): writes a WebP copy of every photo in
// public/assets and public/images at each width the pages can ask for (src/lib/image-widths.json),
// into out/<folder>/w/, where src/lib/image-loader.ts points the pages.
//
//   node scripts/image-variants.mjs [output folder, default "out"]

import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const { deviceSizes, imageSizes } = JSON.parse(readFileSync(path.join(root, "src/lib/image-widths.json"), "utf8"));
const widths = [...imageSizes, ...deviceSizes];
const outDir = path.resolve(root, process.argv[2] ?? "out");

let files = 0;
for (const folder of ["assets", "images"]) {
  const source = path.join(root, "public", folder);
  if (!existsSync(source)) continue;
  const dest = path.join(outDir, folder, "w");
  mkdirSync(dest, { recursive: true });
  for (const file of readdirSync(source)) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const name = file.replace(/\.[^.]+$/, "");
    const input = readFileSync(path.join(source, file));
    await Promise.all(
      widths.map((width) =>
        sharp(input)
          .rotate() // apply the camera's orientation
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(path.join(dest, `${name}-${width}.webp`)),
      ),
    );
    files += widths.length;
  }
}
console.log(`Wrote ${files} WebP copies to ${path.relative(root, outDir)}/{assets,images}/w/`);
