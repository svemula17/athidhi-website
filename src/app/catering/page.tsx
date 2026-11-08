import type { Metadata } from "next";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import { Eyebrow, button } from "@/components/ui";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Catering Menu — Athidhi",
  description: "Athidhi's full banquet and catering menu for weddings, corporate events and celebrations.",
};

// The catering menu is a designed three-page card (same files the old site shows).
const menuPages = [
  { src: "/catering-menu-1.png", alt: "Athidhi catering menu, page 1" },
  { src: "/catering-menu-2.png", alt: "Athidhi catering menu, page 2" },
  { src: "/catering-menu-3.png", alt: "Athidhi catering menu, page 3" },
];

const menuPdf = "/Athidhi%20Banquet-Catering%20Menu.pdf";

export default function CateringPage() {
  return (
    <>
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h1 className="font-serif text-4xl text-maroon md:text-6xl">Full Catering Menu</h1>
            <a
              href={asset(menuPdf)}
              target="_blank"
              rel="noopener noreferrer"
              download="Athidhi Banquet-Catering Menu.pdf"
              className={`${button.maroon} shadow-lg shadow-maroon/20`}
            >
              Download
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />
              </svg>
            </a>
          </div>
          <div className="mt-12 space-y-8">
            {menuPages.map((page, i) => (
              <Image
                key={page.src}
                src={asset(page.src)}
                alt={page.alt}
                width={1224}
                height={1584}
                priority={i === 0}
                sizes="(min-width: 1024px) 960px, 100vw"
                className="h-auto w-full rounded-3xl shadow-xl shadow-ink/10"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="scroll-mt-24 bg-sand py-24 md:scroll-mt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <Eyebrow center>Enquire Now</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl text-maroon md:text-5xl">Request Catering</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/70">
              Fill out your details below and we will contact you directly via WhatsApp to finalize the arrangements.
            </p>
          </div>
          <div className="mt-12">
            <EnquiryForm kind="catering" />
          </div>
        </div>
      </section>
    </>
  );
}
