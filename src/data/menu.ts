// Menu copied from the live site (athidi.vercel.app/menu), November 2026.
// Edit dishes and prices here; the menu page and the "Most Loved" row read from this file.

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  /** Struck-through "was" price, shown when a dish is on offer. */
  originalPrice?: number;
  /** Path on the asset host, e.g. "/assets/biryani-DciHh55y.png". */
  image: string;
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

export const menuCategories: MenuCategory[] = [
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

const allItems = menuCategories.flatMap((c) => c.items);

export const mostLoved: MenuItem[] = mostLovedNames.map((name) => {
  const item = allItems.find((i) => i.name === name);
  if (!item) throw new Error(`"Most Loved" dish is missing from the menu: ${name}`);
  return item;
});
