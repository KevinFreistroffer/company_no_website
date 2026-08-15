import { slugify } from "@/lib/slug";

function compact(value: string): string {
  return slugify(value).replace(/-/g, "");
}

export function suggestDomains(name: string, city: string, state: string): string[] {
  const base = compact(name).slice(0, 24);
  const cityPart = compact(city).slice(0, 16);
  const shortName = slugify(name).split("-").slice(0, 2).join("");
  const unique = new Set<string>([
    `${base}.com`,
    `${base}${cityPart}.com`,
    `${shortName}${state.toLowerCase()}.com`,
  ]);
  return [...unique];
}

export function formatPhone(phone: string | null): string | null {
  if (!phone) {
    return null;
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}
