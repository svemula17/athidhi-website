import type { Metadata } from "next";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import Mandala from "@/components/Mandala";
import { Eyebrow } from "@/components/ui";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Banquets & Catering — Athidhi",
  description: "Host birthdays, anniversaries, weddings and corporate events at Athidhi in Plainsboro, NJ.",
};

const headingXL = "font-serif text-4xl tracking-tight text-maroon md:text-6xl";
const bodyText = "max-w-lg text-lg font-light leading-relaxed text-ink/75";

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
            <Eyebrow center>Host Your</Eyebrow>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-cream md:text-7xl">
              Grand
              <br />
              Celebrations
            </h1>
            <p className="mx-auto mt-8 max-w-md text-lg font-light leading-relaxed text-cream/80">
              Whether you are planning an intimate birthday party, a romantic anniversary, a magnificent wedding reception,
              or corporate events, Athidhi provides the ultimate setting for memorable festivities.
            </p>
          </div>
        </div>
      </section>

      <section className="grid bg-cream md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-20">
          <Eyebrow tone="maroon">Layout &amp; Ambience</Eyebrow>
          <h2 className={`mt-5 ${headingXL}`}>The Perfect Venue</h2>
          <p className={`mt-6 ${bodyText}`}>
            Our exquisitely structured banquet spaces are fully customizable to align with your personal vision. Adorned
            with luxury Indian heritage architectural notes, we cater to large guest lists without ever substituting
            comfort.
          </p>
          <p className={`mt-5 ${bodyText}`}>
            Enjoy high-ceilings, dedicated event staging areas, and spacious dining floors meticulously decorated to create
            a brilliant, immersive experience.
          </p>
        </div>
        <div className="relative min-h-[360px] md:min-h-[560px]">
          <Image
            src={asset("/assets/20260606_141209-jnSBWv0D.jpg")}
            alt="Banquet hall set for an event"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid bg-cream md:grid-cols-2">
        <div className="relative min-h-[360px] md:min-h-[560px]">
          <Image
            src={asset("/assets/20260613_172248-FPsryS_P.jpg")}
            alt="Sweet sixteen party in the Athidhi banquet room"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-20">
          <Eyebrow tone="maroon">Exclusive</Eyebrow>
          <h2 className={`mt-5 ${headingXL}`}>Tailored Menus</h2>
          <p className={`mt-6 ${bodyText}`}>
            Choose from a wide variety of authentic Indian cuisines crafted by our masterful head chefs. We map personalized
            courses tailored strictly to your event types — be it buffets, pass-arounds, or multi-course seated dinners.
          </p>
          <p className={`mt-5 ${bodyText}`}>
            Experience legendary dishes from Chettinad, signature dum biryanis, and premium assortments brought to life
            vividly for your corporate galas or familial weddings.
          </p>
        </div>
      </section>

      <section id="request" className="scroll-mt-24 bg-sand py-24 md:scroll-mt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <Eyebrow center>Enquire Now</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl text-maroon md:text-5xl">Request a Banquet</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/70">
              Fill out your details below and we will contact you directly via WhatsApp to finalize the arrangements.
            </p>
          </div>
          <div className="mt-12">
            <EnquiryForm kind="banquet" />
          </div>
        </div>
      </section>
    </>
  );
}
