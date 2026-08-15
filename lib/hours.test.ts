import { describe, expect, it } from "vitest";
import { everyDay, formatClock, formatDayHours, orderedHours } from "@/lib/hours";

describe("hours formatting", () => {
  it("formats 24-hour clocks", () => {
    expect(formatClock("09:00")).toBe("9 AM");
    expect(formatClock("17:30")).toBe("5:30 PM");
    expect(formatClock(null)).toBe("Closed");
  });

  it("fills missing days as closed", () => {
    const ordered = orderedHours([{ day: "mon", open: "09:00", close: "17:00" }]);
    expect(ordered).toHaveLength(7);
    expect(formatDayHours(ordered[0]!)).toBe("9 AM – 5 PM");
    expect(formatDayHours(ordered[6]!)).toBe("Closed");
  });

  it("builds a full week of identical hours", () => {
    expect(everyDay("09:00", "20:00")).toHaveLength(7);
  });
});
