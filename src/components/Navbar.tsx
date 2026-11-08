"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/assets";

const mainLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/banquet", label: "Banquet" },
  { href: "/catering", label: "Catering" },
  { href: "/about", label: "Our Story" },
];

const moreLinks = [
  { href: "/#gallery", label: "Gallery" },
  { href: "/#visit", label: "Contact" },
];

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  const closeMenus = () => {
    setMobileOpen(false);
    setMoreOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-maroon/10 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-28 lg:px-8">
        <Link href="/" onClick={closeMenus} className="shrink-0">
          <Image
            src={asset("/assets/logo-BgkjBRVm.png")}
            alt="Athidhi — Athidhi Devo Bhava"
            width={577}
            height={433}
            priority
            className="h-14 w-auto md:h-24"
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center rounded-full border border-white/10 bg-ink/80 px-2 py-1.5 shadow-lg shadow-ink/10 lg:flex"
        >
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenus}
              className="rounded-full px-4 py-2 text-sm font-medium text-cream transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-controls="more-menu"
              onClick={() => setMoreOpen((open) => !open)}
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-cream transition hover:text-gold"
            >
              More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`h-3.5 w-3.5 transition ${moreOpen ? "rotate-180" : ""}`} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {moreOpen && (
              <div
                id="more-menu"
                className="absolute right-0 top-full mt-3 min-w-44 rounded-2xl border border-white/10 bg-ink/95 p-2 shadow-xl"
              >
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className="block rounded-xl px-4 py-2.5 text-sm text-cream transition hover:bg-white/10 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            onClick={closeMenus}
            aria-label="Cart"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink transition hover:bg-ink/10"
          >
            <CartIcon />
          </Link>
          <Link
            href="/auth"
            className="hidden rounded-full border border-ink px-6 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-cream md:inline-flex"
          >
            Sign In
          </Link>
          <Link
            href="/menu"
            className="hidden rounded-full bg-brass px-6 py-2.5 text-sm font-bold text-ink shadow-sm transition hover:bg-gold md:inline-flex"
          >
            Order online ›
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-ink/5 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
              {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-maroon/10 bg-cream lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            {[...mainLinks, ...moreLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className="block rounded-xl px-4 py-3 font-serif text-lg text-ink transition hover:bg-sand"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-maroon/10 pt-4 md:hidden">
              <Link href="/auth" onClick={closeMenus} className="rounded-full border border-ink py-3 text-center text-sm font-bold text-ink">
                Sign In
              </Link>
              <Link href="/menu" onClick={closeMenus} className="rounded-full bg-brass py-3 text-center text-sm font-bold text-ink">
                Order online ›
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
