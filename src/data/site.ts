// Contact details, hours and links — one place to edit them for the whole site.

export type OpeningPeriod = {
  /** 24-hour clock, "HH:MM". */
  opens: string;
  closes: string;
};

export type OpeningHours = {
  /** As shown on the site. */
  days: string;
  /** The same days as schema.org day names (used for Google's opening-hours data). */
  dayOfWeek: readonly string[];
  /** When the restaurant is open on those days, in order (lunch, then dinner); empty when closed. */
  periods: readonly OpeningPeriod[];
};

const lunch: OpeningPeriod = { opens: "11:30", closes: "15:00" };

// As confirmed by the restaurant, November 2026.
const hours: readonly OpeningHours[] = [
  { days: "Monday", dayOfWeek: ["Monday"], periods: [] },
  {
    days: "Tuesday — Saturday",
    dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    periods: [lunch, { opens: "17:00", closes: "22:00" }],
  },
  { days: "Sunday", dayOfWeek: ["Sunday"], periods: [lunch, { opens: "17:00", closes: "21:30" }] },
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
  /** Table reservations: Athidhi's booking page on Yelp. */
  reserveUrl: "https://www.yelp.com/reservations/athidhi-plainsboro",
  hours,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `Athidhi, ${address.street}, ${address.city}`,
  )}`,
  /** Athidhi's own Google listing (its reviews and rating). */
  googleReviewsUrl: "https://maps.google.com/?cid=13979431911327665623",
  /** Opens Google's "rate and review" box for Athidhi (guests must be signed in to Google). */
  googleWriteReviewUrl:
    "https://www.google.com/search?q=Athidhi+Indian+Fine+Dine+%26+Banquet+Plainsboro#lrd=0x89c3dd007938ef2f:0xc200eb41d4720dd7,3",
  /** The restaurant on Google Maps (used in Google's restaurant data). */
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Athidhi, ${address.street}, ${address.city}`)}`,
  social: {
    instagram: "https://www.instagram.com/athidhinj/",
    facebook: "https://www.facebook.com/profile.php?id=61583672301199",
    youtube: "https://www.youtube.com/@athidhinj",
    whatsappCommunity: "https://chat.whatsapp.com/IcHqylEyqdx14r0LewigHb",
  },
} as const;

/** "22:00" → "10:00 PM" */
export function formatTime(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

/** "5:00 PM — 10:00 PM" */
export function periodLabel(period: OpeningPeriod): string {
  return `${formatTime(period.opens)} — ${formatTime(period.closes)}`;
}

/** One line per opening period ("11:30 AM — 3:00 PM", "5:00 PM — 10:00 PM"), or "Closed". */
export function hoursLines(row: OpeningHours): string[] {
  return row.periods.length ? row.periods.map(periodLabel) : ["Closed"];
}

export const whatsappChatUrl = `https://wa.me/${site.whatsapp}`;
