import type { CsvRow } from "@/lib/types";

export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const input = text
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const header = (rows[0] ?? []).map((cell) => cell.trim());
  return rows
    .slice(1)
    .filter((cells) => cells.some((cell) => cell.trim().length > 0))
    .map((cells) => {
      const record: Record<string, string> = {};
      header.forEach((key, index) => {
        record[key] = (cells[index] ?? "").trim();
      });
      return record;
    });
}

function normalizePhone(value: string): string {
  return value.replace(/^"+|"+$/g, "").trim();
}

export function toCsvRow(
  record: Record<string, string>,
  sourceFile: string,
): CsvRow {
  return {
    name: record.business_name ?? "",
    category: record.category ?? "",
    address: record.address ?? "",
    city: record.city ?? "",
    state: record.state ?? "",
    phone: normalizePhone(record.phone ?? ""),
    mapsUrl: record.maps_url || record.google_maps_url || "",
    notes: record.notes ?? "",
    sourceFile,
  };
}

export function dedupeKey(row: CsvRow): string {
  return [
    row.name.toLowerCase().replace(/\s+/g, " "),
    row.city.toLowerCase(),
    row.state.toLowerCase(),
  ].join("|");
}

export function mergeCsvSources(groups: { text: string; sourceFile: string }[]): CsvRow[] {
  const byKey = new Map<string, CsvRow>();
  for (const group of groups) {
    for (const record of parseCsv(group.text)) {
      const row = toCsvRow(record, group.sourceFile);
      if (!row.name) {
        continue;
      }
      const key = dedupeKey(row);
      const existing = byKey.get(key);
      if (!existing) {
        byKey.set(key, row);
        continue;
      }
      if (group.sourceFile.includes("master")) {
        byKey.set(key, row);
      }
    }
  }
  return [...byKey.values()];
}
