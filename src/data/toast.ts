/** Shape of src/data/toast-menu.json, written by scripts/sync-toast-menu.mjs. */
export type ToastMenuFile = {
  version: number;
  /** When the menu was last published in Toast. */
  lastUpdated: string | null;
  menus: ToastMenu[];
};

export type ToastMenu = { name: string; groups: ToastGroup[] };

export type ToastGroup = { name: string; items: ToastItem[] };

export type ToastItem = {
  guid: string;
  name: string;
  description: string;
  /** Null when the dish is priced by size or option. */
  price: number | null;
  /** Photo uploaded in Toast, if any. */
  image: string | null;
  /** Toast item tags, e.g. "Vegetarian". */
  tags: string[];
};
