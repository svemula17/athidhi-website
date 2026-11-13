import type { Metadata } from "next";
import Link from "next/link";
import Mandala from "@/components/Mandala";
import { Eyebrow, button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found — Athidhi",
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center justify-center overflow-hidden bg-cream px-4 py-24 text-center">
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 text-gold/15" />
      <div>
        <Eyebrow center>Page not found</Eyebrow>
        <h1 className="mt-6 font-serif text-5xl tracking-tight text-maroon md:text-7xl">This table isn’t set</h1>
        <p className="mx-auto mt-6 max-w-md text-lg font-light leading-relaxed text-ink/75">
          The page you’re looking for has moved or no longer exists. Let us take you somewhere delicious instead.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className={button.maroon}>
            Back to Home
          </Link>
          <Link href="/menu" className={button.maroonOutline}>
            View the Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
