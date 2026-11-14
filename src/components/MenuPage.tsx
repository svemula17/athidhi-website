"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/ui";
import { menuCategories, mostLoved, type Diet, type MenuCategory, type MenuItem } from "@/data/menu";
import { formatTime, hoursLabel, site } from "@/data/site";

type Filter = "all" | "veg" | "nonveg";

const formatPrice = (n: number) => `$${n.toFixed(2)}`;

// ---------------------------------------------------------------------------------------------
// Open / closed, in the restaurant's time zone (computed in the browser, refreshed every minute)

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const minutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

function openStatus(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = part("weekday");
  const now = Number(part("hour")) * 60 + Number(part("minute"));
  const today = site.hours.find((row) => row.dayOfWeek.includes(day));
  if (today && now >= minutes(today.opens) && now < minutes(today.closes)) return `open|Open · ${hoursLabel(today)}`;
  if (today && now < minutes(today.opens)) return `closed|Closed · Opens ${formatTime(today.opens)}`;
  const tomorrow = site.hours.find((row) => row.dayOfWeek.includes(weekdays[(weekdays.indexOf(day) + 1) % 7]));
  return `closed|Closed · Opens ${tomorrow ? `${formatTime(tomorrow.opens)} ` : ""}tomorrow`;
}

const everyMinute = (callback: () => void) => {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
};

function OpenStatus() {
  const status = useSyncExternalStore(everyMinute, openStatus, () => "");
  if (!status) return null;
  const [state, label] = status.split("|");
  const open = state === "open";
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
        open ? "border-green-700/20 bg-green-50 text-green-800" : "border-ink/10 bg-ink/5 text-ink/75"
      }`}
    >
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${open ? "bg-green-600" : "bg-ink/40"}`} />
      {label}
    </p>
  );
}

// ---------------------------------------------------------------------------------------------
// Veg / non-veg marks

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
    <span role="img" aria-label={dietLabels[diet]} title={dietLabels[diet]} className="inline-flex shrink-0 gap-1">
      {diet !== "nonveg" && <DietSymbol type="veg" />}
      {diet !== "veg" && <DietSymbol type="nonveg" />}
    </span>
  );
}

const matchesFilter = (item: MenuItem, filter: Filter) =>
  filter === "all" || item.diet === filter || item.diet === "both";

// ---------------------------------------------------------------------------------------------
// Dish card: text on the left, the dish's own photo on the right. The whole card opens the dish on Toast.

