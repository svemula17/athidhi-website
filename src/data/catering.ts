// Banquet & catering menu, typed out from the restaurant's printed menu card
// ("Athidhi Banquet-Catering Menu.pdf" / catering-menu-1..3.png), November 2026.
// When the menu changes, update this file and the PDF together.

export type CateringDish = {
  name: string;
  /** The ways it comes, e.g. "Paneer or Gobi". */
  options?: string;
};

export type CateringSection = {
  id: string;
  title: string;
  /** Dishes in the small groups they're printed in. */
  groups: CateringDish[][];
};

const dishes = (...names: string[]): CateringDish[] => names.map((name) => ({ name }));

export const cateringMenu: CateringSection[] = [
  {
    id: "veg-appetizers",
    title: "Veg Appetizers",
    groups: [
      [
        { name: "65", options: "Paneer or Gobi" },
        { name: "555", options: "Paneer or Gobi" },
        { name: "Chilli", options: "Paneer, Babycorn or Gobi" },
        { name: "Karivepaku", options: "Gobi or Paneer" },
        { name: "Manchurian", options: "Veg, Gobi or Babycorn" },
      ],
      dishes(
        "Vegetable Samosa",
        "Onion Samosa",
        "Bezawada Navrang Samosa",
        "Vegetable Lollipops",
        "Sabudhana Vada",
        "Vegetable Pakora Mixed",
        "Stuffed Mirchi",
        "Cut Mirchi",
        "Veg Spring Rolls",
        "Podi Gobi Fry",
        "Onion Pakora",
        "Veg Cutlet",
      ),
    ],
  },
  {
    id: "non-veg-appetizers",
    title: "Non Veg Appetizers",
    groups: [
      dishes(
        "Chicken 65",
        "Chicken 555",
        "Chicken Pakora",
        "Pepper Chicken",
        "Chicken Lollipop",
        "Kodi Vepudu",
        "Natukodi Vepudu",
        "Karivepaku Chicken",
        "Karivepaku Chicken Fry",
        "Desi Chicken Wings",
        "Cilantro Chicken",
        "Chilli Chicken (Chinese style)",
        "Chilli Egg",
      ),
      dishes("Goat Ghee Roast", "Cashew Mutton Roast", "Goat Pepper Fry"),
      dishes("Amritsari Fish", "Apollo Fish", "Chilli Fish", "Shrimp 555"),
    ],
  },
  {
    id: "tandoor",
    title: "Tandoor",
    groups: [
      [
        ...dishes("Paneer Tikka", "Chicken Tikka", "Hariyali Kabab", "Murgh Malai Kabab"),
        { name: "Sheekh Kabab", options: "Chicken or Lamb" },
      ],
    ],
  },
  {
    id: "south-indian",
    title: "South Indian",
    groups: [
      [{ name: "Idly", options: "Plain, Guntur, Ghee, Masala" }],
      dishes(
        "Punugulu",
        "Medhu Vada",
        "Masala Vada",
        "Mysore Bonda",
        "Potato Bajji",
        "Chitti Garelu",
        "Peanut Masala",
        "Plantain, Banana, Aritikaya (Bajji)",
      ),
    ],
  },
  {
    id: "chaats",
    title: "Chaats",
    groups: [dishes("Samosa Chaat", "Aloo Tikki Chaat", "Spinach Chaat", "Aloo Papri Chaat", "Pani Puri")],
  },
  {
    id: "veg-entrees",
    title: "Veg Entrees",
    groups: [
      [
        { name: "Pappu", options: "Mango, Tomato, Spinach, Gongura" },
        { name: "Dal", options: "Tarka, Makhni" },
      ],
      dishes(
        "Aloo Gobi",
        "Mixed Veg Kadai",
        "Veg Jalfrazi",
        "Aleppy Veg Curry",
        "Veg Korma",
        "Bhindi Masala",
        "Punjabi Chole",
        "Masala Mushroom",
        "Cashew Curry Gutti Vankaya",
        "Veg Malai Kofta",
        "Chilli Paneer Curry",
        "Nawabhi Shahi Paneer",
        "Chilli Paneer",
        "Kaju Paneer",
        "Kadai Paneer",
        "Paneer Tikka Masala",
        "Paneer Makhni",
        "Palak Paneer",
        "Ulavacharu with Cream",
      ),
    ],
  },
  {
    id: "non-veg-entrees",
    title: "Non Veg Entrees",
    groups: [
      dishes(
        "Gongura Chicken",
        "Palak Chicken",
        "Chicken Vindaloo",
        "Chicken Tikka Masala",
        "Chicken Shahi Korma",
        "Butter Chicken",
        "Chicken Chettinad",
        "Kadai Chicken",
        "Hyderabad Dum ka Murg",
        "Ginger Chicken",
        "Goan Chicken Vindaloo",
        "Andhra Chicken Iguru (Bone In)",
      ),
      dishes(
        "Telangana Mutton Curry (Bone In)",
        "Gongura Goat Curry",
        "Goat Rogan Josh",
        "Goat Saag",
        "Goan Goat Vindaloo",
        "Goat Chettinad",
      ),
      dishes("Andhra Chepala Pulusu", "Kerala Meen Moilee"),
    ],
  },
  {
    id: "veg-rice",
    title: "Veg Rice",
    groups: [
      dishes("Yellow Rice", "Pudhina Rice", "Gongura Rice", "Sambar Rice", "Curd Rice", "Mudha Pappu Avakai"),
      dishes(
        "Veg Biryani / Pulav",
        "Paneer Biryani / Pulav",
        "Ulavacharu Biryani / Pulav",
        "Guthivankaya Biryani / Pulav",
        "Veg Keema Biryani / Pulav",
        "Cut Mirchi Biryani / Pulav",
      ),
      dishes("Gongura Paneer Pulav", "Pachi Mirchi Paneer Ghee Roast Pulav", "Avakai Biryani", "Ulavacharu Paneer Biryani"),
    ],
  },
  {
    id: "non-veg-rice",
    title: "Non Veg Rice",
    groups: [
      [
        { name: "Dum Biryani", options: "Chicken or Goat" },
        { name: "Ulavacharu Biryani", options: "Chicken or Shrimp" },
      ],
      dishes("Fry Piece Biryani", "Vijaywada Chicken Biryani", "Thalappakatti Biryani"),
      dishes(
        "Natukodi Pulav",
        "Mutton Pulav",
        "Shrimp Pulav",
        "Green Mirchi Chicken Pulav",
        "Pachi Mirchi Chicken Ghee Roast Pulav",
      ),
    ],
  },
  {
    id: "breads",
    title: "Breads",
    groups: [dishes("Butter Naan", "Garlic Naan", "Tandoori Roti", "Lacha Paratha", "Malabar Paratha", "Bullet Naan")],
  },
  {
    id: "indo-chinese",
    title: "Indo Chinese",
    groups: [
      [
        { name: "Noodles", options: "Veg, Egg, Chicken or Shrimp" },
        { name: "Fried Rice", options: "Veg, Egg, Chicken or Shrimp" },
        { name: "Schezwan Noodles", options: "Veg, Egg, Chicken or Shrimp" },
        { name: "Schezwan Fried Rice", options: "Veg, Egg, Chicken or Shrimp" },
      ],
    ],
  },
  {
    id: "global",
    title: "Global",
    groups: [dishes("Baked Ziti", "Mac & Cheese", "French Fries", "Chicken Fingers")],
  },
  {
    id: "desserts",
    title: "Desserts",
    groups: [
      dishes(
        "Carrot Halwa",
        "Mango Fruit Custard",
        "Brownie with Ice Cream",
        "Gulab Jamun",
        "Rasmalai",
        "Shahi Thukda",
        "Junnu",
        "Jalebi",
        "Sweet Paan",
        "Apricot Delight",
      ),
    ],
  },
  {
    id: "beverages",
    title: "Beverages",
    groups: [dishes("Sweet Lassi", "Salty Lassi", "Goli Soda", "Masala Tea", "Madras Coffee", "Fresh Lime Soda", "Coke Products")],
  },
];
