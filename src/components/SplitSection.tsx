import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";

const tones = {
  cream: { bg: "bg-cream", title: "text-maroon", body: "text-ink/70" },
  sand: { bg: "bg-sand", title: "text-maroon", body: "text-ink/70" },
  ink: { bg: "bg-ink", title: "text-gold", body: "text-white/60" },
} as const;

/**
 * The homepage's standard section: a full-height photo on one half; eyebrow, heading, text and
 * actions on the other. On phones the photo sits on top. Both halves animate in on scroll.
 */
export default function SplitSection({
  id,
  tone = "cream",
  imageSide = "right",
  image,
  imageClassName = "",
  eyebrow,
  title,
  children,
  actions,
  footer,
  decoration,
}: {
  id?: string;
  tone?: keyof typeof tones;
  imageSide?: "left" | "right";
  image: { src: string; alt: string };
  imageClassName?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  decoration?: ReactNode;
}) {
  const t = tones[tone];
  const imageFirst = imageSide === "left";
  return (
    <section id={id} className={`grid scroll-mt-24 md:scroll-mt-32 md:grid-cols-2 ${t.bg}`}>
      <div className={`relative min-h-[320px] overflow-hidden md:min-h-[560px] ${imageFirst ? "md:order-1" : "md:order-2"}`}>
        <Reveal zoom className="absolute inset-0">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className={`object-cover ${imageClassName}`} />
        </Reveal>
      </div>
      <div
        className={`relative flex flex-col justify-center overflow-hidden px-6 py-16 sm:px-12 lg:px-20 ${
          imageFirst ? "md:order-2" : "md:order-1"
        }`}
      >
        {decoration}
        <Reveal stagger className="relative">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className={`mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl ${t.title}`}>{title}</h2>
          {children && <div className={`mt-6 max-w-md space-y-4 text-[17px] font-light leading-relaxed ${t.body}`}>{children}</div>}
          {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
          {footer && <div className="mt-10">{footer}</div>}
        </Reveal>
      </div>
    </section>
  );
}
