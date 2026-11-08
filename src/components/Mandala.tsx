/** Decorative line mandala. Takes its colour from a `text-*` class. */
export default function Mandala({ className = "" }: { className?: string }) {
  const outer = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const inner = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="100" cy="100" r="98" />
      <circle cx="100" cy="100" r="90" strokeDasharray="1.5 3" />
      <circle cx="100" cy="100" r="58" />
      <circle cx="100" cy="100" r="24" />
      <circle cx="100" cy="100" r="8" />
      {outer.map((angle) => (
        <path key={`o${angle}`} d="M100 12C110 28 112 44 100 60C88 44 90 28 100 12Z" transform={`rotate(${angle} 100 100)`} />
      ))}
      {inner.map((angle) => (
        <path key={`i${angle}`} d="M100 44C107 54 107 64 100 76C93 64 93 54 100 44Z" transform={`rotate(${angle + 15} 100 100)`} />
      ))}
    </svg>
  );
}
