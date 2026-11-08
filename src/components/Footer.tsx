import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Mandala from "@/components/Mandala";
import { site } from "@/data/site";
import { asset } from "@/lib/assets";

const explore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#visit", label: "Reservations" },
  { href: "/#visit", label: "Contact" },
];

const socials: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: site.social.facebook,
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "YouTube",
    href: site.social.youtube,
    icon: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </>
    ),
  },
  {
    label: "WhatsApp community",
    href: site.social.whatsappCommunity,
    icon: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  },
];

const heading = "font-serif text-sm uppercase tracking-[0.3em] text-gold";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream/80">
      <Mandala className="pointer-events-none absolute -bottom-48 -right-40 h-[560px] w-[560px] text-gold/[0.07]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image src={asset("/assets/logo-BgkjBRVm.png")} alt="Athidhi" width={577} height={433} className="h-24 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">{site.description}</p>
          <ul className="mt-8 flex gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-gold hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Explore</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {explore.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Contact</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <Icon>
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </Icon>
              <span>
                {site.address.street}, {site.address.city}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </Icon>
              <a href={site.phoneHref} className="transition hover:text-gold">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </Icon>
              <a href={`mailto:${site.email}`} className="transition hover:text-gold">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>Newsletter</h2>
          <p className="mt-6 text-sm leading-relaxed text-cream/60">Receive tasting menus, chef stories, and reservations.</p>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p className="text-cream/50">© 2026 Athidhi. All rights reserved.</p>
          <p className="font-serif uppercase tracking-[0.3em] text-gold">{site.motto}</p>
        </div>
      </div>
    </footer>
  );
}
