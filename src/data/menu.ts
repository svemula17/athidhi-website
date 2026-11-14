// The menu page's dishes. They come from Toast (src/data/toast-menu.json, refreshed by
// scripts/sync-toast-menu.mjs) once that sync has run; until then, from the list below, which was
// copied from the old site (athidi.vercel.app/menu) in November 2026.

import toastMenuFile from "./toast-menu.json";
import type { ToastMenuFile } from "./toast";

export type MenuItem = {
  name: string;
  description: string;
  /** Left off when Toast prices the dish by size or option. */
  price?: number;
  /** Struck-through "was" price, shown when a dish is on offer. */
  originalPrice?: number;
  /** Path on the asset host, e.g. "/assets/biryani-DciHh55y.png". */
  image: string;
  /** The dish's own photo from Toast (a full URL); shown instead of `image` when present. */
  photo?: string;
  /**
   * Vegetarian or not, shown as the green / brown mark next to the dish. "both" = comes either way
   * (e.g. veg or chicken). Left off where it depends on the kitchen's recipe (egg in naan or brownies).
   */
  diet?: Diet;
};

export type Diet = "veg" | "nonveg" | "both";

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

const img = {
  dosaPhoto: "/assets/AthidhiIndianFineDineRestaurant_Dosa-CX4LpkSf.jpg",
  dosa: "/assets/dosaanduttapam-3MHeXkW-.png",
  idli: "/assets/idlyandvada-ChYXfx0A.png",
  vegEntree: "/assets/vegentry-uHL8U_T3.png",
  soup: "/assets/soup-fkux9ccR.png",
  vegAppetizer: "/assets/vegappetizers-BZ1xDMvB.png",
  chicken65: "/assets/AthidhiIndianFineDineRestaurant_Chicken65-b53r9y2c.jpg",
  nonVegAppetizer: "/assets/nonvegappetizers-DKmGNK6S.png",
  mirchiBajji: "/assets/AthidhiIndianFineDineRestaurant_StuffedMirchiBajji-BJJUWRy1.jpg",
  seafood: "/assets/Seafood-CI44vID5.png",
  indoChinese: "/assets/indo-chinese-DFlfAbEK.png",
  bread: "/assets/bread-GkZByPmF.png",
  biryani: "/assets/biryani-DciHh55y.png",
  goatBiryani: "/assets/AthidhiIndianFineDineRestaurant_HyderabadiGoatDumBiryani-COewIYqx.jpg",
  dessert: "/assets/desserts-BD9EgQpv.png",
  beverage: "/assets/beverage-C8ieDr6v.png",
};

