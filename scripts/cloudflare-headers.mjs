// Run after the official static build: writes out/_headers, which Cloudflare Pages reads to send
// security and cache headers (static hosts can't take them from next.config.ts).
// Keep the security headers in step with `securityHeaders` in next.config.ts.
//
//   node scripts/cloudflare-headers.mjs [output folder, default "out"]

import { writeFileSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "..", process.argv[2] ?? "out");

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  // Dish photos uploaded in Toast load from Toast's storage.
  "img-src 'self' blob: data: https://s3.amazonaws.com/toasttab/",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const rules = {
  "/*": {
    "Strict-Transport-Security": "max-age=63072000",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy": contentSecurityPolicy,
  },
  // Script and style files have their contents' hash in their names, so they never change.
  "/_next/static/*": { "Cache-Control": "public, max-age=31536000, immutable" },
  // Photo copies (scripts/image-variants.mjs) change only when a photo is replaced.
  "/assets/w/*": { "Cache-Control": "public, max-age=604800" },
  "/images/w/*": { "Cache-Control": "public, max-age=604800" },
};

const text = Object.entries(rules)
  .map(([route, headers]) => [route, ...Object.entries(headers).map(([name, value]) => `  ${name}: ${value}`)].join("\n"))
  .join("\n");
writeFileSync(path.join(outDir, "_headers"), `${text}\n`);
console.log(`Wrote ${path.relative(process.cwd(), path.join(outDir, "_headers"))}`);
