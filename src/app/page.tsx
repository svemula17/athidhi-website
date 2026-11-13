import Image from "next/image";
import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import Mandala from "@/components/Mandala";
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

const heroWord = "ATHIDHI";

const headingXL = "font-serif text-4xl leading-[1.05] tracking-tight text-maroon md:text-6xl";
const bodyText = "text-[17px] font-light leading-relaxed text-ink/70";

export default function Home() {
  return (
    <>
      {/* Hero — pulled up under the sticky header so the photo fills the screen behind it */}
      <section className="relative isolate -mt-20 flex min-h-svh items-center justify-center overflow-hidden bg-ink md:-mt-28">
        <HeroSlideshow images={heroSlides} />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink/80 via-ink/50 to-ink/75" />
        <div className="relative z-10 px-4 pb-24 pt-36 text-center md:pt-44">
          <Eyebrow center animate>
            Established with Reverence
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
            <Link href="/menu" className={button.goldOutline}>
              Order Online
            </Link>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className={`mt-5 ${headingXL}`}>
              The Guest is <em className="text-gold">Divine</em>
            </h2>
            <p className={`mt-6 max-w-md ${bodyText}`}>
              In the ancient Sanskrit teachings of the Taittiriya Upanishad, a single verse became the foundation of Indian
              hospitality: <strong className="font-serif font-normal italic text-maroon">Athidhi Devo Bhava</strong>. It
              proclaims that every guest who crosses our threshold should be treated with the same reverence given to the
              divine.
            </p>
            <Link href="/about" className={`${button.maroon} mt-10`}>
              Read Our Story <ArrowRight />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-ink/10">
            <Image
              src={asset("/assets/Hero-u8a6ujtO.jpg")}
              alt="A spread of Athidhi's signature dishes"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Catering */}
      <section className="grid md:grid-cols-2">
        <div className="relative flex flex-col justify-center overflow-hidden bg-ink px-6 py-20 sm:px-12 lg:px-20">
          <Mandala className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] text-gold/10" />
          <h2 className="relative font-serif text-4xl leading-tight text-gold md:text-5xl">
            Catering for
            <br />
            Every Occasion.
          </h2>
          <p className="relative mt-6 max-w-md text-lg font-light leading-relaxed text-white/60">
            From lavish weddings to corporate events, we bring the authentic taste of Athidhi straight to your guests,
            served with the identical perfection of dining in.
          </p>
          <Link href="/catering" className={`${button.gold} relative mt-10 self-start shadow-lg shadow-gold/20`}>
            Request Catering <ArrowRight />
          </Link>
        </div>
        <div className="relative min-h-[360px]">
          {/* Self-hosted in /public (not on the old site). */}
          <Image src="/images/catering-buffet.jpg" alt="Chef serving at a catering buffet" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Banquet — a framed panel (set apart from catering) on a photo of the hall dressed for a party */}
      <section className="bg-cream px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink shadow-2xl shadow-ink/20">
          <Image
            src={asset("/assets/20260613_172248-FPsryS_P.jpg")}
            alt="Athidhi's banquet hall dressed for a celebration"
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover motion-safe:animate-kenburns"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/60 to-ink/30" />
          <div className="relative grid min-h-[560px] items-center gap-10 px-6 py-14 sm:px-10 md:min-h-[640px] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:px-14">
            <div className="max-w-xl">
              <Eyebrow>Host Your</Eyebrow>
              <h2 className="mt-5 font-serif text-5xl leading-[1.05] text-cream md:text-6xl">Grand Celebrations</h2>
              <p className="mt-6 text-lg font-light leading-relaxed text-cream/80">
                Whether you are planning an intimate birthday party, a romantic anniversary, a magnificent wedding
                reception, or corporate events, Athidhi provides the ultimate setting for memorable festivities.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/banquet#request" className={button.gold}>
                  Request a Banquet <ArrowRight />
                </Link>
                <Link
                  href="/banquet"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/60 px-8 py-3.5 font-semibold tracking-wide text-cream transition hover:bg-cream hover:text-ink"
                >
                  See the Banquet Hall
                </Link>
              </div>
            </div>
            {/* Photo cards that open the banquet page: a row on phones, a neat stack on wide screens */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-1 lg:gap-6">
              {banquetPhotos.map((photo) => (
                <Link
                  key={photo.src}
                  href="/banquet"
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/25 shadow-2xl shadow-ink/60 transition hover:-translate-y-1 hover:border-gold lg:w-64 xl:w-72"
                >
                  <Image
                    src={asset(photo.src)}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 288px, (min-width: 1024px) 256px, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-ink/90 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-cream">
                    {photo.label}
                    <ArrowRight className="h-3.5 w-3.5 text-gold transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured offerings */}
      <section className="relative overflow-hidden bg-sand">
        <Mandala className="pointer-events-none absolute -left-28 top-1/2 h-[420px] w-[420px] -translate-y-1/2 text-gold/20" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-20 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl tracking-wide text-maroon md:text-5xl">Featured Offerings</h2>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-maroon/40 px-6 py-3 text-sm font-semibold tracking-wide text-maroon transition hover:bg-maroon hover:text-cream"
          >
            View menu <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="grid bg-cream md:grid-cols-2">
        <div className="relative min-h-[320px] md:min-h-[560px]">
          <Image
            src={asset("/assets/AthidhiIndianFineDineRestaurant_PunjabiHariyaliKabab-sl2f_csU.jpg")}
            alt="The Kabab"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
          <Eyebrow>The Kabab</Eyebrow>
          <h2 className={`mt-5 ${headingXL}`}>
            Mastered by Fire.
            <br />
            Reserved for You.
          </h2>
          <p className={`mt-6 max-w-md ${bodyText}`}>
            Hand-ground spices marinated overnight. Cooked flawlessly inside traditional tandoor clay creating a smokey,
            melt-in-your-mouth perfection unlike anything else.
          </p>
          <Link href="/menu" className={`${button.maroon} mt-10 self-start`}>
            View the Menu <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="grid bg-cream md:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 md:order-1 lg:px-20">
          <Eyebrow>The Butter Chicken</Eyebrow>
          <h2 className={`mt-5 ${headingXL}`}>
            Rich, Velvety,
            <br />
            Unforgettable.
          </h2>
          <p className={`mt-6 max-w-md ${bodyText}`}>
            Simmered in a luxuriously slow-cooked tomato reduction enriched with pure Kashmiri saffron, organic cashews,
            and golden butter.
          </p>
          <Link href="/menu" className={`${button.gold} mt-10 self-start`}>
            Order Now <ArrowRight />
          </Link>
        </div>
        <div className="relative order-1 min-h-[320px] md:order-2 md:min-h-[560px]">
          <Image
            src={asset("/assets/AthidhiIndianFineDineRestaurant_ChickenTikkaMasala-Dtm2br8I.jpg")}
            alt="The Butter Chicken"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-24 bg-ink py-24 md:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl tracking-wide text-white md:text-[3.4rem]">From the Tandoor and Skillet.</h2>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">A Feast for the Eyes</p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3">
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
          </div>
        </div>
      </section>

      {/* Dining room */}
      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className={headingXL}>The Dining Room</h2>
            <p className={`mt-6 max-w-lg text-lg ${bodyText}`}>
              Step into a sanctuary echoing ancient Indian palaces. Warm lighting, private enclaves, and an ambiance that
              perfectly complements your dining experience. A place purposely built for celebration.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-ink/10">
            <Image
              src={asset("/assets/IAML3728-IDPyBwOE.JPG")}
              alt="The Dining Room"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="scroll-mt-24 bg-cream py-24 md:scroll-mt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand shadow-xl shadow-ink/10 sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image src={asset("/assets/Athidi-ClHi8Gav.png")} alt="Visit Athidhi" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 className={headingXL}>Visit Athidhi</h2>
            <div className="mt-10 space-y-10">
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
                <dl className="mt-3 max-w-md">
                  {site.hours.map((row) => (
                    <div key={row.days} className="flex justify-between gap-6 border-b border-maroon/10 py-3">
                      <dt className="font-light text-ink/60">{row.days}</dt>
                      <dd className="font-semibold text-maroon">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
