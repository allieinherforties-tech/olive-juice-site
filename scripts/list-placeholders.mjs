// Lists every unfilled placeholder in the site copy so nothing ships un-swapped.
// Usage: npm run placeholders   (exits 1 if any remain, so CI can gate on it later)
import { readFileSync } from "node:fs";

const file = new URL("../src/content/site.ts", import.meta.url);
const source = readFileSync(file, "utf8");
const block = source.match(/export const PLACEHOLDERS = \{([\s\S]*?)\} as const;/);
if (!block) {
  console.error("Could not find the PLACEHOLDERS block in src/content/site.ts");
  process.exit(2);
}

const remaining = [...block[1].matchAll(/(\w+):\s*"(\[[^\]]+\])"/g)].map(([, key, value]) => ({ key, value }));

if (remaining.length === 0) {
  console.log("No placeholders remain.");
  process.exit(0);
}

console.log("Placeholders still showing on the live site (edit src/content/site.ts):");
for (const { key, value } of remaining) console.log(`  - PLACEHOLDERS.${key} = ${value}`);
process.exit(1);
