import type { Metadata } from "next";
import MenuBrowser from "@/components/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu — Discover Athidhi",
  description: "Dosas, biryanis, tandoor, Indo-Chinese, desserts and more at Athidhi, Plainsboro NJ.",
};

export default function MenuPage() {
  return <MenuBrowser />;
}
