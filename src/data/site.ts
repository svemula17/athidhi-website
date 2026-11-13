// Contact details, hours and links — one place to edit them for the whole site.

export type OpeningHours = {
  /** As shown on the site. */
  days: string;
  /** The same days as schema.org day names (used for Google's opening-hours data). */
  dayOfWeek: readonly string[];
  /** 24-hour clock, "HH:MM". */
  opens: string;
  closes: string;
};

const hours: readonly OpeningHours[] = [
  { days: "Monday — Thursday", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:30", closes: "22:00" },
  { days: "Friday — Saturday", dayOfWeek: ["Friday", "Saturday"], opens: "11:30", closes: "23:00" },
  { days: "Sunday", dayOfWeek: ["Sunday"], opens: "12:00", closes: "22:00" },
];

const address = {
  street: "660 Plainsboro Rd",
  city: "Plainsboro Township, NJ 08536",
  locality: "Plainsboro Township",
  region: "NJ",
  postalCode: "08536",
  country: "US",
};

export const site = {
  name: "Athidhi",
  motto: "Athidhi Devo Bhava",
  description:
    "A sanctuary of Indian heritage cuisine, where every guest is welcomed as a form of the divine.",
  address,
  phone: "+1 609-721-8960",
  phoneHref: "tel:+16097218960",
  /** Banquet and catering requests are sent to this WhatsApp number (digits only). */
  whatsapp: "16097218960",
  email: "athidhinj@gmail.com",
  /**
   * Online ordering link: the restaurant's Toast online ordering (pickup and delivery).
   * If this is ever emptied, every "Order" button on the site asks guests to call instead.
   */
  orderOnlineUrl: "https://order.toasttab.com/online/athidhi-660-plainsboro-rd" as string,
  hours,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `Athidhi, ${address.street}, ${address.city}`,
  )}`,
  social: {
    instagram: "https://www.instagram.com/athidhinj/",
    facebook: "https://www.facebook.com/profile.php?id=61583672301199",
    youtube: "https://www.youtube.com/@athidhinj",
    whatsappCommunity: "https://chat.whatsapp.com/IcHqylEyqdx14r0LewigHb",
  },
} as const;

/** "22:00" → "10:00 PM" */
function formatTime(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

/** "11:30 AM — 10:00 PM" */
export function hoursLabel(row: OpeningHours): string {
  return `${formatTime(row.opens)} — ${formatTime(row.closes)}`;
}

export const whatsappChatUrl = `https://wa.me/${site.whatsapp}`;
