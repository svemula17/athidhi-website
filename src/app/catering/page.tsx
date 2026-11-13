import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { ArrowRight, Eyebrow, Icon, button } from "@/components/ui";
import { cateringMenu } from "@/data/catering";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Catering Menu — Athidhi",
  description: "Athidhi's full banquet and catering menu for weddings, corporate events and celebrations.",
  path: "/catering",
});

// The printed version of the same menu, for guests who want to download or share it.
const menuPdf = "/Athidhi%20Banquet-Catering%20Menu.pdf";

export default function CateringPage() {
  return (
    <>
      <section className="bg-cream pb-24 pt-16 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal stagger className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Eyebrow>Weddings &amp; Events</Eyebrow>
              <h1 className="mt-5 font-serif text-4xl tracking-tight text-maroon md:text-6xl">Full Catering Menu</h1>
              <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-ink/75">
                Every dish below is available for banquets and catering. Send us a request and we’ll plan the menu with
                you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="#request" className={button.maroon}>
                Request Catering <ArrowRight />
              </Link>
              <a
                href={asset(menuPdf)}
                target="_blank"
                rel="noopener noreferrer"
                download="Athidhi Banquet-Catering Menu.pdf"
                className={button.maroonOutline}
              >
                Download PDF
                <Icon name="download" className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <nav aria-label="Catering menu sections" className="mt-12 flex flex-wrap gap-2">
            {cateringMenu.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-maroon/15 bg-white px-4 py-2 text-sm text-ink/80 transition hover:border-gold hover:text-maroon"
              >
                {section.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 gap-6 md:columns-2 xl:columns-3">
            {cateringMenu.map((section) => (
              <Reveal key={section.id} className="mb-6 break-inside-avoid">
                <section
                  id={section.id}
                  aria-labelledby={`${section.id}-title`}
                  className="scroll-mt-28 rounded-3xl border border-maroon/10 bg-white p-7 shadow-sm md:scroll-mt-36"
                >
                  <h2 id={`${section.id}-title`} className="font-serif text-2xl text-maroon">
                    {section.title}
                  </h2>
                  <div aria-hidden="true" className="mt-3 h-px w-12 bg-gold" />
                  {section.groups.map((group, i) => (
                    <ul key={i} className="mt-4 space-y-1.5 text-[15px] leading-snug text-ink">
                      {group.map((dish) => (
                        <li key={dish.name}>
                          {dish.name}
                          {dish.options && <span className="text-ink/70"> — {dish.options}</span>}
                        </li>
                      ))}
                    </ul>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="scroll-mt-24 bg-sand py-24 md:scroll-mt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal stagger className="text-center">
            <Eyebrow center>Enquire Now</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl text-maroon md:text-5xl">Request Catering</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/75">
              Fill out your details below and we will contact you directly via WhatsApp to finalize the arrangements.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <EnquiryForm kind="catering" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
