"use client";

import { useEffect, useRef } from "react";

/**
 * A short silent clip that loops like a moving photo. It loads and plays only while on screen, and
 * stays on its still frame for visitors who prefer reduced motion. Decorative, so screen readers skip it.
 */
export default function LoopVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduceMotion.matches) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-hidden="true" className={className} />;
}