const staticCategories: MenuCategory[] = [
  {
    id: "dosa-uttapam",
    name: "Dosa & Uttapam",
    items: [
      { name: "Plain Dosa", description: "Crispy golden crepe made from fermented rice and lentil batter.", price: 12.99, image: img.dosa, diet: "veg" },
      { name: "Masala Dosa", description: "Classic dosa stuffed with flavorful potato masala.", price: 14.99, originalPrice: 17.99, image: img.dosaPhoto, diet: "veg" },
      { name: "Mysore Masala Dosa", description: "Crispy dosa spread with spicy Mysore chutney and potato filling.", price: 14.99, originalPrice: 18.99, image: img.dosa, diet: "veg" },
      { name: "Ghee Roast", description: "Thin paper dosa roasted generously with pure ghee.", price: 13.99, image: img.dosa, diet: "veg" },
      { name: "Rava Dosa", description: "Crispy semolina dosa seasoned with cumin and spices.", price: 14.99, image: img.dosa, diet: "veg" },
    ],
  },
  {
    id: "idli-vada",
    name: "Idli & Vada",
    items: [
      { name: "Plain Idli", description: "Soft steamed rice and lentil cakes served with chutney and sambar.", price: 9.99, image: img.idli, diet: "veg" },
      { name: "Ghee Idli", description: "Fluffy idlis drizzled with aromatic ghee.", price: 11.99, image: img.idli, diet: "veg" },
      { name: "Sambar Idli", description: "Idlis soaked in flavorful South Indian sambar.", price: 11.99, image: img.idli, diet: "veg" },
      { name: "Medhu Vada", description: "Crispy lentil doughnuts with a soft center.", price: 10.99, image: img.idli, diet: "veg" },
      { name: "Idli Vada Combo", description: "Combination of idli and crispy medhu vada.", price: 11.99, image: img.idli, diet: "veg" },
    ],
  },
  {
    id: "veg-entrees",
    name: "Veg Entrees",
    items: [
      { name: "Paneer Butter Masala", description: "Paneer cubes in a rich, creamy tomato butter gravy.", price: 16.99, image: img.vegEntree, diet: "veg" },
      { name: "Paneer Tikka Masala", description: "Grilled paneer cooked in smoky tomato-onion gravy.", price: 16.99, image: img.vegEntree, diet: "veg" },
      { name: "Kadai Paneer", description: "Paneer stir-fried with peppers, onions, and spices.", price: 16.99, image: img.vegEntree, diet: "veg" },
      { name: "Dal Makhani", description: "Slow-cooked black lentils finished with butter and cream.", price: 15.99, image: img.vegEntree, diet: "veg" },
      { name: "Palak Paneer", description: "Cottage cheese simmered in creamy spinach gravy.", price: 15.99, image: img.vegEntree, diet: "veg" },
    ],
  },
  {
    id: "soups",
    name: "Soups",
    items: [
      { name: "Hot & Sour Soup (Veg/Chicken)", description: "Tangy and spicy soup loaded with vegetables or chicken.", price: 7.99, image: img.soup, diet: "both" },
      { name: "Tomato Basil Soup", description: "Creamy tomato soup infused with fresh basil.", price: 6.99, image: img.soup, diet: "veg" },
      { name: "Milagu Chicken Rasam", description: "Traditional pepper chicken soup with South Indian spices.", price: 7.99, image: img.soup, diet: "nonveg" },
      { name: "Mutton Rasam", description: "Rich pepper broth made with tender mutton.", price: 7.99, image: img.soup, diet: "nonveg" },
    ],
  },
  {
    id: "veg-appetizers",
    name: "Veg Appetizers",
    items: [
      { name: "Gobi 65", description: "Crispy cauliflower tossed in spicy South Indian seasoning.", price: 13.99, image: img.vegAppetizer, diet: "veg" },
      { name: "Gobi Manchurian", description: "Crispy cauliflower in Indo-Chinese garlic sauce.", price: 14.99, image: img.vegAppetizer, diet: "veg" },
      { name: "Veg Manchurian", description: "Vegetable dumplings tossed in savory Manchurian sauce.", price: 14.99, image: img.vegAppetizer, diet: "veg" },
      { name: "Chilli Paneer", description: "Paneer stir-fried with peppers, onions, and chili sauce.", price: 15.99, image: img.vegAppetizer, diet: "veg" },
      { name: "Babycorn Manchurian", description: "Crispy baby corn coated with Indo-Chinese flavors.", price: 14.99, image: img.vegAppetizer, diet: "veg" },
      { name: "Stuffed Mirchi Bajji", description: "Large stuffed chilies battered and fried until golden.", price: 11.99, image: img.mirchiBajji, diet: "veg" },
      { name: "Punugulu", description: "Crispy South Indian fritters served with chutney.", price: 11.99, image: img.vegAppetizer, diet: "veg" },
    ],
  },
  {
    id: "non-veg-appetizers",
    name: "Non-Veg Appetizers",
    items: [
      { name: "Chicken 65", description: "Crispy chicken bites marinated with traditional spices.", price: 16.99, image: img.chicken65, diet: "nonveg" },
      { name: "Chilli Chicken", description: "Wok-tossed chicken with green chilies and soy glaze.", price: 16.99, image: img.nonVegAppetizer, diet: "nonveg" },
    ],
  },
  {
    id: "seafood",
    name: "Seafood",
    items: [
      { name: "Shrimp Chettinad", description: "Shrimp cooked in rich Chettinad masala with roasted spices.", price: 21.99, image: img.seafood, diet: "nonveg" },
      { name: "Andhra Chepala Pulusu", description: "Traditional Andhra fish curry with tamarind and spices.", price: 19.99, image: img.seafood, diet: "nonveg" },
      { name: "Madras Fish Curry", description: "Tangy South Indian fish curry bursting with flavor.", price: 19.99, image: img.seafood, diet: "nonveg" },
      { name: "Kerala Meen Mollee", description: "Fish simmered in mild coconut milk curry.", price: 21.99, image: img.seafood, diet: "nonveg" },
      { name: "Kadai Shrimp", description: "Shrimp stir-fried with peppers, onions, and fresh spices.", price: 21.99, image: img.seafood, diet: "nonveg" },
    ],
  },
  {
    id: "indo-chinese",
    name: "Indo-Chinese",
    items: [
      { name: "Veg Fried Rice", description: "Wok-fried rice with fresh vegetables and seasonings.", price: 15.99, image: img.indoChinese, diet: "veg" },
      { name: "Chicken Fried Rice", description: "Fried rice loaded with tender chicken and vegetables.", price: 16.99, image: img.indoChinese, diet: "nonveg" },
      { name: "Egg Fried Rice", description: "Rice stir-fried with eggs and vegetables.", price: 15.99, image: img.indoChinese, diet: "nonveg" },
      { name: "Shrimp Fried Rice", description: "Flavorful fried rice with juicy shrimp.", price: 17.99, image: img.indoChinese, diet: "nonveg" },
      { name: "Schezwan Chicken Noodles/Fried Rice", description: "Spicy noodles or rice tossed with chicken in Schezwan sauce.", price: 16.99, image: img.indoChinese, diet: "nonveg" },
    ],
  },
  {
    id: "breads",
    name: "Breads",
    items: [
      { name: "Plain Naan", description: "Soft tandoor-baked Indian flatbread.", price: 4.99, image: img.bread },
      { name: "Butter Naan", description: "Fresh naan brushed with melted butter.", price: 5.99, image: img.bread },
      { name: "Garlic Naan", description: "Naan topped with garlic and herbs.", price: 5.99, image: img.bread },
      { name: "Onion Kulcha", description: "Soft bread stuffed with spiced onions.", price: 5.99, image: img.bread },
      { name: "Cheese Kulcha", description: "Tandoor bread stuffed with melted cheese.", price: 5.99, image: img.bread },
    ],
  },
  {
    id: "biryani",
    name: "Biryani",
    items: [
      { name: "Hyderabadi Chicken Dum Biryani", description: "Traditional dum-cooked chicken biryani with fragrant basmati rice.", price: 17.99, image: img.biryani, diet: "nonveg" },
      { name: "Hyderabadi Goat Dum Biryani", description: "Slow-cooked goat biryani with authentic Hyderabadi spices.", price: 21.99, image: img.goatBiryani, diet: "nonveg" },
      { name: "Veg Biryani", description: "Aromatic basmati rice cooked with fresh vegetables.", price: 16.99, image: img.biryani, diet: "veg" },
      { name: "Paneer Biryani", description: "Flavorful rice layered with marinated paneer.", price: 17.99, image: img.biryani, diet: "veg" },
      { name: "Shrimp Biryani", description: "Coastal-style biryani with succulent shrimp.", price: 21.99, image: img.biryani, diet: "nonveg" },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "Apricot Delight", description: "Signature dessert made with stewed apricots, cream, and vanilla ice cream.", price: 9.99, image: img.dessert, diet: "veg" },
      { name: "Carrot Halwa", description: "Slow-cooked carrot pudding enriched with milk and nuts.", price: 7.99, image: img.dessert, diet: "veg" },
      { name: "Mango Fruit Custard", description: "Creamy custard with fresh mangoes and seasonal fruits.", price: 7.99, image: img.dessert, diet: "veg" },
      { name: "Brownie with Ice Cream", description: "Warm chocolate brownie served with vanilla ice cream.", price: 8.99, image: img.dessert },
      { name: "Gulab Jamun", description: "Soft milk dumplings soaked in aromatic sugar syrup.", price: 6.99, image: img.dessert, diet: "veg" },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { name: "Mango Lassi", description: "Creamy yogurt drink blended with sweet Alphonso mangoes.", price: 5.99, image: img.beverage, diet: "veg" },
      { name: "Sweet/Salt Lassi", description: "Traditional chilled yogurt drink served sweet or salted.", price: 4.99, image: img.beverage, diet: "veg" },
      { name: "Fresh Lime Soda", description: "Refreshing sparkling lime drink available sweet or salted.", price: 4.99, image: img.beverage, diet: "veg" },
      { name: "Falooda Maharaja with Nuts", description: "Rich rose-flavored dessert drink topped with ice cream and nuts.", price: 8.99, image: img.beverage, diet: "veg" },
      { name: "Pistachio Milkshake", description: "Creamy milkshake blended with premium roasted pistachios.", price: 7.99, image: img.beverage, diet: "veg" },
    ],
  },
];

