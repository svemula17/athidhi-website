// Small pieces shared by the menu page, the dish pop-up and the dine-in list.

import type { Diet } from "@/data/menu";

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;

export const dietLabels: Record<Diet, string> = {
  veg: "Vegetarian",
  nonveg: "Non-vegetarian",
  both: "Vegetarian or non-vegetarian",
};

/** The familiar Indian food marks: a green dot (vegetarian) or brown triangle (non-vegetarian) in a square. */
export function DietSymbol({ type }: { type: "veg" | "nonveg" }) {
  const color = type === "veg" ? "text-green-700" : "text-orange-800";
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 ${color}`} aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {type === "veg" ? <circle cx="8" cy="8" r="3.5" fill="currentColor" /> : <path d="M8 4.2 12 11.3H4Z" fill="currentColor" />}
    </svg>
  );
}

export function DietMark({ diet }: { diet?: Diet }) {
  if (!diet) return null;
  return (
    <span role="img" aria-label={dietLabels[diet]} title={dietLabels[diet]} className="inline-flex shrink-0 gap-1">
      {diet !== "nonveg" && <DietSymbol type="veg" />}
      {diet !== "veg" && <DietSymbol type="nonveg" />}
    </span>
  );
}
