import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Mandala from "@/components/Mandala";
import { ArrowRight, Eyebrow, button } from "@/components/ui";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About Us — Athidhi Indian Restaurant",
  description: "The story and philosophy behind Athidhi — Athidhi Devo Bhava, the guest is divine.",
};

const pillars = [
  {
    image: "/assets/AthidhiIndianFineDineRestaurant_Dosa-CX4LpkSf.jpg",
    alt: "Masala dosa",
    label: "Heritage Kitchens",
    title: "Generational Recipes",
    text: "Recipes preserved over decades from home kitchens across Hyderabad, Chettinad, and Old Delhi.",
  },
  {
    image: "/assets/AthidhiIndianFineDineRestaurant_HyderabadiGoatDumBiryani-COewIYqx.jpg",
    alt: "Hyderabadi goat dum biryani",
    label: "Sourced at Origin",
    title: "Artisanal Spices",
    text: "Whole spices hand-picked from small-batch heritage spice merchants and freshly ground daily.",
  },
  {
    image: "/assets/IAML3728-IDPyBwOE.JPG",
    alt: "The dining room at Athidhi",
    label: "Athidhi Devo Bhava",
    title: "Royal Hospitality",
    text: "Every guest is received as a divine presence with warm, unhurried, and meticulous service.",
  },
];

const bodyText = "text-lg font-light leading-relaxed text-ink/75";

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[460px] items-center justify-center overflow-hidden bg-ink px-4 py-28 md:min-h-[560px]">
        <Image src={asset("/assets/hero-C-HBuKZ2.JPG")} alt="" fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/65" />
        <div className="relative z-10 text-center">
          <Eyebrow center>Our Heritage</Eyebrow>
          <h1 className="mt-6 font-serif text-5xl tracking-tight text-cream/90 sm:text-7xl lg:text-8xl">THE ATHIDHI STORY</h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic text-cream/75 md:text-xl">
            Embracing the soulful essence of the Asian subcontinent through revered culinary traditions.
          </p>
        </div>
      </section>

      <section className="overflow-hidden bg-cream py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>Sacred Philosophy</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl tracking-tight text-maroon md:text-6xl">
              The Guest is <em className="text-gold">Divine</em>
            </h2>
            <p className={`mt-8 ${bodyText}`}>
              In the ancient Sanskrit teachings of the Taittiriya Upanishad, a single verse became the foundation of Indian
              hospitality: <strong className="font-serif font-normal italic text-maroon">Athidhi Devo Bhava</strong>. It
              proclaims that every guest who crosses our threshold should be treated with the same reverence given to the
              divine.
            </p>
            <p className={`mt-5 ${bodyText}`}>
              At Athidhi, this philosophy isn’t just printed on our menus — it dictates every gesture, every warm welcome,
              and every aromatic dish that leaves our kitchen. We bridge traditional generational cooking with a refined,
              elevated dining atmosphere.
            </p>
            <blockquote className="mt-8 border-l-2 border-gold pl-5 font-serif text-xl italic text-maroon">
              “Where ancient heritage meets modern luxury.”
            </blockquote>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Mandala className="pointer-events-none absolute -right-20 -top-20 h-[520px] w-[520px] text-gold/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-ink/15">
              <Image src={asset("/assets/Podi%20Idly-CPKUML0o.JPG")} alt="Podi idly" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 left-4 max-w-[230px] rounded-2xl bg-maroon p-5 text-cream shadow-xl sm:-left-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Authentic Flavour</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">Slow-cooked using daily-ground heritage spices.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Eyebrow center>Our Culinary Foundation</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl tracking-tight text-maroon md:text-5xl">The Pillars of Athidhi</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={asset(pillar.image)} alt={pillar.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{pillar.label}</p>
                  <h3 className="mt-3 font-serif text-2xl text-maroon">{pillar.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/70">{pillar.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ink px-4 py-28">
        <Image
          src={asset("/assets/Photo%20from%20Athidhi%20Indian%20Restaurant-CKB1Q4MU.jpg")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/75" />
        <figure className="relative z-10 mx-auto max-w-4xl text-center">
          <blockquote className="font-serif text-3xl italic leading-snug text-cream md:text-4xl">
            “Every dish carries the spirit of our ancestors, crafted to leave a lasting memory on your palate.”
          </blockquote>
          <figcaption className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            — The Culinary Team at Athidhi
          </figcaption>
        </figure>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>Grand Hospitality</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl tracking-tight text-maroon md:text-5xl">Banquets &amp; Celebrations</h2>
            <p className={`mt-6 max-w-lg ${bodyText}`}>
              From intimate family dinners to lavish wedding receptions and corporate events, Athidhi brings royal Indian
              dining directly to your special occasions. Our customizable catering menus deliver an unforgettable feast.
            </p>
            <Link href="/catering" className={`${button.maroon} mt-10`}>
              Explore Catering Services <ArrowRight />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl shadow-ink/10">
            <Image src={asset("/assets/Chic%20Tikka-Bos-AjJZ.JPG")} alt="Chicken tikka" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