function DishCard({ item }: { item: MenuItem }) {
  const href = item.orderUrl ?? site.orderOnlineUrl;
  const content = (
    <>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="line-clamp-2 text-[13.5px] font-bold uppercase leading-snug tracking-[0.08em] text-ink">{item.name}</h3>
        {item.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/65">{item.description}</p>}
        <div className="mt-auto flex items-center gap-3 pt-4">
          {item.price !== undefined && <span className="font-semibold text-ink">{formatPrice(item.price)}</span>}
          <DietMark diet={item.diet} />
        </div>
      </div>
      {item.photo && (
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-sand sm:h-32 sm:w-32">
          {/* Toast photos load straight from Toast's image storage. */}
          <Image src={item.photo} alt="" fill sizes="128px" unoptimized className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
      )}
    </>
  );
  const card = "group flex min-h-40 gap-4 rounded-2xl border border-maroon/10 bg-white p-4 shadow-sm transition sm:p-5";
  return href ? (
    <a href={href} className={`${card} hover:-translate-y-0.5 hover:border-maroon/25 hover:shadow-lg`}>
      {content}
    </a>
  ) : (
    <article className={card}>{content}</article>
  );
}

// ---------------------------------------------------------------------------------------------

export default function MenuPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const tabsRef = useRef<HTMLDivElement>(null);

  const sections: MenuCategory[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = [{ id: "most-loved", name: "Most Loved", items: mostLoved }, ...menuCategories];
    return all
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            matchesFilter(item, filter) &&
            (!q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)),
        ),
      }))
      .filter((section) => section.items.length > 0 && (section.id !== "most-loved" || (!q && filter === "all")));
  }, [filter, query]);

  const current = sections.some((s) => s.id === active) ? active : sections[0]?.id;

  // Highlight the section being read, and keep its tab in view.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Just below the tab bar, past the gap that sections keep when scrolled to (scroll-mt).
        const line = (tabsRef.current?.getBoundingClientRect().bottom ?? 0) + 48;
        let id = sections[0]?.id ?? "";
        for (const section of sections) {
          const el = document.getElementById(section.id);
          if (el && el.getBoundingClientRect().top <= line) id = section.id;
        }
        setActive(id);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  useEffect(() => {
    const strip = tabsRef.current?.querySelector<HTMLElement>("[data-strip]");
    const tab = strip?.querySelector<HTMLElement>(`[data-tab="${current}"]`);
    if (strip && tab) strip.scrollTo({ left: tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [current]);

  const goTo = (id: string) => {
    setActive(id);
    setListOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Close the section list when clicking anywhere else or pressing Escape.
  useEffect(() => {
    if (!listOpen) return;
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !tabsRef.current?.contains(event.target as Node)) {
        setListOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [listOpen]);

  const scrollTabs = (direction: 1 | -1) =>
    tabsRef.current?.querySelector<HTMLElement>("[data-strip]")?.scrollBy({ left: direction * 320, behavior: "smooth" });

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "veg", label: "Veg" },
    { id: "nonveg", label: "Non-Veg" },
  ];

  return (
    <div className="bg-white">
      {/* Where and how to order */}
      <div className="border-b border-maroon/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink/75 transition hover:text-maroon"
          >
            <Icon name="mapPin" className="h-4 w-4 text-maroon" />
            {site.address.street}, {site.address.city}
          </a>
          {site.orderOnlineUrl && (
            <div className="flex gap-3">
              <a
                href={site.orderOnlineUrl}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-maroon/40 px-5 py-2.5 text-sm font-semibold text-maroon transition hover:bg-maroon hover:text-cream sm:flex-none"
              >
                Pickup / Delivery
              </a>
              <a
                href={site.orderOnlineUrl}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-maroon/90 sm:flex-none"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                Cart
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Section tabs */}
      <div ref={tabsRef} className="sticky top-20 z-40 border-b border-maroon/10 bg-white/95 backdrop-blur md:top-28">
        <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-2 sm:px-4 lg:px-6">
          <button
            type="button"
            aria-label="All menu sections"
            aria-expanded={listOpen}
            onClick={() => setListOpen((open) => !open)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-ink/5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <nav aria-label="Menu sections" data-strip className="no-scrollbar flex flex-1 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                data-tab={section.id}
                onClick={() => goTo(section.id)}
                aria-current={section.id === current ? "true" : undefined}
                className={`relative shrink-0 whitespace-nowrap px-4 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] transition ${
                  section.id === current ? "text-maroon" : "text-ink/70 hover:text-ink"
                }`}
              >
                {section.name}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-maroon transition ${section.id === current ? "opacity-100" : "opacity-0"}`}
                />
              </button>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Scroll sections"
            onClick={() => scrollTabs(1)}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon/15 bg-white text-ink shadow-sm transition hover:border-maroon/40 md:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>

          {listOpen && (
            <div className="absolute left-2 top-full mt-2 max-h-[60vh] w-72 overflow-y-auto rounded-2xl border border-maroon/10 bg-white p-2 shadow-2xl sm:left-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => goTo(section.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition hover:bg-sand ${
                    section.id === current ? "font-semibold text-maroon" : "text-ink/80"
                  }`}
                >
                  {section.name}
                  <span className="text-xs text-ink/60">{section.items.length}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Status, search, filters */}
        <div className="flex flex-wrap items-center gap-3 pt-8">
          <OpenStatus />
          {searchOpen ? (
            <div className="relative w-full max-w-sm">
              <label htmlFor="dish-search" className="sr-only">
                Search dishes
              </label>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="dish-search"
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setQuery("");
                    setSearchOpen(false);
                  }
                }}
                placeholder="Search dishes…"
                className="w-full rounded-full border border-maroon/20 bg-white py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink/50 focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-maroon/15 px-5 py-2 text-sm font-medium text-ink transition hover:border-maroon/40"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              Search
            </button>
          )}
          {site.orderOnlineUrl && <p className="w-full text-sm text-ink/65 sm:ml-auto sm:w-auto">Tap a dish to order it for pickup or delivery.</p>}
        </div>

        <div role="group" aria-label="Filter dishes" className="mt-6 flex flex-wrap gap-2 rounded-2xl bg-sand px-4 py-3">
          {filters.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                filter === option.id ? "border-maroon bg-maroon text-cream" : "border-maroon/15 bg-white text-ink hover:border-maroon/40"
              }`}
            >
              {option.id !== "all" && (
                <span className={filter === option.id ? "rounded-[3px] bg-white" : ""}>
                  <DietSymbol type={option.id} />
                </span>
              )}
              {option.label}
            </button>
          ))}
        </div>

        {sections.length === 0 ? (
          <p className="py-24 text-center text-ink/70">No dishes match. Try another search or filter.</p>
        ) : (
          sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-40 pt-14 md:scroll-mt-48">
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={`${section.id}-heading`} className="font-serif text-3xl text-maroon md:text-4xl">
                  {section.name}
                </h2>
                <span className="text-xs uppercase tracking-[0.2em] text-ink/60">{section.items.length} dishes</span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => (
                  <DishCard key={`${section.id}-${item.name}`} item={item} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
