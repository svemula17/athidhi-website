import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
// Vercel preview deployments load a feedback toolbar from vercel.live; production doesn't.
const isPreview = process.env.VERCEL_ENV === "preview";
const preview = (sources: string) => (isPreview ? ` ${sources}` : "");

// What pages may load. Photos come through Next's image optimizer and fonts are bundled, so both are
// same-origin; analytics also reports to this domain (/_vercel). Production only, so local
// development tools keep working.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${preview("https://vercel.live")}`,
  `style-src 'self' 'unsafe-inline'${preview("https://vercel.live")}`,
  `img-src 'self' blob: data: https://athidi.vercel.app${preview("https://vercel.live https://vercel.com")}`,
  `font-src 'self'${preview("https://vercel.live https://assets.vercel.com")}`,
  `connect-src 'self'${preview("https://vercel.live wss://ws-us3.pusher.com")}`,
  `frame-src ${isPreview ? "https://vercel.live" : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ...(isProduction ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }] : []),
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Images are served from the old deployment until they're self-hosted (see src/lib/assets.ts).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "athidi.vercel.app",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
