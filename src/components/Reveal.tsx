"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Animates its content in the first time it scrolls into view (styles: .reveal* in globals.css).
 * - default: fades and rises
 * - stagger: each direct child fades and rises in turn
 * - zoom: fades in while settling from a slight zoom (for photos)
 * Content stays visible without JavaScript (see layout) and for reduced-motion visitors.
 */
export default function Reveal({
  children,
  className = "",
  stagger = false,
  zoom = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  zoom?: boolean;
  /** Extra delay in milliseconds. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variant = zoom ? "reveal-zoom" : stagger ? "reveal-stagger" : "reveal";
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <div ref={ref} data-shown={shown || undefined} style={style} className={`${variant} ${className}`}>
      {children}
    </div>
  );
}
