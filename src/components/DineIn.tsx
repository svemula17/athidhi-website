"use client";

// The menu page's dish pop-up and the guest's dine-in list (see src/lib/dine-in-list.ts).

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { DietMark, dietLabels, formatPrice } from "@/components/MenuBits";
import { ArrowRight, Icon } from "@/components/ui";
import type { MenuItem } from "@/data/menu";
import { site } from "@/data/site";
import { MAX_QTY } from "@/lib/dine-in-list";

/**
 * A pop-up on the browser's own <dialog>: keyboard focus stays inside, Escape or a tap on the dimmed
 * backdrop closes it, and focus goes back to what opened it. On phones it rises from the bottom.
 * Mount it to open it; `onClosed` runs once it has closed, so the parent can unmount it.
 */
function Sheet({
  label,
  variant,
  onClosed,
  children,
}: {
  label: string;
  /** "dish": a centred card on larger screens. "drawer": a full-height panel on the right. */
  variant: "dish" | "drawer";
  onClosed: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const pressedBackdrop = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || dialog.open) return;
    // The page's scrollbar hides while the pop-up is open; globals.css pads the page by its width.
    const root = document.documentElement;
    root.style.setProperty("--scrollbar-width", `${window.innerWidth - root.clientWidth}px`);
    dialog.showModal();
  }, []);

  const dialogPlacement =
    variant === "dish"
      ? "sm:m-auto sm:w-[calc(100%-2rem)] sm:max-w-lg sm:rounded-3xl"
      : "sm:m-0 sm:ml-auto sm:h-dvh sm:max-w-md sm:rounded-none sm:motion-safe:animate-drawer";
  const panelHeight = variant === "dish" ? "sm:max-h-[88dvh]" : "sm:h-dvh sm:max-h-none";

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClosed}
      // A press on the backdrop lands on the <dialog> itself; ignore drags that start inside.
      onPointerDown={(event) => {
        pressedBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pressedBackdrop.current && event.target === event.currentTarget) event.currentTarget.close();
      }}
      className={`m-0 mt-auto max-h-none w-full max-w-none overflow-hidden rounded-t-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-[rgb(27_11_13/0.55)] motion-safe:animate-sheet ${dialogPlacement}`}
    >
      <div className={`relative flex max-h-[90dvh] flex-col ${panelHeight}`}>{children}</div>
    </dialog>
  );
}

/** Closes the pop-up that holds this element. */
const closeSheet = (element: Element) => element.closest("dialog")?.close();

function CloseButton() {
  return (
    <button
      type="button"
      onClick={(event) => closeSheet(event.currentTarget)}
      aria-label="Close"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-md ring-1 ring-ink/10 transition hover:bg-sand"
    >
      <Icon name="close" className="h-5 w-5" />
    </button>
  );
}

