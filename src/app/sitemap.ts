import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Pages for search engines to index (served at /sitemap.xml).
const pages = ["/", "/menu", "/banquet", "/catering", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({ url: absoluteUrl(path) }));
}
