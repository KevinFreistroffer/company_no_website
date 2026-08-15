import { hashString } from "@/lib/slug";
import type { TemplateId, Theme } from "@/lib/types";

const HERO_IMAGES: Record<TemplateId, string[]> = {
  food: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  ],
  salon: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=80",
  ],
  auto: [
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=80",
  ],
  retail: [
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1513467535987-fd81bc7d4854?auto=format&fit=crop&w=1600&q=80",
  ],
  studio: [
    "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1568515045052-f9a854d247dc?auto=format&fit=crop&w=1600&q=80",
  ],
  laundry: [
    "https://images.unsplash.com/photo-1545173168-9f1942e9c305?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=1600&q=80",
  ],
  thrift: [
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1600&q=80",
  ],
  trade: [
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1600&q=80",
  ],
};

type Palette = Omit<Theme, "heroImage">;

const PALETTES: Record<TemplateId, Palette[]> = {
  food: [
    {
      primary: "#7a1f1f",
      accent: "#d4a017",
      background: "#fbf6ee",
      foreground: "#1c140f",
      muted: "#6b5344",
      font: "serif",
    },
    {
      primary: "#1f4d3a",
      accent: "#e07a3d",
      background: "#f4f1ea",
      foreground: "#14211c",
      muted: "#5c6b63",
      font: "serif",
    },
    {
      primary: "#24305e",
      accent: "#f76c6c",
      background: "#fff8f4",
      foreground: "#1b1b1b",
      muted: "#5a5a5a",
      font: "display",
    },
  ],
  salon: [
    {
      primary: "#4a3040",
      accent: "#c9a27c",
      background: "#faf7f4",
      foreground: "#2b1f24",
      muted: "#7a6a70",
      font: "serif",
    },
    {
      primary: "#2f3e46",
      accent: "#84a98c",
      background: "#f7fbf9",
      foreground: "#1a2428",
      muted: "#5c6b70",
      font: "sans",
    },
    {
      primary: "#5c4d7d",
      accent: "#e8b4bc",
      background: "#fff5f7",
      foreground: "#2a2230",
      muted: "#746a7a",
      font: "display",
    },
  ],
  auto: [
    {
      primary: "#1c1c1c",
      accent: "#f0c808",
      background: "#f3f3f0",
      foreground: "#111111",
      muted: "#5a5a5a",
      font: "sans",
    },
    {
      primary: "#0b3d91",
      accent: "#e63946",
      background: "#f5f7fa",
      foreground: "#102033",
      muted: "#4d5d73",
      font: "sans",
    },
    {
      primary: "#2b2d42",
      accent: "#ef8354",
      background: "#edf2f4",
      foreground: "#1a1a2e",
      muted: "#5c6373",
      font: "sans",
    },
  ],
  retail: [
    {
      primary: "#12355b",
      accent: "#e09f3e",
      background: "#f8f5f0",
      foreground: "#1b1b1b",
      muted: "#5b6570",
      font: "sans",
    },
    {
      primary: "#3d5a3d",
      accent: "#c45c26",
      background: "#f4efe6",
      foreground: "#1e241e",
      muted: "#667066",
      font: "serif",
    },
  ],
  studio: [
    {
      primary: "#111111",
      accent: "#e63946",
      background: "#161616",
      foreground: "#f5f5f5",
      muted: "#b0b0b0",
      font: "display",
    },
    {
      primary: "#0d0d0d",
      accent: "#7bed9f",
      background: "#121212",
      foreground: "#f7f7f7",
      muted: "#a8a8a8",
      font: "sans",
    },
  ],
  laundry: [
    {
      primary: "#1d4e89",
      accent: "#48cae4",
      background: "#f3f8fc",
      foreground: "#123047",
      muted: "#5b7386",
      font: "sans",
    },
    {
      primary: "#006d77",
      accent: "#ffddd2",
      background: "#edf6f9",
      foreground: "#083b40",
      muted: "#4f6f73",
      font: "sans",
    },
  ],
  thrift: [
    {
      primary: "#6d4c41",
      accent: "#d4a373",
      background: "#faf3e8",
      foreground: "#3e2723",
      muted: "#7a655c",
      font: "serif",
    },
    {
      primary: "#3d405b",
      accent: "#81b29a",
      background: "#f4f1de",
      foreground: "#2b2d42",
      muted: "#6b705c",
      font: "display",
    },
  ],
  trade: [
    {
      primary: "#1b4332",
      accent: "#d62828",
      background: "#f6f7f4",
      foreground: "#14261c",
      muted: "#4f6458",
      font: "sans",
    },
    {
      primary: "#023e8a",
      accent: "#fcbf49",
      background: "#f4f7fb",
      foreground: "#0b2545",
      muted: "#4d6275",
      font: "sans",
    },
  ],
};

export function themeFor(slug: string, template: TemplateId): Theme {
  const palettes = PALETTES[template];
  const images = HERO_IMAGES[template];
  const hash = hashString(slug);
  const palette = palettes[hash % palettes.length];
  const heroImage = images[hash % images.length];
  return { ...palette, heroImage };
}
