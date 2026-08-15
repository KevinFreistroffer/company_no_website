export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function cleanBusinessName(name: string): string {
  return name
    .replace(/\s*\((?:listed on review aggregators as|also listed as)[^)]*\)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function businessSlug(name: string, city: string, state: string): string {
  return slugify(`${cleanBusinessName(name)} ${city} ${state}`);
}

export function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
