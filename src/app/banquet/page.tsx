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
  title: "Banquet Hall in Plainsboro, NJ | Athidhi",
  description:
    "Host birthdays, anniversaries, weddings and corporate events at Athidhi's banquet hall in Plainsboro, NJ, near Princeton, with Indian catering for every guest.",
  path: "/banquet",
});

// The hall dressed for different events. The last photo sits bottom right, as the client asked.
const events: { src: string; label: string; alt: string; position?: string }[] = [
  { src: "/assets/event-sweet-sixteen.jpg", label: "Sweet sixteens", alt: "Sweet sixteen backdrop with a balloon arch" },
  {
    src: "/assets/event-milestone-birthday.jpg",
    label: "Milestone birthdays",
    alt: "Balloon arch and light-up 40 for a birthday",
    // Keep the "40" in the crop.
    position: "object-[26%_50%]",
  },
  { src: "/assets/event-corporate.jpg", label: "Corporate events", alt: "Hall set for a corporate event facing three screens" },
  { src: "/assets/event-floral-stage.jpg", label: "Floral stage décor", alt: "Floral stage with tables in pink and white" },
  { src: "/assets/event-screens-sound.jpg", label: "Screens & sound", alt: "Hall with screens on the walls and a lit stage" },
  { src: "/assets/event-flexible-layout.jpg", label: "Flexible layouts", alt: "Round tables arranged around an open floor" },
];

export default function BanquetPage() {
  return (
    <>
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[380px] md:min-h-[640px]">
          <Image
            src={asset("/assets/banquet-hall-stage.jpg")}
            alt="The Athidhi banquet hall set with round tables in front of the stage"
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
              or corporate events, Athidhi&rsquo;s banquet hall in Plainsboro provides the ultimate setting for memorable festivities.
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
        image={{ src: asset("/assets/banquet-venue-poster.jpg"), alt: "The banquet hall set for an event" }}
        video={asset("/assets/banquet-venue.mp4")}
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

      <section className="bg-sand px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal stagger className="text-center">
            <Eyebrow center>Events We Host</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl text-maroon md:text-5xl">Celebrate in Style</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/75">
              From balloon arches and floral stages to screens for speeches and slideshows, the hall is set up around your event.
            </p>
          </Reveal>
          <Reveal stagger className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {events.map((event) => (
              <figure key={event.src} className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-ink/10 ring-1 ring-maroon/10">
                <Image
                  src={asset(event.src)}
                  alt={event.alt}
                  fill
                  sizes="(min-width: 1024px) 384px, 50vw"
                  className={`object-cover transition duration-700 group-hover:scale-105 ${event.position ?? ""}`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-cream sm:text-base">
                  {event.label}
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <SplitSection
        tone="ink"
        imageSide="left"
        image={{ src: asset("/assets/banquet-table-setting.jpg"), alt: "A banquet table set with red napkins and a floral centerpiece" }}
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
