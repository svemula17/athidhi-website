import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import Mandala from "@/components/Mandala";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import SplitSection from "@/components/SplitSection";
import { ArrowRight, Eyebrow, Icon, OrderButton, button } from "@/components/ui";
import { hoursLabel, site, whatsappChatUrl } from "@/data/site";
import { asset, publicFile } from "@/lib/assets";
import { absoluteAssetUrl, absoluteUrl, homeDescription, homeTitle, pageMetadata, pageUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: homeTitle, description: homeDescription, path: "/" });

// What Google shows for the restaurant: address, phone, hours, menu (schema.org Restaurant).
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": absoluteUrl("/#restaurant"),
  name: site.name,
  alternateName: "Athidhi Indian Restaurant",
  description: homeDescription,
  slogan: site.motto,
  url: absoluteUrl("/"),
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  image: [
    absoluteAssetUrl(asset("/assets/Hero-u8a6ujtO.jpg")),
    absoluteAssetUrl(asset("/assets/dining-room-wall-art.jpg")),
    absoluteAssetUrl(asset("/assets/banquet-hall-stage.jpg")),
  ],
  logo: absoluteAssetUrl(asset("/assets/logo-BgkjBRVm.png")),
  servesCuisine: ["Indian", "South Indian", "North Indian", "Hyderabadi", "Indo-Chinese"],
  priceRange: "$$",
  menu: pageUrl("/menu"),
  // The full menu with dishes and prices is on the menu page (src/app/menu/page.tsx).
  hasMenu: { "@id": `${pageUrl("/menu")}#menu` },
  acceptsReservations: true,
  hasMap: site.mapUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: site.hours.map((row) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: row.dayOfWeek,
    opens: row.opens,
    closes: row.closes,
  })),
  sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
  ...(site.orderOnlineUrl
    ? {
        potentialAction: {
          "@type": "OrderAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: site.orderOnlineUrl,
            actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
          },
        },
      }
    : {}),
};

// The first slide loads first (it's the page's main image); venue and food alternate.
const heroSlides = [
  "/assets/hero-dining-room.jpg",
  "/assets/Hero-u8a6ujtO.jpg",
  "/assets/hero-banquet-hall.jpg",
  "/assets/Panner%20Tikka-CxhZEie8.JPG",
].map((path) => asset(path));

