import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import Mandala from "@/components/Mandala";
import Reveal from "@/components/Reveal";
import SplitSection from "@/components/SplitSection";
import { ArrowRight, Eyebrow, button } from "@/components/ui";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Banquets & Catering — Athidhi",
  description: "Host birthdays, anniversaries, weddings and corporate events at Athidhi in Plainsboro, NJ.",
  path: "/banquet",
});

export default function BanquetPage() {
  return (
    <>
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[380px] md:min-h-[640px]">
          <Image
            src={asset("/assets/hero-4hOicPhT.jpg")}
            alt="Sweet sixteen celebration set up at Athidhi"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative flex items-center justify-center overflow-hidden bg-maroon px-6 py-20 text-center sm:px-12">
          <Mandala className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 text-gold/15" />
          <div className="relative">
            <Eyebrow center animate tone="gold">
              Host Your
            </Eyebrow>
            <h1
              className="mt-6 font-serif text-5xl leading-[1.05] text-cream motion-safe:animate-rise md:text-7xl"
              style={{ animationDelay: "0.25s" }}
            >
              Grand
              <br />
              Celebrations
            </h1>
            <p
              className="mx-auto mt-8 max-w-md text-lg font-light leading-relaxed text-cream/80 motion-safe:animate-rise"
              style={{ animationDelay: "0.5s" }}
            >
              Whether you are planning an intimate birthday party, a romantic anniversary, a magnificent wedding reception,
              or corporate events, Athidhi provides the ultimate setting for memorable festivities.
            </p>
            <div className="mt-10 motion-safe:animate-rise" style={{ animationDelay: "0.7s" }}>
              <Link href="#request" className={button.gold}>
                Request a Banquet <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SplitSection
        tone="cream"
        imageSide="right"
        image={{ src: asset("/assets/20260606_141209-jnSBWv0D.jpg"), alt: "Banquet hall set for an event" }}
        eyebrow="Layout & Ambience"
        title="The Perfect Venue"
      >
        <p>
          Our exquisitely structured banquet spaces are fully customizable to align with your personal vision. Adorned with
          luxury Indian heritage architectural notes, we cater to large guest lists without ever substituting comfort.
        </p>
        <p>
          Enjoy high-ceilings, dedicated event staging areas, and spacious dining floors meticulously decorated to create a
          brilliant, immersive experience.
        </p>
      </SplitSection>

      <SplitSection
        tone="ink"
        imageSide="left"
        image={{ src: asset("/assets/20260613_172248-FPsryS_P.jpg"), alt: "Sweet sixteen party in the Athidhi banquet room" }}
        eyebrow="Exclusive"
        title="Tailored Menus"
        decoration={<Mandala className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] text-gold/10" />}
        actions={
          <Link href="/catering" className={button.goldOutline}>
            See the Catering Menu <ArrowRight />
          </Link>
        }
      >
        <p>
          Choose from a wide variety of authentic Indian cuisines crafted by our masterful head chefs. We map personalized
          courses tailored strictly to your event types — be it buffets, pass-arounds, or multi-course seated dinners.
        </p>
        <p>
          Experience legendary dishes from Chettinad, signature dum biryanis, and premium assortments brought to life vividly
          for your corporate galas or familial weddings.
        </p>
      </SplitSection>

      <section id="request" className="scroll-mt-24 bg-sand py-24 md:scroll-mt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal stagger className="text-center">
            <Eyebrow center>Enquire Now</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl text-maroon md:text-5xl">Request a Banquet</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/75">
              Fill out your details below and we will contact you directly via WhatsApp to finalize the arrangements.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <EnquiryForm kind="banquet" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
