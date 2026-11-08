// Contact details, hours and links — one place to edit them for the whole site.

export const site = {
  name: "Athidhi",
  motto: "Athidhi Devo Bhava",
  description:
    "A sanctuary of Indian heritage cuisine, where every guest is welcomed as a form of the divine.",
  address: {
    street: "660 Plainsboro Rd",
    city: "Plainsboro Township, NJ 08536",
  },
  phone: "+1 609-721-8960",
  phoneHref: "tel:+16097218960",
  /** Banquet and catering requests are sent to this WhatsApp number (digits only). */
  whatsapp: "16097218960",
  email: "athidhinj@gmail.com",
  hours: [
    { days: "Monday — Thursday", time: "11:30 AM — 10:00 PM" },
    { days: "Friday — Saturday", time: "11:30 AM — 11:00 PM" },
    { days: "Sunday", time: "12:00 PM — 10:00 PM" },
  ],
  social: {
    instagram: "https://www.instagram.com/athidhinj/",
    facebook: "https://www.facebook.com/profile.php?id=61583672301199",
    youtube: "https://www.youtube.com/@athidhinj",
    whatsappCommunity: "https://chat.whatsapp.com/IcHqylEyqdx14r0LewigHb",
  },
} as const;
