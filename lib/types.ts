export const DAYS = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const;

export type DayKey = (typeof DAYS)[number];

export const TEMPLATES = [
  "food",
  "salon",
  "auto",
  "retail",
  "studio",
  "laundry",
  "thrift",
  "trade",
] as const;

export type TemplateId = (typeof TEMPLATES)[number];

export type DayHours = {
  day: DayKey;
  open: string | null;
  close: string | null;
};

export type SourceLink = {
  label: string;
  url: string;
};

export type Theme = {
  primary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  heroImage: string;
  font: "serif" | "sans" | "display";
};

export type Business = {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  template: TemplateId;
  address: string;
  city: string;
  state: string;
  phone: string | null;
  mapsUrl: string;
  tagline: string;
  about: string;
  services: string[];
  hours: DayHours[] | null;
  highlights: string[];
  sources: SourceLink[];
  suggestedDomains: string[];
  theme: Theme;
  paymentNotes: string | null;
  established: string | null;
  notes: string;
};

export type CsvRow = {
  name: string;
  category: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  mapsUrl: string;
  notes: string;
  sourceFile: string;
};

export type Enrichment = {
  slug: string;
  tagline?: string;
  about?: string;
  services?: string[];
  hours?: DayHours[] | null;
  highlights?: string[];
  sources?: SourceLink[];
  suggestedDomains?: string[];
  paymentNotes?: string | null;
  established?: string | null;
};
