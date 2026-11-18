"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { DineInBar, DineInDrawer, DishDialog, type DineInEntry } from "@/components/DineIn";
import { DietMark, DietSymbol, formatPrice } from "@/components/MenuBits";
import { Icon } from "@/components/ui";
import { dishKey, dishesByKey, menuCategories, mostLoved, type MenuCategory, type MenuItem } from "@/data/menu";
import { formatTime, site } from "@/data/site";
import { addToDineInList, clearDineInList, setDineInQty, useDineInList } from "@/lib/dine-in-list";

type Filter = "all" | "veg" | "nonveg";

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
  const periodsOn = (weekday: string) => site.hours.find((row) => row.dayOfWeek.includes(weekday))?.periods ?? [];

  const current = periodsOn(day).find((period) => now >= minutes(period.opens) && now < minutes(period.closes));
  if (current) return `open|Open · until ${formatTime(current.closes)}`;
  const later = periodsOn(day).find((period) => now < minutes(period.opens));
  if (later) return `closed|Closed · Opens ${formatTime(later.opens)}`;
  for (let ahead = 1; ahead <= 7; ahead++) {
    const next = weekdays[(weekdays.indexOf(day) + ahead) % 7];
    const first = periodsOn(next)[0];
    if (first) return `closed|Closed · Opens ${ahead === 1 ? "tomorrow" : next} ${formatTime(first.opens)}`;
  }
  return "";
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

const matchesFilter = (item: MenuItem, filter: Filter) =>
  filter === "all" || item.diet === filter || item.diet === "both";

// ---------------------------------------------------------------------------------------------
// Dish card: text on the left, the dish's own photo on the right. The whole card opens the dish
// pop-up (the dish name is the button; its ::after stretches over the card).

function DishCard({ item, onList, onOpen }: { item: MenuItem; onList: number; onOpen: () => void }) {
  return (
    <article className="group relative flex min-h-40 gap-4 rounded-2xl border border-maroon/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-maroon/25 hover:shadow-lg sm:p-5">
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-[13.5px] font-bold uppercase leading-snug tracking-[0.08em] text-ink">
          <button
            type="button"
            onClick={onOpen}
            className="block w-full cursor-pointer text-left uppercase after:absolute after:inset-0 after:z-10 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-gold focus-visible:after:ring-offset-2"
          >
            <span className="line-clamp-2">{item.name}</span>
          </button>
        </h3>
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
      {onList > 0 && (
        <span className="pointer-events-none absolute -right-2 -top-2 z-20 flex h-7 min-w-7 items-center justify-center rounded-full bg-maroon px-2 text-xs font-bold text-cream shadow-md ring-2 ring-white">
          {onList}
          <span className="sr-only"> on your dine-in list</span>
        </span>
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------------------------

export default function MenuPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [dish, setDish] = useState<MenuItem | null>(null);
  const [dineInOpen, setDineInOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const tabsRef = useRef<HTMLDivElement>(null);

  // The dine-in list, matched to today's menu (dishes taken off the menu drop out).
  const dineInLines = useDineInList();
  const dineIn: DineInEntry[] = useMemo(
    () =>
      dineInLines.flatMap((line) => {
        const item = dishesByKey.get(line.id);
        return item ? [{ ...line, item }] : [];
      }),
    [dineInLines],
  );
  const onList = useMemo(() => new Map(dineIn.map((entry) => [entry.id, entry.qty])), [dineIn]);
  const dineInCount = dineIn.reduce((n, entry) => n + entry.qty, 0);

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
    if (!strip || !tab) return;
    // Centre the current tab in the strip (measured on screen, so the menu button beside it doesn't throw it off).
    const offset = tab.getBoundingClientRect().left - strip.getBoundingClientRect().left;
    strip.scrollTo({ left: strip.scrollLeft + offset - (strip.clientWidth - tab.clientWidth) / 2, behavior: "smooth" });
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
          <div>
            <h1 className="font-serif text-3xl text-maroon">Our Menu</h1>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 text-sm text-ink/75 transition hover:text-maroon"
            >
              <Icon name="mapPin" className="h-4 w-4 text-maroon" />
              {site.address.street}, {site.address.city}
            </a>
          </div>
          <div className="flex gap-3">
            {site.orderOnlineUrl && (
              <a
                href={site.orderOnlineUrl}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-maroon/40 px-5 py-2.5 text-sm font-semibold text-maroon transition hover:bg-maroon hover:text-cream sm:flex-none"
              >
                Pickup / Delivery
              </a>
            )}
            <button
              type="button"
              onClick={() => setDineInOpen(true)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-maroon/90 sm:flex-none"
            >
              <Icon name="list" className="h-4 w-4" />
              Dine-in list
              {dineInCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cream px-1.5 text-xs font-bold text-maroon">
                  {dineInCount}
                </span>
              )}
            </button>
          </div>
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
          <p className="w-full text-sm text-ink/65 sm:ml-auto sm:w-auto">Dining in? Tap dishes to build your list, then show it to your server.</p>
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
                  <DishCard
                    key={`${section.id}-${item.name}`}
                    item={item}
                    onList={onList.get(dishKey(item)) ?? 0}
                    onOpen={() => setDish(item)}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {dish && (
        <DishDialog
          key={dishKey(dish)}
          item={dish}
          onList={onList.get(dishKey(dish)) ?? 0}
          onAdd={(qty) => {
            addToDineInList(dishKey(dish), qty);
            setAnnouncement(`Added ${qty} ${dish.name} to your dine-in list.`);
          }}
          onClosed={() => setDish(null)}
        />
      )}
      {dineInOpen && (
        <DineInDrawer entries={dineIn} onQty={setDineInQty} onClear={clearDineInList} onClosed={() => setDineInOpen(false)} />
      )}
      {dineInCount > 0 && !dish && !dineInOpen && <DineInBar entries={dineIn} onOpen={() => setDineInOpen(true)} />}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
