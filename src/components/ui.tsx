import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/data/site";

const eyebrowTones = {
  /** Bright gold, for dark backgrounds. */
  gold: { text: "text-gold", rule: "bg-gold/70" },
  /** Deeper gold that stays readable on cream, sand and white. */
  deep: { text: "text-gold-deep", rule: "bg-gold-deep/50" },
  maroon: { text: "text-maroon", rule: "bg-maroon/40" },
} as const;

/** Small uppercase label with a rule, used above section headings. */
export function Eyebrow({
  children,
  center = false,
  tone = "deep",
  animate = false,
  className = "",
}: {
  children: ReactNode;
  center?: boolean;
  /** "gold" on dark backgrounds, "deep" (default) on light ones. */
  tone?: keyof typeof eyebrowTones;
  /** Play the entrance animation: text rises in, then the rules grow out from it. */
  animate?: boolean;
  className?: string;
}) {
  const { text, rule } = eyebrowTones[tone];
  const ruleAnimation = animate ? "motion-safe:animate-rule" : "";
  const ruleDelay = animate ? { animationDelay: "0.35s" } : undefined;
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${center ? "justify-center" : ""} ${className}`}>
      <span aria-hidden="true" style={ruleDelay} className={`h-px w-6 shrink-0 origin-right sm:w-8 ${rule} ${ruleAnimation}`} />
      <span
        style={animate ? { animationDelay: "0.1s" } : undefined}
        className={`text-[11.5px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] ${text} ${animate ? "motion-safe:animate-rise" : ""}`}
      >
        {children}
      </span>
      {center && (
        <span aria-hidden="true" style={ruleDelay} className={`h-px w-6 shrink-0 origin-left sm:w-8 ${rule} ${ruleAnimation}`} />
      )}
    </div>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/** Line icons (Lucide shapes). Colour comes from the text colour. */
const iconPaths = {
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mapPin: (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  chat: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  download: <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />,
} as const;

export function Icon({ name, className = "h-[18px] w-[18px]" }: { name: keyof typeof iconPaths; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

export const button = {
  maroon:
    "inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-8 py-3.5 font-semibold tracking-wide text-cream transition hover:bg-maroon/90",
  gold: "inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold tracking-wide text-ink transition hover:bg-gold-light",
  goldOutline:
    "inline-flex items-center justify-center gap-2 rounded-full border border-gold px-8 py-3.5 font-semibold tracking-wide text-gold transition hover:bg-gold hover:text-ink",
  maroonOutline:
    "inline-flex items-center justify-center gap-2 rounded-full border border-maroon/40 px-8 py-3.5 font-semibold tracking-wide text-maroon transition hover:bg-maroon hover:text-cream",
} as const;

/**
 * The site's one ordering action. With online ordering (site.orderOnlineUrl) it opens the menu page,
 * where each dish links to Toast; without it, it calls the restaurant instead.
 */
export function OrderButton({ className, onClick }: { className: string; onClick?: () => void }) {
  if (site.orderOnlineUrl) {
    return (
      <Link href="/menu" onClick={onClick} className={className}>
        Order Online
      </Link>
    );
  }
  return (
    <a href={site.phoneHref} onClick={onClick} aria-label={`Call to order: ${site.phone}`} className={className}>
      <Icon name="phone" className="h-4 w-4" />
      Call to Order
    </a>
  );
}

export const field = {
  label: "mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-ink/70",
  input:
    "w-full rounded-xl border border-maroon/15 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-ink/50 focus:border-gold focus:ring-2 focus:ring-gold/30",
} as const;