/** The "Most Loved" row at the top of the menu page, by dish name. */
const mostLovedNames = [
  "Masala Dosa",
  "Mysore Masala Dosa",
  "Idli Vada Combo",
  "Paneer Butter Masala",
  "Gobi Manchurian",
  "Chicken 65",
  "Shrimp Chettinad",
  "Butter Naan",
  "Hyderabadi Chicken Dum Biryani",
  "Hyderabadi Goat Dum Biryani",
];

// ---------------------------------------------------------------------------------------------
// Toast → menu sections

const toastMenu = toastMenuFile as ToastMenuFile;

const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const staticItems = new Map(staticCategories.flatMap((c) => c.items).map((item) => [normalize(item.name), item]));

/** Placeholder photo for a section, matched on its name (first match wins). */
const sectionImages: [RegExp, string][] = [
  [/dosa|uttapam/, img.dosa],
  [/idl[iy]|vada/, img.idli],
  [/soup/, img.soup],
  [/non veg/, img.nonVegAppetizer],
  [/starter|appetizer|chaat|tandoor/, img.vegAppetizer],
  [/sea ?food|fish|shrimp/, img.seafood],
  [/indo|chinese|noodle/, img.indoChinese],
  [/bread|naan|roti/, img.bread],
  [/biryani|rice|pula/, img.biryani],
  [/dessert|sweet/, img.dessert],
  [/beverage|drink|lassi/, img.beverage],
];