/** − 2 + */
function Stepper({
  value,
  onChange,
  name,
  small = false,
}: {
  value: number;
  onChange: (qty: number) => void;
  name: string;
  small?: boolean;
}) {
  const size = small ? "h-8 w-8" : "h-11 w-11";
  const step = `flex ${size} items-center justify-center rounded-full text-maroon transition hover:bg-maroon/5 disabled:text-ink/25 disabled:hover:bg-transparent`;
  return (
    <div className="inline-flex shrink-0 items-center rounded-full border border-maroon/20 bg-white">
      <button type="button" aria-label={`One fewer ${name}`} disabled={value <= 1} onClick={() => onChange(value - 1)} className={step}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
        </svg>
      </button>
      <span className={`${small ? "w-6 text-sm" : "w-8"} text-center font-semibold tabular-nums`}>{value}</span>
      <button
        type="button"
        aria-label={`One more ${name}`}
        disabled={value >= MAX_QTY}
        onClick={() => onChange(value + 1)}
        className={step}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------

/** A dish in full: photo, description, price, and the choice of dine-in list or online order. */
export function DishDialog({
  item,
  onList,
  onAdd,
  onClosed,
}: {
  item: MenuItem;
  /** How many are already on the dine-in list. */
  onList: number;
  onAdd: (qty: number) => void;
  onClosed: () => void;
}) {
  const [qty, setQty] = useState(1);
  return (
    <Sheet label={item.name} variant="dish" onClosed={onClosed}>
      <div className="absolute right-3 top-3 z-10">
        <CloseButton />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {item.photo && (
          <div className="relative aspect-[4/3] w-full bg-sand sm:aspect-[16/10]">
            <Image src={item.photo} alt="" fill sizes="(min-width: 640px) 512px, 100vw" unoptimized className="object-cover" />
          </div>
        )}
        <div className={`px-6 pb-6 ${item.photo ? "pt-5" : "pr-16 pt-7"}`}>
          <h2 className="text-lg font-bold uppercase leading-snug tracking-[0.08em] text-ink">{item.name}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            {item.price !== undefined && <span className="text-lg font-semibold text-ink">{formatPrice(item.price)}</span>}
            {item.diet && (
              <span className="inline-flex items-center gap-2 text-sm text-ink/70">
                <DietMark diet={item.diet} />
                {dietLabels[item.diet]}
              </span>
            )}
          </div>
          {item.description && <p className="mt-4 leading-relaxed text-ink/75">{item.description}</p>}
          {onList > 0 && <p className="mt-4 text-sm font-medium text-maroon">{onList} already on your dine-in list</p>}
        </div>
      </div>
      <div className="border-t border-maroon/10 bg-white px-5 pb-5 pt-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Stepper value={qty} onChange={setQty} name={item.name} />
          <button
            type="button"
            onClick={(event) => {
              onAdd(qty);
              closeSheet(event.currentTarget);
            }}
            className="flex min-h-12 min-w-44 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-maroon px-5 py-3 text-sm font-semibold text-cream transition hover:bg-maroon/90"
          >
            <span className="sm:hidden">Add to list</span>
            <span className="hidden sm:inline">Add to dine-in list</span>
            {item.price !== undefined && (
              <>
                <span aria-hidden="true">·</span>
                <span>{formatPrice(item.price * qty)}</span>
              </>
            )}
          </button>
        </div>
        {item.orderUrl && (
          <a
            href={item.orderUrl}
            className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full border border-maroon/30 px-5 py-3 text-sm font-semibold text-maroon transition hover:bg-maroon hover:text-cream"
          >
            Order this for pickup or delivery
            <ArrowRight />
          </a>
        )}
      </div>
    </Sheet>
  );
}

// ---------------------------------------------------------------------------------------------

export type DineInEntry = { id: string; qty: number; item: MenuItem };

export const listTotals = (entries: DineInEntry[]) => ({
  count: entries.reduce((n, entry) => n + entry.qty, 0),
  subtotal: entries.reduce((sum, entry) => sum + (entry.item.price ?? 0) * entry.qty, 0),
});

/** The dine-in list: what the guest shows their server. */
export function DineInDrawer({
  entries,
  onQty,
  onClear,
  onClosed,
}: {
  entries: DineInEntry[];
  /** 0 takes the dish off the list. */
  onQty: (id: string, qty: number) => void;
  onClear: () => void;
  onClosed: () => void;
}) {
  const { count, subtotal } = listTotals(entries);
  return (
    <Sheet label="Your dine-in list" variant="drawer" onClosed={onClosed}>
      <div className="flex items-start justify-between gap-4 border-b border-maroon/10 px-6 pb-4 pt-6">
        <div>
          <h2 className="font-serif text-2xl text-maroon">Your dine-in list</h2>
          <p className="mt-1 text-sm text-ink/65">
            {site.name} · {site.address.street}
          </p>
        </div>
        <CloseButton />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6">
        {entries.length === 0 ? (
          <div className="py-14 text-center">
            <p className="font-medium text-ink">Nothing on your list yet.</p>
            <p className="mt-1 text-sm text-ink/65">Tap any dish on the menu to add it.</p>
          </div>
        ) : (
          <ul className="divide-y divide-maroon/10">
            {entries.map(({ id, qty, item }) => (
              <li key={id} className="flex gap-4 py-4">
                <div className="min-w-0 flex-1">
                  <p className="flex items-start gap-2 text-[13px] font-bold uppercase leading-snug tracking-[0.06em] text-ink">
                    <span className="min-w-0">{item.name}</span>
                    <DietMark diet={item.diet} />
                  </p>
                  {item.price !== undefined && <p className="mt-1 text-sm text-ink/65">{formatPrice(item.price)} each</p>}
                  <button
                    type="button"
                    onClick={() => onQty(id, 0)}
                    aria-label={`Remove ${item.name}`}
                    className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink/60 underline-offset-4 transition hover:text-maroon hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-col items-end justify-between gap-2">
                  {item.price !== undefined && <span className="font-semibold">{formatPrice(item.price * qty)}</span>}
                  <Stepper value={qty} onChange={(next) => onQty(id, next)} name={item.name} small />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-maroon/10 bg-sand/70 px-6 pb-6 pt-4">
        {entries.length > 0 && (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium">
                Subtotal · {count} {count === 1 ? "item" : "items"}
              </span>
              <span className="text-lg font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-0.5 text-xs text-ink/60">Before tax.</p>
            <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm leading-relaxed text-ink ring-1 ring-gold/50">
              <strong className="font-semibold text-maroon">Ready to order?</strong> Show this list to your server.
            </p>
            <button
              type="button"
              onClick={onClear}
              className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink/60 transition hover:text-maroon"
            >
              Clear list
            </button>
          </>
        )}
        {site.orderOnlineUrl && (
          <a
            href={site.orderOnlineUrl}
            className="mt-4 flex items-center justify-center gap-2 rounded-full border border-maroon/30 bg-white px-5 py-3 text-center text-sm font-semibold text-maroon transition hover:bg-maroon hover:text-cream"
          >
            Pickup or delivery? Order online
            <ArrowRight />
          </a>
        )}
      </div>
    </Sheet>
  );
}

/** Floats at the bottom of the menu while the list has dishes. */
export function DineInBar({ entries, onOpen }: { entries: DineInEntry[]; onOpen: () => void }) {
  const { count, subtotal } = listTotals(entries);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View dine-in list: ${count} ${count === 1 ? "item" : "items"}, ${formatPrice(subtotal)}`}
        className="pointer-events-auto flex w-full max-w-md items-center justify-between gap-4 rounded-full bg-maroon py-3 pl-3 pr-6 text-cream shadow-2xl shadow-ink/30 transition hover:bg-maroon/95 motion-safe:animate-sheet"
      >
        <span className="flex items-center gap-3 font-semibold">
          <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-cream px-2 text-sm font-bold text-maroon">
            {count}
          </span>
          View dine-in list
        </span>
        <span className="font-semibold">{formatPrice(subtotal)}</span>
      </button>
    </div>
  );
}
