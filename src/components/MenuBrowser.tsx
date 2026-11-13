"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { OrderButton, button } from "@/components/ui";
import { menuCategories, mostLoved, type Diet, type MenuItem } from "@/data/menu";
import { site } from "@/data/site";
import { asset } from "@/lib/assets";

type View = "grid" | "list";

const formatPrice = (n: number) => `$${n.toFixed(2)}`;

function Price({ item, className = "mt-4" }: { item: MenuItem; className?: string }) {
  return (
    <p className={`flex items-baseline gap-2 ${className}`}>
      <span className="font-serif text-xl text-gold-deep">{formatPrice(item.price)}</span>
      {item.originalPrice !== undefined && (
        <span className="font-serif text-xs text-ink/60 line-through">
          <span className="sr-only">was </span>
          {formatPrice(item.originalPrice)}
        </span>
      )}
    </p>
  );
}

const dietLabels: Record<Diet, string> = {
  veg: "Vegetarian",
  nonveg: "Non-vegetarian",
  both: "Vegetarian or non-vegetarian",
};

function DietSymbol({ type }: { type: "veg" | "nonveg" }) {
  // The familiar Indian food marks: a green dot (vegetarian) or brown triangle (non-vegetarian) in a square.
  const color = type === "veg" ? "text-green-700" : "text-orange-800";
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 ${color}`} aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {type === "veg" ? <circle cx="8" cy="8" r="3.5" fill="currentColor" /> : <path d="M8 4.2 12 11.3H4Z" fill="currentColor" />}
    </svg>
  );
}

function DietMark({ diet }: { diet?: Diet }) {
  if (!diet) return null;
  return (
    <span role="img" aria-label={dietLabels[diet]} title={dietLabels[diet]} className="mt-1.5 inline-flex shrink-0 gap-1">
      {diet !== "nonveg" && <DietSymbol type="veg" />}
      {diet !== "veg" && <DietSymbol type="nonveg" />}
    </span>
  );
}

function DishName({ item, className }: { item: MenuItem; className: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <DietMark diet={item.diet} />
      <h3 className={`font-serif leading-snug text-ink ${className}`}>{item.name}</h3>
    </div>
  );
}

// Cards are `relative` so the screen-reader-only "was" price stays inside the scrolling row
// (otherwise it widens the page on phones).
function DishCard({ item, view, className = "" }: { item: MenuItem; view: View; className?: string }) {
  if (view === "list") {
    return (
      <article className="relative flex items-center gap-4 rounded-2xl border border-maroon/10 bg-white p-3 shadow-sm">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
          <Image src={asset(item.image)} alt="" fill sizes="96px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <DishName item={item} className="text-lg" />
          <p className="mt-1 text-sm text-ink/70">{item.description}</p>
          <Price item={item} className="mt-2" />
        </div>
      </article>
    );
  }
  return (
    <article className={`relative flex flex-col overflow-hidden rounded-3xl border border-maroon/10 bg-white shadow-sm transition hover:shadow-lg ${className}`}>
      <div className="relative h-48">
        <Image src={asset(item.image)} alt="" fill sizes="320px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <DishName item={item} className="text-xl" />
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{item.description}</p>
        <Price item={item} />
      </div>
    </article>
  );
}

function DishSection({
  id,
  title,
  items,
  view,
  wrap = false,
}: {
  id?: string;
  title: string;
  items: MenuItem[];
  view: View;
  wrap?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-12 md:scroll-mt-32">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-2xl text-maroon md:text-3xl">{title}</h2>
        <span className="text-xs uppercase tracking-[0.2em] text-ink/60">
          {items.length} {items.length === 1 ? "dish" : "dishes"}
        </span>
      </div>
      {view === "list" ? (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {items.map((item) => (
            <DishCard key={item.name} item={item} view="list" />
          ))}
        </div>
      ) : wrap ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <DishCard key={item.name} item={item} view="grid" />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
          {items.map((item) => (
            <DishCard key={item.name} item={item} view="grid" className="w-72 shrink-0 snap-start sm:w-80" />
          ))}
        </div>
      )}
    </section>
  );
}

function ToggleButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
        pressed ? "bg-white text-maroon shadow-sm" : "text-ink/60 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

/** How to order, until (and once) online ordering is connected — see site.orderOnlineUrl. */
function OrderBanner() {
  const online = Boolean(site.orderOnlineUrl);
  return (
    <div className="mt-8 flex flex-col gap-5 rounded-3xl bg-maroon px-6 py-6 text-cream sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div>
        <p className="font-serif text-2xl">{online ? "Order online for pickup" : "Takeout & pickup"}</p>
        <p className="mt-1 text-sm text-cream/80">
          {online ? (
            "Place your order online and we’ll have it ready."
          ) : (
            <>
              Call{" "}
              <a href={site.phoneHref} className="font-semibold text-gold underline-offset-4 hover:underline">
                {site.phone}
              </a>{" "}
              to place your order.
            </>
          )}
        </p>
      </div>
      <OrderButton className={`${button.gold} shrink-0 shadow-lg shadow-ink/20`} />
    </div>
  );
}

function DietLegend() {
  return (
    <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/70">
      <span className="inline-flex items-center gap-2">
        <DietSymbol type="veg" /> Vegetarian
      </span>
      <span className="inline-flex items-center gap-2">
        <DietSymbol type="nonveg" /> Non-vegetarian
      </span>
      <span>Ask us about allergens.</span>
    </p>
  );
}

export default function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("grid");
  const [active, setActive] = useState(menuCategories[0].id);

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      q
        ? menuCategories
            .flatMap((c) => c.items)
            .filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
        : [],
    [q],
  );

  // Highlight the category that's currently on screen.
  useEffect(() => {
    if (q) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    for (const category of menuCategories) {
      const el = document.getElementById(category.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [q]);

  function goTo(id: string) {
    flushSync(() => {
      setQuery("");
      setActive(id);
    });
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  }

  return (
    <div className="mx-auto max-w-[1440px] lg:flex">
      <aside className="border-b border-maroon/10 bg-sand/70 lg:sticky lg:top-28 lg:h-[calc(100dvh-7rem)] lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
          <label className="relative block">
            <span className="sr-only">Search dishes</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full rounded-full border border-maroon/10 bg-white py-3 pl-11 pr-4 text-sm text-ink shadow-sm outline-none placeholder:text-ink/50 focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
          </label>
          <div>
            <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink/60">Collections</p>
            <nav
              aria-label="Menu categories"
              className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
            >
              {menuCategories.map((category) => {
                const isActive = !q && active === category.id;
                return (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(category.id);
                    }}
                    className={`flex shrink-0 items-center justify-between gap-4 rounded-full px-5 py-2.5 font-serif text-[15px] transition ${
                      isActive ? "bg-maroon text-cream shadow-md" : "bg-white/60 text-ink/80 hover:bg-white lg:bg-transparent"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`font-sans text-xs ${isActive ? "text-gold" : "text-ink/60"}`}>{category.items.length}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 px-4 pb-24 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-4 border-b border-maroon/10 pb-8 pt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">Athidhi Restaurant</p>
            <h1 className="mt-2 font-serif text-4xl text-maroon md:text-5xl">Menu Discovery</h1>
          </div>
          <div role="group" aria-label="Layout" className="flex rounded-full border border-maroon/10 bg-sand p-1">
            <ToggleButton label="Grid view" pressed={view === "grid"} onClick={() => setView("grid")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </ToggleButton>
            <ToggleButton label="List view" pressed={view === "list"} onClick={() => setView("list")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
                <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
              </svg>
            </ToggleButton>
          </div>
        </div>

        <OrderBanner />
        <DietLegend />

        {q ? (
          results.length > 0 ? (
            <DishSection title={`Results for “${query.trim()}”`} items={results} view={view} wrap />
          ) : (
            <p className="pt-12 text-ink/60">No dishes match “{query.trim()}”.</p>
          )
        ) : (
          <>
            <DishSection id="most-loved" title="Most Loved" items={mostLoved} view={view} />
            {menuCategories.map((category) => (
              <DishSection key={category.id} id={category.id} title={category.name} items={category.items} view={view} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
