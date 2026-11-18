// Run on the official build before it's uploaded to IONOS: gives every file a modification time
// worked out from its contents, so a file that didn't change keeps the same time from one build
// to the next. The upload (lftp mirror in .github/workflows/pages.yml) skips files whose size and
// time match the copy on the server, so only files that actually changed are sent.
//
//   node scripts/stable-file-times.mjs [folder, default "out"]

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, utimesSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", process.argv[2] ?? "out");

// A time between 2001 and 2009, picked by the file's hash.
const timeFor = (file) => {
  const hash = createHash("sha256").update(readFileSync(file)).digest();
  return 1_000_000_000 + (hash.readUInt32BE(0) % 250_000_000);
};

let count = 0;
for (const entry of readdirSync(root, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const file = path.join(entry.parentPath, entry.name);
  const time = timeFor(file);
  utimesSync(file, time, time);
  count++;
}
console.log(`Set content-based times on ${count} files in ${path.relative(process.cwd(), root) || "."}`);
