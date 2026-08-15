import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadBusinessesFromCsv } from "../lib/loadFromCsv";

const businesses = loadBusinessesFromCsv();
const output = join(process.cwd(), "data", "catalog.json");
writeFileSync(output, `${JSON.stringify(businesses, null, 2)}\n`);
console.log(`Wrote ${businesses.length} businesses to ${output}`);
