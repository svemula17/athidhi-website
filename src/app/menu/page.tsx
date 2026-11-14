import MenuPage from "@/components/MenuPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menu & Online Ordering — Athidhi",
  description: "Browse Athidhi's menu — dosas, biryanis, tandoor, Indo-Chinese and more — and order for pickup or delivery.",
  path: "/menu",
});

export default function Menu() {
  return <MenuPage />;
}
