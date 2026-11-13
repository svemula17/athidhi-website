import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/seo";

// Fonts are served with the site (src/fonts) rather than fetched from Google on every visit.
const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const playfair = localFont({
  src: [
    { path: "../fonts/playfair-display-latin-wght-normal.woff2", weight: "400 900", style: "normal" },
    { path: "../fonts/playfair-display-latin-wght-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Defaults for every page; each page sets its own title, description and canonical link (src/lib/seo.ts).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Athidhi — Athidhi Devo Bhava | Luxury Indian Fine Dining, Plainsboro NJ",
  description: `${site.description} ${site.address.street}, ${site.address.city}.`,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Without JavaScript the scroll-reveal never fires, so show that content straight away. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>.reveal,.reveal-zoom,.reveal-stagger>*{opacity:1!important;transform:none!important}</style>",
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Visitor counts in the Vercel dashboard (turn on Web Analytics for the project there). */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
