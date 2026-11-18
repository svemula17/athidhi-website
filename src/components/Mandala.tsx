/**
 * The decorative line wheel (a mandala) from the restaurant's original site. Takes its colour from
 * a `text-*` class and turns slowly, unless the visitor prefers reduced motion.
 */
export default function Mandala({ className = "", spin = "slow" }: { className?: string; spin?: "slow" | "slower" | "none" }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const points = Array.from({ length: 24 }, (_, i) => i * 15);
  const turning = { slow: "motion-safe:animate-wheel", slower: "motion-safe:animate-wheel-slow", none: "" }[spin];
  return (
    <svg viewBox="0 0 200 200" className={`${turning} ${className}`} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth={0.6}>
        {[8, 18, 42, 62, 82].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} />
        ))}
        <circle cx="100" cy="100" r="96" strokeDasharray="1 3" />
        {petals.map((angle) => (
          <g key={`petal-${angle}`} transform={`rotate(${angle} 100 100)`}>
            <path d="M100 18C108 40 108 60 100 82C92 60 92 40 100 18Z" />
            <circle cx="100" cy="22" r="2" />
          </g>
        ))}
        {points.map((angle) => (
          <path key={`point-${angle}`} d="M100 42L103 58L100 62L97 58Z" transform={`rotate(${angle} 100 100)`} />
        ))}
      </g>
    </svg>
  );
}

const corners = {
  "top-left": "-left-40 -top-40",
  "top-right": "-right-40 -top-40",
  "bottom-left": "-bottom-40 -left-40",
  "bottom-right": "-bottom-40 -right-40",
};

/**
 * A faint maroon wheel in one corner of a light (cream, sand or white) section, behind its content.
 * The section needs `relative isolate overflow-clip` (clip, not hidden, so sticky bars still stick).
 */
export function CornerWheel({ corner, spin = "slow" }: { corner: keyof typeof corners; spin?: "slow" | "slower" }) {
  return (
    <Mandala
      spin={spin}
      className={`pointer-events-none absolute -z-10 h-[500px] w-[500px] text-maroon/[0.07] ${corners[corner]}`}
    />
  );
}
