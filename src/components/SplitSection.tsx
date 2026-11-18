import Image from "next/image";
import type { ReactNode } from "react";
import LoopVideo from "@/components/LoopVideo";
import { CornerWheel } from "@/components/Mandala";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";

const tones = {
  cream: { bg: "bg-cream", title: "text-maroon", body: "text-ink/75", eyebrow: "deep" },
  sand: { bg: "bg-sand", title: "text-maroon", body: "text-ink/75", eyebrow: "deep" },
  ink: { bg: "bg-ink", title: "text-gold", body: "text-white/70", eyebrow: "gold" },
} as const;

/**
 * The site's standard section: a full-height photo on one half; eyebrow, heading, text and
 * actions on the other. On phones the photo sits on top. Both halves animate in on scroll.
 * With `video`, a silent looping clip plays in place of the photo, which becomes its still frame.
 * Light sections get a faint wheel in the text half's outer corner unless `decoration` replaces it.
 */
export default function SplitSection({
  id,
  tone = "cream",
  imageSide = "right",
  image,
  video,
  imageClassName = "",
  imageOverlay,
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
  /** A short clip to loop instead of the photo (the photo should be its first frame). */
  video?: string;
  imageClassName?: string;
  /** Laid over the photo without zooming with it, e.g. a small caption card. */
  imageOverlay?: ReactNode;
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
          {video ? (
            <LoopVideo src={video} poster={image.src} className={`h-full w-full object-cover ${imageClassName}`} />
          ) : (
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className={`object-cover ${imageClassName}`} />
          )}
        </Reveal>
        {imageOverlay}
      </div>
      <div
        className={`relative isolate flex flex-col justify-center overflow-hidden px-6 py-16 sm:px-12 lg:px-20 ${
          imageFirst ? "md:order-2" : "md:order-1"
        }`}
      >
        {decoration ?? (tone !== "ink" && <CornerWheel corner={imageFirst ? "bottom-right" : "top-left"} />)}
        <Reveal stagger className="relative">
          {eyebrow && <Eyebrow tone={t.eyebrow}>{eyebrow}</Eyebrow>}
          <h2 className={`mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl ${t.title}`}>{title}</h2>
          {children && <div className={`mt-6 max-w-md space-y-4 text-[17px] font-light leading-relaxed ${t.body}`}>{children}</div>}
          {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
          {footer && <div className="mt-10">{footer}</div>}
        </Reveal>
      </div>
    </section>
  );
}
