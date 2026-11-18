// Run after the official static build: writes out/.htaccess, the settings file IONOS's web server
// (Apache) reads for redirects, error pages, and security and cache headers. Static hosts can't
// take headers from next.config.ts, so keep the security headers in step with `securityHeaders`
// there.
//
//   node scripts/ionos-htaccess.mjs [output folder, default "out"]

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

const securityHeaders = {
  "Strict-Transport-Security": "max-age=63072000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": contentSecurityPolicy,
};

// In order: when a later rule also matches, it wins.
const cacheRules = [
  // Photos, the logo and the venue video.
  ["^/(assets|images)/", "public, max-age=86400"],
  // Photo copies (scripts/image-variants.mjs) change only when a photo is replaced.
  ["^/(assets|images)/w/", "public, max-age=604800"],
  // Script and style files have their contents' hash in their names, so they never change.
  ["^/_next/static/", "public, max-age=31536000, immutable"],
  // Pages and their data files: check for a newer copy on every visit, so menu changes show at once.
  ["(/|\\.html|\\.txt)$", "no-cache"],
];

const quote = (value) => `"${value.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;

const text = `# Written by scripts/ionos-htaccess.mjs after each build; change that script, not this file.

ErrorDocument 404 /404.html
AddDefaultCharset UTF-8
AddType image/webp .webp
AddType image/avif .avif
AddType application/manifest+json .webmanifest

<IfModule mod_rewrite.c>
  RewriteEngine On
  # www.athidhinj.com → athidhinj.com
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^ https://%1%{REQUEST_URI} [R=301,L]
  # http:// → https://
  RewriteCond %{HTTPS} off
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</IfModule>

<IfModule mod_headers.c>
${Object.entries(securityHeaders)
  .map(([name, value]) => `  Header always set ${name} ${quote(value)}`)
  .join("\n")}
${cacheRules
  .map(([pattern, value]) => `  <If "%{REQUEST_URI} =~ m#${pattern}#">\n    Header set Cache-Control ${quote(value)}\n  </If>`)
  .join("\n")}
</IfModule>

<IfModule mod_deflate.c>
  <IfModule mod_filter.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json application/manifest+json application/xml image/svg+xml
  </IfModule>
</IfModule>
`;

writeFileSync(path.join(outDir, ".htaccess"), text);
console.log(`Wrote ${path.relative(process.cwd(), path.join(outDir, ".htaccess"))}`);
