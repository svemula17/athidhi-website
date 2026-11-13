import type { ReactNode } from "react";

/** Small uppercase label with a rule, used above section headings. */
export function Eyebrow({
  children,
  center = false,
  tone = "gold",
  animate = false,
  className = "",
}: {
  children: ReactNode;
  center?: boolean;
  tone?: "gold" | "maroon";
  /** Play the entrance animation: text rises in, then the rules grow out from it. */
  animate?: boolean;
  className?: string;
}) {
  const text = tone === "gold" ? "text-gold" : "text-maroon";
  const rule = tone === "gold" ? "bg-gold/70" : "bg-maroon/40";
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

export const button = {
  maroon:
    "inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-8 py-3.5 font-semibold tracking-wide text-cream transition hover:bg-maroon/90",
  gold: "inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold tracking-wide text-ink transition hover:bg-gold-light",
  goldOutline:
    "inline-flex items-center justify-center gap-2 rounded-full border border-gold px-8 py-3.5 font-semibold tracking-wide text-gold transition hover:bg-gold hover:text-ink",
} as const;

export const field = {
  label: "mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-ink/70",
  input:
    "w-full rounded-xl border border-maroon/15 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-ink/35 focus:border-gold focus:ring-2 focus:ring-gold/30",
} as const;
