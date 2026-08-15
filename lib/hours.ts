import { DAYS, type DayHours, type DayKey } from "@/lib/types";

const LABELS: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export function dayLabel(day: DayKey): string {
  return LABELS[day];
}

export function formatClock(value: string | null): string {
  if (!value) {
    return "Closed";
  }
  const [hourPart, minutePart] = value.split(":");
  const hour = Number(hourPart);
  const minute = minutePart ?? "00";
  const suffix = hour >= 12 ? "PM" : "AM";
  const twelve = hour % 12 || 12;
  return minute === "00" ? `${twelve} ${suffix}` : `${twelve}:${minute} ${suffix}`;
}

export function formatDayHours(entry: DayHours): string {
  if (!entry.open || !entry.close) {
    return "Closed";
  }
  return `${formatClock(entry.open)} – ${formatClock(entry.close)}`;
}

export function everyDay(open: string, close: string): DayHours[] {
  return DAYS.map((day) => ({ day, open, close }));
}

export function weekdays(
  open: string,
  close: string,
  saturday: { open: string; close: string } | null = null,
  sunday: { open: string; close: string } | null = null,
): DayHours[] {
  return DAYS.map((day) => {
    if (day === "sat") {
      return { day, open: saturday?.open ?? null, close: saturday?.close ?? null };
    }
    if (day === "sun") {
      return { day, open: sunday?.open ?? null, close: sunday?.close ?? null };
    }
    return { day, open, close };
  });
}

export function orderedHours(hours: DayHours[]): DayHours[] {
  const byDay = new Map(hours.map((entry) => [entry.day, entry]));
  return DAYS.map((day) => byDay.get(day) ?? { day, open: null, close: null });
}