const MEAT = /\b(chicken|mutton|goat|lamb|fish|shrimps?|prawns?|crab|eggs?|meat|murgh?|kodi|natukodi|chepala|royyala|keema|kheema|apollo|haleem)\b/;
const VEG_DISH =
  /\b(veg|vegetables?|paneer|gobi|mushroom|aloo|dal|daal|pappu|chana|chole|babycorn|bhindi|okra|vankaya|sambar|panner|idli|idly|dosa|uttapam|vada|bonda|bajji|mirchi|samosa|punugulu|chaat|rice|annam|lassi|soda|tea|chai|coffee|halwa|jamun|rasmalai|custard|kulfi|kheer|payasam|tomato|corn|curd|jeera)\b/;

/**
 * Veg / non-veg mark for a Toast dish: Toast item tags first, then the hand-checked list above,
 * then the dish and section names. Unclear dishes stay unmarked (the marks are a guide).
 */
function dietFor(name: string, section: string, tags: string[]): Diet | undefined {
  const tagText = normalize(tags.join(" "));
  if (/\bnon veg/.test(tagText)) return "nonveg";
  if (/\b(vegetarian|vegan)\b/.test(tagText)) return "veg";
  const known = staticItems.get(normalize(name));
  if (known) return known.diet;
  const dish = normalize(name);
  const group = normalize(section);
  if (/\bveg (or )?(chicken|egg|shrimp|mutton|goat|fish)\b/.test(dish)) return "both";
  if (/^(veg|vegetable)\b/.test(dish)) return "veg"; // e.g. Veg Keema Biryani
  if (MEAT.test(dish) || /\bnon veg/.test(dish) || /\bnon veg|sea ?food|fish/.test(group)) return "nonveg";
  if (/^veg\b|dosa|uttapam|idl[iy]|vada|chaat/.test(group) || VEG_DISH.test(dish)) return "veg";
  return undefined;
}

const slug = (name: string) => normalize(name).replace(/ /g, "-") || "menu";

/**
 * Sections from Toast, merging same-named sections across menus. Catering trays have their own
 * page, and add-ons ("Extras") are left off. A menu whose groups each hold one dish (e.g. Lunch
 * Combos) becomes a single section.
 */
function toastCategories(): MenuCategory[] {
  const sections = new Map<string, MenuCategory>();
  for (const menu of toastMenu.menus) {
    if (/catering/i.test(menu.name)) continue;
    const oneDishGroups = menu.groups.length > 1 && menu.groups.every((group) => group.items.length === 1);
    const groups = oneDishGroups ? [{ name: menu.name, items: menu.groups.flatMap((group) => group.items) }] : menu.groups;
    for (const group of groups) {
      if (/catering|^extras?$/i.test(group.name.trim())) continue;
      const id = slug(group.name);
      const section = sections.get(id) ?? { id, name: group.name, items: [] };
      const fallbackImage = sectionImages.find(([pattern]) => pattern.test(normalize(group.name)))?.[1] ?? img.vegEntree;
      for (const item of group.items) {
        if (section.items.some((existing) => normalize(existing.name) === normalize(item.name))) continue;
        const known = staticItems.get(normalize(item.name));
        section.items.push({
          name: item.name,
          description: item.description || known?.description || "",
          price: item.price ?? undefined,
          image: known?.image ?? fallbackImage,
          photo: item.image ?? undefined,
          diet: dietFor(item.name, group.name, item.tags),
        });
      }
      sections.set(id, section);
    }
  }
  return [...sections.values()].filter((section) => section.items.length);
}

const fromToast = toastCategories();

/** Toast's menu once it has been synced; the list above until then. */
export const menuCategories: MenuCategory[] = fromToast.length ? fromToast : staticCategories;

const allItems = menuCategories.flatMap((c) => c.items);

/** Dishes from the "Most Loved" list that are on the current menu. */
export const mostLoved: MenuItem[] = mostLovedNames.flatMap((name) => {
  const item = allItems.find((i) => normalize(i.name) === normalize(name));
  return item ? [item] : [];
});
