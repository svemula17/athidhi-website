"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icon, OrderButton } from "@/components/ui";
import { site } from "@/data/site";
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

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const isScrolled = () => window.scrollY > 24;
const isScrolledOnServer = () => false;


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const isHome = usePathname() === "/";
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, isScrolledOnServer);

  // On the homepage the header sits transparently on top of the hero photo until you scroll.
  const overlay = isHome && !scrolled && !mobileOpen;

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
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        overlay ? "bg-transparent" : "bg-cream/95 shadow-[0_1px_0_0_rgb(91_11_19/0.1)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-28 lg:px-8">
        <Link href="/" onClick={closeMenus} className="shrink-0">
          <Image
            src={asset("/assets/logo-BgkjBRVm.png")}
            alt="Athidhi — Athidhi Devo Bhava"
            width={577}
            height={433}
            priority
            className={`h-14 w-auto transition duration-300 md:h-24 ${overlay ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <nav
          aria-label="Main"
          className={`hidden items-center rounded-full border px-2 py-1.5 transition-colors duration-300 lg:flex ${
            overlay ? "border-white/15 bg-white/5 backdrop-blur-sm" : "border-white/10 bg-ink/80 shadow-lg shadow-ink/10"
          }`}
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
          {/* Phones: a one-tap call button where the order button doesn't fit. */}
          <a
            href={site.phoneHref}
            aria-label={`Call Athidhi: ${site.phone}`}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition md:hidden ${
              overlay ? "bg-white/10 text-cream hover:bg-white/20" : "bg-ink/5 text-ink hover:bg-ink/10"
            }`}
          >
            <Icon name="phone" className="h-5 w-5" />
          </a>
          <OrderButton
            onClick={closeMenus}
            className="hidden items-center gap-2 rounded-full bg-brass px-6 py-2.5 text-sm font-bold text-ink shadow-sm transition hover:bg-gold md:inline-flex"
          />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden ${
              overlay ? "text-cream hover:bg-white/10" : "text-ink hover:bg-ink/5"
            }`}
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
            <div className="mt-4 border-t border-maroon/10 pt-4 md:hidden">
              <OrderButton
                onClick={closeMenus}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brass py-3 text-sm font-bold text-ink"
              />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
