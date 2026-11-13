import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitSection from "@/components/SplitSection";
import { ArrowRight, Eyebrow, button } from "@/components/ui";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us — Athidhi Indian Restaurant",
  description: "The story and philosophy behind Athidhi — Athidhi Devo Bhava, the guest is divine.",
  path: "/about",
});

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

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[460px] items-center justify-center overflow-hidden bg-ink px-4 py-28 md:min-h-[560px]">
        <Image src={asset("/assets/hero-C-HBuKZ2.JPG")} alt="" fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/65" />
        <div className="relative z-10 text-center">
          <Eyebrow center animate tone="gold">
            Our Heritage
          </Eyebrow>
          <h1
            className="mt-6 font-serif text-5xl tracking-tight text-cream/90 motion-safe:animate-rise sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "0.25s" }}
          >
            THE ATHIDHI STORY
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl font-serif text-lg italic text-cream/75 motion-safe:animate-rise md:text-xl"
            style={{ animationDelay: "0.5s" }}
          >
            Embracing the soulful essence of the Indian subcontinent through revered culinary traditions.
          </p>
        </div>
      </section>

      <SplitSection
        tone="cream"
        imageSide="right"
        image={{ src: asset("/assets/Podi%20Idly-CPKUML0o.JPG"), alt: "Podi idly" }}
        imageOverlay={
          <div className="absolute bottom-6 left-6 max-w-[230px] rounded-2xl bg-maroon p-5 text-cream shadow-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Authentic Flavour</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">Slow-cooked using daily-ground heritage spices.</p>
          </div>
        }
        eyebrow="Sacred Philosophy"
        title={
          <>
            The Guest is <em className="text-gold-deep">Divine</em>
          </>
        }
        footer={
          <blockquote className="border-l-2 border-gold pl-5 font-serif text-xl italic text-maroon">
            “Where ancient heritage meets modern luxury.”
          </blockquote>
        }
      >
        <p>
          In the ancient Sanskrit teachings of the Taittiriya Upanishad, a single verse became the foundation of Indian
          hospitality: <strong className="font-serif font-normal italic text-maroon">Athidhi Devo Bhava</strong>. It
          proclaims that every guest who crosses our threshold should be treated with the same reverence given to the
          divine.
        </p>
        <p>
          At Athidhi, this philosophy isn’t just printed on our menus — it dictates every gesture, every warm welcome, and
          every aromatic dish that leaves our kitchen. We bridge traditional generational cooking with a refined, elevated
          dining atmosphere.
        </p>
      </SplitSection>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal stagger className="text-center">
            <Eyebrow center>Our Culinary Foundation</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl tracking-tight text-maroon md:text-5xl">The Pillars of Athidhi</h2>
          </Reveal>
          <Reveal stagger className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={asset(pillar.image)} alt={pillar.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-deep">{pillar.label}</p>
                  <h3 className="mt-3 font-serif text-2xl text-maroon">{pillar.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/75">{pillar.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
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
        <Reveal className="relative z-10">
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-serif text-3xl italic leading-snug text-cream md:text-4xl">
              “Every dish carries the spirit of our ancestors, crafted to leave a lasting memory on your palate.”
            </blockquote>
            <figcaption className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              — The Culinary Team at Athidhi
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <SplitSection
        tone="cream"
        imageSide="left"
        image={{ src: asset("/assets/Chic%20Tikka-Bos-AjJZ.JPG"), alt: "Chicken tikka" }}
        eyebrow="Grand Hospitality"
        title={<>Banquets &amp; Celebrations</>}
        actions={
          <>
            <Link href="/catering" className={button.maroon}>
              Explore Catering Services <ArrowRight />
            </Link>
            <Link href="/banquet" className={button.maroonOutline}>
              See the Banquet Hall
            </Link>
          </>
        }
      >
        <p>
          From intimate family dinners to lavish wedding receptions and corporate events, Athidhi brings royal Indian
          dining directly to your special occasions. Our customizable catering menus deliver an unforgettable feast.
        </p>
      </SplitSection>
    </>
  );
}
