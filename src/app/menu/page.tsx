import MenuBrowser from "@/components/MenuBrowser";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menu — Discover Athidhi",
  description: "Dosas, biryanis, tandoor, Indo-Chinese, desserts and more at Athidhi, Plainsboro NJ.",
  path: "/menu",
});

export default function MenuPage() {
  return <MenuBrowser />;
}