const gallery = [
  { src: "/assets/AthidhiIndianFineDineRestaurant_PunjabiHariyaliKabab-sl2f_csU.jpg", alt: "Punjabi hariyali kabab" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_HyderabadiGoatDumBiryani-COewIYqx.jpg", alt: "Hyderabadi goat dum biryani" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_Dosa-CX4LpkSf.jpg", alt: "Masala dosa" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_CashewMuttonRoast-C-zGc1EQ.jpg", alt: "Cashew mutton roast" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_StuffedMirchiBajji-BJJUWRy1.jpg", alt: "Stuffed mirchi bajji" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_VegManchurianNoodles-DsvsL3LU.jpg", alt: "Veg manchurian noodles" },
];

const banquetPhotos: { src: string; label: string; position?: string }[] = [
  { src: "/assets/banquet-hall-wide.jpg", label: "The Banquet Hall" },
  { src: "/assets/event-milestone-birthday.jpg", label: "Event Décor", position: "object-[26%_50%]" },
];

const heroWord = "ATHIDHI";

// Narrower buttons so the three Visit actions fit on one line.
const compact = (classes: string) => classes.replace("px-8", "px-6");

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Hero — pulled up under the sticky header so the photo fills the screen behind it */}
      <section className="relative isolate -mt-20 flex min-h-svh items-center justify-center overflow-hidden bg-ink md:-mt-28">
        <HeroSlideshow images={heroSlides} />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink/80 via-ink/50 to-ink/75" />
        <div className="relative z-10 px-4 pb-24 pt-36 text-center md:pt-44">
          <Eyebrow center animate tone="gold">
            Indian Fine Dining<span className="hidden sm:inline"> · Plainsboro, NJ</span>
          </Eyebrow>
          {/* Each letter rises into place in turn; the heading itself is read as one word. */}
          <h1
            aria-label="Athidhi"
            className="mt-6 font-serif text-7xl leading-none tracking-[-0.025em] text-cream [perspective:800px] sm:text-8xl lg:text-[9rem]"
          >
            {[...heroWord].map((letter, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="inline-block motion-safe:animate-letter"
                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p
            className="mt-6 font-serif text-2xl italic text-gold-light motion-safe:animate-rise md:text-3xl"
            style={{ animationDelay: "0.95s" }}
          >
            An Experience Beyond Dining
          </p>
          <p className="mt-4 text-lg text-cream/70 motion-safe:animate-rise" style={{ animationDelay: "1.15s" }}>
            Where every meal turns into a memorable moment.
          </p>
          <div
            className="mt-10 flex flex-col items-center justify-center gap-4 motion-safe:animate-rise sm:flex-row"
            style={{ animationDelay: "1.35s" }}
          >
            <Link href="/menu" className={button.maroon}>
              View Menu
            </Link>
            <OrderButton className={button.goldOutline} />
          </div>
        </div>
      </section>

      {/* Every section below the hero uses the same split layout (SplitSection), alternating photo sides. */}

      <SplitSection
        tone="cream"
        imageSide="right"
        image={{ src: asset("/assets/Hero-u8a6ujtO.jpg"), alt: "A spread of Athidhi's signature dishes" }}
        eyebrow="Our Story"
        title={
          <>
            The Guest is <em className="text-gold-deep">Divine</em>
          </>
        }
        actions={
          <Link href="/about" className={button.maroon}>
            Read Our Story <ArrowRight />
          </Link>
        }
      >
        <p>
          In the ancient Sanskrit teachings of the Taittiriya Upanishad, a single verse became the foundation of Indian
          hospitality: <strong className="font-serif font-normal italic text-maroon">Athidhi Devo Bhava</strong>. It
          proclaims that every guest who crosses our threshold should be treated with the same reverence given to the
          divine.
        </p>
      </SplitSection>

      <SplitSection
        tone="ink"
        imageSide="left"
        image={{ src: publicFile("/images/catering-buffet.jpg"), alt: "Chef serving at a catering buffet" }}
        eyebrow="Weddings & Events"
        title={
          <>
            Catering for
            <br />
            Every Occasion.
          </>
        }
        decoration={<Mandala className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] text-gold/10" />}
        actions={
          <Link href="/catering" className={`${button.gold} shadow-lg shadow-gold/20`}>
            Request Catering <ArrowRight />
          </Link>
        }
      >
        <p>
          From lavish weddings to corporate events, we bring the authentic taste of Athidhi straight to your guests, served
          with the identical perfection of dining in.
        </p>
      </SplitSection>

      <SplitSection
        tone="sand"
        imageSide="right"
        image={{ src: asset("/assets/banquet-hall-table.jpg"), alt: "Athidhi's banquet hall set for a celebration" }}
        imageClassName="motion-safe:animate-kenburns"
        eyebrow="Host Your"
        title="Grand Celebrations"
        actions={
          <>
            <Link href="/banquet#request" className={button.gold}>
              Request a Banquet <ArrowRight />
            </Link>
            <Link href="/banquet" className={button.maroonOutline}>
              See the Banquet Hall
            </Link>
          </>
        }
        footer={
          <div className="grid max-w-sm grid-cols-2 gap-4">
            {banquetPhotos.map((photo) => (
              <Link
                key={photo.src}
                href="/banquet"
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-ink/15 ring-1 ring-maroon/10 transition hover:-translate-y-0.5 hover:ring-gold"
              >
                <Image
                  src={asset(photo.src)}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 192px, 45vw"
                  className={`object-cover transition duration-500 group-hover:scale-105 ${photo.position ?? ""}`}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-ink/85 to-transparent px-3 pb-2 pt-8 text-xs font-medium text-cream sm:text-sm">
                  {photo.label}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gold" />
                </span>
              </Link>
            ))}
          </div>
        }
      >
        <p>
          Whether you are planning an intimate birthday party, a romantic anniversary, a magnificent wedding reception, or
          corporate events, Athidhi provides the ultimate setting for memorable festivities.
        </p>
      </SplitSection>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-24 bg-ink py-24 md:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal stagger className="text-center">
            <Eyebrow center tone="gold">A Feast for the Eyes</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl tracking-tight text-white md:text-5xl lg:text-6xl">
              From the Tandoor and Skillet.
            </h2>
          </Reveal>
          {/* Tiles ripple in one after another */}
          <Reveal stagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3">
            {gallery.map((photo) => (
              <div key={photo.src} className="group relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src={asset(photo.src)}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <SplitSection
        tone="sand"
        imageSide="left"
        image={{ src: asset("/assets/dining-room-chandelier.jpg"), alt: "Crystal chandelier, fountain and lit wall art in the Athidhi dining room" }}
        // A tall photo: keep the chandelier, fountain and wall art in the crop.
        imageClassName="object-[50%_30%]"
        eyebrow="Ambience"
        title="The Dining Room"
      >
        <p>
          Step into a sanctuary echoing ancient Indian palaces. Warm lighting, private enclaves, and an ambiance that
          perfectly complements your dining experience. A place purposely built for celebration.
        </p>
      </SplitSection>

      <Reviews />

      <SplitSection
        id="visit"
        tone="cream"
        imageSide="right"
        image={{ src: asset("/assets/Athidi-ClHi8Gav.png"), alt: "Visit Athidhi" }}
        eyebrow="Plainsboro, NJ"
        title="Visit Athidhi"
        actions={
          <>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className={compact(button.maroon)}>
              <Icon name="mapPin" className="h-4 w-4" />
              Get Directions
            </a>
            <a href={site.phoneHref} className={compact(button.maroonOutline)}>
              <Icon name="phone" className="h-4 w-4" />
              Call to Book
            </a>
            <a href={whatsappChatUrl} target="_blank" rel="noopener noreferrer" className={compact(button.maroonOutline)}>
              <Icon name="chat" className="h-4 w-4" />
              WhatsApp
            </a>
          </>
        }
      >
        <div className="space-y-8 font-normal text-ink">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">Location</h3>
            <p className="mt-3 text-lg">
              {site.address.street}
              <br />
              {site.address.city}
            </p>
            <p className="mt-2 text-ink/70">Minutes from Princeton, West Windsor and Cranbury.</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">Reservations &amp; Info</h3>
            <p className="mt-3 text-lg">
              <a href={site.phoneHref} className="transition hover:text-maroon">
                {site.phone}
              </a>
            </p>
            <p className="mt-1 text-lg">
              <a href={`mailto:${site.email}`} className="transition hover:text-maroon">
                {site.email}
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">Service Hours</h3>
            <dl className="mt-3">
              {site.hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-6 border-b border-maroon/10 py-3">
                  <dt className="font-light text-ink/60">{row.days}</dt>
                  <dd className="font-semibold text-maroon">{hoursLabel(row)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SplitSection>
    </>
  );
}
