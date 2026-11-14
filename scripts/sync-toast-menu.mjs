// Copies the restaurant's menu from Toast into src/data/toast-menu.json, which the menu page reads.
// Runs in GitHub Actions (.github/workflows/pages.yml) with read-only Standard API access credentials
// stored as repository secrets:
//
//   TOAST_CLIENT_ID, TOAST_CLIENT_SECRET, TOAST_RESTAURANT_GUID   required
//   TOAST_API_HOSTNAME                                            optional, default https://ws-api.toasttab.com
//
// Without them it changes nothing, so the site still builds from the menu in src/data/menu.ts.
// Only dishes shown on Toast online ordering are copied; nothing secret is written or printed.

import { appendFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FORMAT_VERSION = 1; // bump when the shape of toast-menu.json changes
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "src", "data", "toast-menu.json");

const clientId = process.env.TOAST_CLIENT_ID?.trim();
const clientSecret = process.env.TOAST_CLIENT_SECRET?.trim();
const restaurantGuid = process.env.TOAST_RESTAURANT_GUID?.trim();
const host = (process.env.TOAST_API_HOSTNAME?.trim() || "https://ws-api.toasttab.com").replace(/\/+$/, "");

/** Tells the workflow whether the menu changed (step output "changed"). */
async function report(changed) {
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
}

if (!clientId || !clientSecret || !restaurantGuid) {
  console.log("Toast credentials aren't set, so the menu stays as it is.");
  await report(false);
  process.exit(0);
}

async function toast(pathname, init = {}) {
  const response = await fetch(`${host}${pathname}`, init);
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    throw new Error(`Toast ${pathname} answered HTTP ${response.status}: ${detail}`);
  }
  return response.json();
}

// 1. Sign in (OAuth client credentials).
const login = await toast("/authentication/v1/authentication/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ clientId, clientSecret, userAccessType: "TOAST_MACHINE_CLIENT" }),
});
const accessToken = login?.token?.accessToken;
if (!accessToken) throw new Error("Toast sign-in didn't return an access token.");
const headers = { Authorization: `Bearer ${accessToken}`, "Toast-Restaurant-External-ID": restaurantGuid };

// 2. Skip the full download when Toast says the menu hasn't been republished.
const current = await readFile(outFile, "utf8")
  .then(JSON.parse)
  .catch(() => null);
const { lastUpdated } = await toast("/menus/v2/metadata", { headers });
if (current?.version === FORMAT_VERSION && current?.lastUpdated === lastUpdated) {
  console.log(`Menu unchanged since ${lastUpdated}.`);
  await report(false);
  process.exit(0);
}

// 3. Download and keep what guests can order online.
const restaurant = await toast("/menus/v2/menus", { headers });
const onlineVisible = (entity) => !Array.isArray(entity.visibility) || entity.visibility.includes("TOAST_ONLINE_ORDERING");
const text = (value) => (typeof value === "string" ? value.trim() : "");

function toItem(item) {
  const image = item.image || item.images?.[0] || null;
  return {
    guid: item.guid,
    name: text(item.name),
    description: text(item.description),
    price: Number.isFinite(item.price) && item.price > 0 ? item.price : null,
    image,
    tags: (item.itemTags ?? []).map((tag) => text(tag.name)).filter(Boolean),
  };
}

/** Menu groups can nest; each group that holds dishes becomes one section. */
function collectGroups(groups, out) {
  for (const group of groups ?? []) {
    if (!onlineVisible(group)) continue;
    const items = (group.menuItems ?? [])
      .filter((item) => onlineVisible(item) && !item.isDeferred && text(item.name))
      .map(toItem);
    if (items.length) out.push({ name: text(group.name), items });
    collectGroups(group.menuGroups, out);
  }
  return out;
}

const menus = (restaurant.menus ?? [])
  .filter(onlineVisible)
  .map((menu) => ({ name: text(menu.name), groups: collectGroups(menu.menuGroups, []) }))
  .filter((menu) => menu.groups.length);

const dishCount = menus.reduce((sum, menu) => sum + menu.groups.reduce((n, group) => n + group.items.length, 0), 0);
if (dishCount < 5) {
  // Something is off (wrong location, nothing published online): keep the menu the site already has.
  throw new Error(`Toast returned only ${dishCount} online dishes; leaving the website menu unchanged.`);
}

// 4. Save, and say what came across.
// lastUpdated comes from the metadata call above, so step 2 compares like with like next time.
const next = `${JSON.stringify({ version: FORMAT_VERSION, lastUpdated, menus }, null, 2)}\n`;
const changed = next !== (await readFile(outFile, "utf8").catch(() => ""));
if (changed) await writeFile(outFile, next);

console.log(`Toast menu ${changed ? "updated" : "unchanged"}: ${dishCount} dishes.`);
for (const menu of menus) {
  console.log(`  ${menu.name}: ${menu.groups.map((group) => `${group.name} (${group.items.length})`).join(", ")}`);
}
await report(changed);
