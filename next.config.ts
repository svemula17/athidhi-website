import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
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
};

export default nextConfig;
