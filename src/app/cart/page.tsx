import type { Metadata } from "next";
import Link from "next/link";
import { button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Your Order — Athidhi",
};

export default function CartPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-cream px-4 py-24">
      <div className="text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-16 w-16 text-gold" aria-hidden="true">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        <h1 className="mt-6 font-serif text-4xl text-maroon">Your cart is empty</h1>
        <p className="mt-3 text-ink/60">Browse the menu and add your favourite dishes.</p>
        <Link href="/menu" className={`${button.maroon} mt-8`}>
          View Menu
        </Link>
      </div>
    </section>
  );
}
