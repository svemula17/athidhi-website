// Copies every image and PDF the site references from the old deployment (athidi.vercel.app)
// into /public, so the site stops depending on it.
//
//   node scripts/download-assets.mjs            download everything
//   node scripts/download-assets.mjs --dry-run  only list the files
//
// Afterwards set ASSET_BASE = "" in src/lib/assets.ts.

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://athidi.vercel.app";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");

async function sourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return sourceFiles(full);
      return /\.(ts|tsx)$/.test(entry.name) ? [full] : [];
    }),
  );
  return nested.flat();
}

const assetPaths = new Set();
for (const file of await sourceFiles(path.join(root, "src"))) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/["'`](\/[^"'`\s$]+?\.(?:png|jpe?g|webp|gif|pdf))["'`]/gi)) {
    assetPaths.add(match[1]);
  }
}

const paths = [...assetPaths].sort();

if (dryRun) {
  console.log(paths.join("\n"));
  console.log(`\n${paths.length} files referenced.`);
  process.exit(0);
}

let failed = 0;
for (const assetPath of paths) {
  try {
    const res = await fetch(ORIGIN + assetPath);
    const type = res.headers.get("content-type") ?? "";
    // A missing file comes back as the old site's HTML page, so treat HTML as a failure too.
    if (!res.ok || type.includes("text/html")) throw new Error(`HTTP ${res.status} ${type}`);
    const dest = path.join(root, "public", decodeURIComponent(assetPath));
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${assetPath}`);
  } catch (err) {
    failed += 1;
    console.error(`✗ ${assetPath} — ${err.message}`);
  }
}

console.log(`\nSaved ${paths.length - failed} of ${paths.length} files to public/.`);
if (failed) process.exitCode = 1;
else console.log('Next: set ASSET_BASE = "" in src/lib/assets.ts.');
