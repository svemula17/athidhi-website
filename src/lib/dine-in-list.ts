// The guest's dine-in list on the menu page: dishes to show their server at the table. It is kept
// only in this browser (localStorage), so it survives a reload; nothing is sent to the restaurant
// or to Toast. Pickup and delivery orders are placed on Toast online ordering instead.

import { useSyncExternalStore } from "react";

/** One dish on the list, by its key from dishKey() in src/data/menu.ts. */
export type DineInLine = { id: string; qty: number };

export const MAX_QTY = 20;
const MAX_LINES = 60;
const STORAGE_KEY = "athidhi-dine-in-list";

const EMPTY: DineInLine[] = [];
let cache: DineInLine[] | null = null;
const listeners = new Set<() => void>();

const clampQty = (qty: number) => Math.min(MAX_QTY, Math.max(0, Math.floor(qty)));

/** Reads a saved list, dropping anything malformed. */
function parse(raw: string | null): DineInLine[] {
  if (!raw) return EMPTY;
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return EMPTY;
    const lines: DineInLine[] = [];
    for (const entry of data.slice(0, MAX_LINES)) {
      const { id, qty } = (entry ?? {}) as Record<string, unknown>;
      if (typeof id !== "string" || !id || typeof qty !== "number" || !Number.isFinite(qty)) continue;
      const clamped = clampQty(qty);
      if (clamped > 0 && !lines.some((line) => line.id === id)) lines.push({ id, qty: clamped });
    }
    return lines;
  } catch {
    return EMPTY;
  }
}

function read(): DineInLine[] {
  if (cache) return cache;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked (strict privacy settings); the list then lasts until the page closes.
  }
  cache = parse(raw);
  return cache;
}

function write(next: DineInLine[]) {
  cache = next;
  try {
    if (next.length) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // See read().
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Another tab changed the list.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** The list (empty while the page is first drawn, before the browser's copy is read). */
export function useDineInList(): DineInLine[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function addToDineInList(id: string, qty: number) {
  const lines = read();
  const added = clampQty(qty);
  if (!added) return;
  if (lines.some((line) => line.id === id)) {
    write(lines.map((line) => (line.id === id ? { id, qty: clampQty(line.qty + added) } : line)));
  } else if (lines.length < MAX_LINES) {
    write([...lines, { id, qty: added }]);
  }
}

/** Sets a dish's quantity; 0 takes it off the list. */
export function setDineInQty(id: string, qty: number) {
  const lines = read();
  const next = clampQty(qty);
  write(next ? lines.map((line) => (line.id === id ? { id, qty: next } : line)) : lines.filter((line) => line.id !== id));
}

export function clearDineInList() {
  write(EMPTY);
}
