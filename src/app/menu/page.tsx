import MenuPage from "@/components/MenuPage";
import { menuCategories } from "@/data/menu";
import { site } from "@/data/site";
import { pageMetadata, pageUrl } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menu — Biryani, Dosa & Tandoor | Athidhi, Plainsboro NJ",
  description:
    "See Athidhi's full menu with prices: South Indian dosas and idlis, Hyderabadi biryani, tandoor, curries and Indo-Chinese. Order online for pickup or delivery.",
  path: "/menu",
});

// The menu for Google and other search tools: every section, dish, price and veg mark
// (schema.org Menu), linked from the restaurant's data on the home page.
const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${pageUrl("/menu")}#menu`,
  name: `${site.name} Menu`,
  url: pageUrl("/menu"),
  inLanguage: "en",
  hasMenuSection: menuCategories.map((section) => ({
    "@type": "MenuSection",
    name: section.name,
    hasMenuItem: section.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      ...(item.photo ? { image: item.photo } : {}),
      ...(item.price !== undefined ? { offers: { "@type": "Offer", price: item.price.toFixed(2), priceCurrency: "USD" } } : {}),
      ...(item.diet === "veg" ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
    })),
  })),
};

export default function Menu() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd).replace(/</g, "\\u003c") }} />
      <MenuPage />
    </>
  );
}
