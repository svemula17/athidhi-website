import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import HeroSlideshow from "@/components/HeroSlideshow";
import Mandala from "@/components/Mandala";
import Reveal from "@/components/Reveal";
import SplitSection from "@/components/SplitSection";
import { ArrowRight, Eyebrow, button } from "@/components/ui";
import { site } from "@/data/site";
import { asset } from "@/lib/assets";

const heroSlides = [
  "/assets/IAML3711-CiZrVyWb.JPG",
  "/assets/Panner%20Tikka-CxhZEie8.JPG",
  "/assets/Hero-u8a6ujtO.jpg",
].map((path) => asset(path));

const gallery = [
  { src: "/assets/Hero-u8a6ujtO.jpg", alt: "Heritage fine dining dish" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_HyderabadiGoatDumBiryani-COewIYqx.jpg", alt: "Hyderabadi goat dum biryani" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_Dosa-CX4LpkSf.jpg", alt: "Masala dosa" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_CashewMuttonRoast-C-zGc1EQ.jpg", alt: "Cashew mutton roast" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_StuffedMirchiBajji-BJJUWRy1.jpg", alt: "Stuffed mirchi bajji" },
  { src: "/assets/AthidhiIndianFineDineRestaurant_VegManchurianNoodles-DsvsL3LU.jpg", alt: "Veg manchurian noodles" },
];

const banquetPhotos = [
  { src: "/assets/20260606_141209-jnSBWv0D.jpg", label: "The Banquet Hall" },
  { src: "/assets/hero-4hOicPhT.jpg", label: "Event Décor" },
];

// Hero headline: two lines, the second in gold. Words rise in one after another.
const heroLines = [
  { words: ["An", "Experience"], color: "text-cream" },
  { words: ["Beyond", "Dining."], color: "text-gold-light" },
];

// Quick facts under the hero's divider.
const heroHighlights = [
  { title: "Plainsboro, NJ", text: "660 Plainsboro Rd", href: "/#visit" },
  { title: "Open Daily", text: "Lunch & dinner", href: "/#visit" },
  { title: "Banquets & Catering", text: "For every occasion", href: "/banquet" },
  { title: "Explore Athidhi", href: "/about" },
];

const outlineMaroon =
  "inline-flex items-center justify-center gap-2 rounded-full border border-maroon/40 px-8 py-3.5 font-semibold tracking-wide text-maroon transition hover:bg-maroon hover:text-cream";

export default function Home() {
  return (
    <>
      {/* Hero — pulled up under the sticky header so the photo fills the screen behind it */}
      <section className="relative isolate -mt-20 flex min-h-svh items-center justify-center overflow-hidden bg-ink md:-mt-28">
        <HeroSlideshow images={heroSlides} />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink/85 via-ink/60 to-ink/85" />
        <div className="relative z-10 w-full max-w-5xl px-4 pb-16 pt-36 text-center md:pt-44">
          <p
            className="text-xs font-semibold uppercase tracking-[0.4em] text-gold motion-safe:animate-rise sm:text-sm"
            style={{ animationDelay: "0.1s" }}
          >
            Athidhi Devo Bhava
          </p>
          <h1 className="mt-8 font-sans text-4xl font-extrabold uppercase leading-[0.95] tracking-tight [perspective:800px] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {heroLines.map((line, li) => (
              <span key={li} className={`block ${line.color}`}>
                {line.words.map((word, wi) => (
                  <Fragment key={word}>
                    {wi > 0 && " "}
                    <span
                      className="inline-block motion-safe:animate-letter"
                      style={{ animationDelay: `${0.25 + (li * 2 + wi) * 0.12}s` }}
                    >
                      {word}
                    </span>
                  </Fragment>
                ))}
              </span>
            ))}
          </h1>
          <p
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/80 motion-safe:animate-rise sm:text-lg"
            style={{ animationDelay: "0.85s" }}
          >
            Heritage recipes from Hyderabad, Chettinad and Old Delhi — where every meal turns into a memorable moment.
          </p>
          <div className="mt-10 motion-safe:animate-rise" style={{ animationDelay: "1s" }}>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-10 py-4 font-semibold tracking-wide text-cream shadow-lg shadow-ink/40 transition hover:bg-maroon/90"
            >
              Order Online
            </Link>
          </div>
          <ul
            className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 border-t border-white/15 pt-8 motion-safe:animate-rise sm:grid-cols-4"
            style={{ animationDelay: "1.15s" }}
          >
            {heroHighlights.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="group inline-block">
                  <span
                    className={`block text-[15px] font-semibold text-cream transition group-hover:text-gold ${
                      item.text ? "" : "underline decoration-gold decoration-2 underline-offset-[6px]"
                    }`}
                  >
                    {item.title}
                  </span>
                  {item.text && <span className="mt-1 block text-sm text-cream/60">{item.text}</span>}
                </Link>
              </li>
            ))}
          </ul>
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
            The Guest is <em className="text-gold">Divine</em>
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
        image={{ src: "/images/catering-buffet.jpg", alt: "Chef serving at a catering buffet" }}
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
        image={{ src: asset("/assets/20260613_172248-FPsryS_P.jpg"), alt: "Athidhi's banquet hall dressed for a celebration" }}
        imageClassName="motion-safe:animate-kenburns"
        eyebrow="Host Your"
        title="Grand Celebrations"
        actions={
          <>
            <Link href="/banquet#request" className={button.gold}>
              Request a Banquet <ArrowRight />
            </Link>
            <Link href="/banquet" className={outlineMaroon}>
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
                  className="object-cover transition duration-500 group-hover:scale-105"
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
            <Eyebrow center>A Feast for the Eyes</Eyebrow>
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
        image={{ src: asset("/assets/IAML3728-IDPyBwOE.JPG"), alt: "The Dining Room" }}
        eyebrow="Ambience"
        title="The Dining Room"
      >
        <p>
          Step into a sanctuary echoing ancient Indian palaces. Warm lighting, private enclaves, and an ambiance that
          perfectly complements your dining experience. A place purposely built for celebration.
        </p>
      </SplitSection>

      <SplitSection
        id="visit"
        tone="cream"
        imageSide="right"
        image={{ src: asset("/assets/Athidi-ClHi8Gav.png"), alt: "Visit Athidhi" }}
        eyebrow="Plainsboro, NJ"
        title="Visit Athidhi"
      >
        <div className="space-y-8 font-normal text-ink">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Location</h3>
            <p className="mt-3 text-lg">
              {site.address.street}
              <br />
              {site.address.city}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Reservations &amp; Info</h3>
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
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Service Hours</h3>
            <dl className="mt-3">
              {site.hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-6 border-b border-maroon/10 py-3">
                  <dt className="font-light text-ink/60">{row.days}</dt>
                  <dd className="font-semibold text-maroon">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SplitSection>
    </>
  );
}
