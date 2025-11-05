import {
  cn,
  getDurationInMinutes,
  isOverlap,
  formatTime,
  sanitizeInput
} from "../utils";

describe("Utility Functions", () => {
  test("cn() merges class names correctly", () => {
    expect(cn("text-sm", "text-center")).toBe("text-sm text-center");
    expect(cn("bg-red-500", false && "text-lg", "p-4")).toBe("bg-red-500 p-4");
  });


  test("getDurationInMinutes() returns correct duration", () => {
    const start = new Date("2025-01-01T10:00:00");
    const end = new Date("2025-01-01T11:30:00");
    expect(getDurationInMinutes(start, end)).toBe(90);
  });

  test("getDurationInMinutes() throws error if end is before start", () => {
    const start = new Date("2025-01-01T11:30:00");
    const end = new Date("2025-01-01T10:00:00");
    expect(() => getDurationInMinutes(start, end)).toThrow(
      "End time must be after start time"
    );
  });

  test("isOverlap() correctly detects overlapping times", () => {
    const aStart = new Date("2025-01-01T10:00:00");
    const aEnd = new Date("2025-01-01T11:00:00");
    const bStart = new Date("2025-01-01T10:30:00");
    const bEnd = new Date("2025-01-01T11:30:00");
    expect(isOverlap(aStart, aEnd, bStart, bEnd)).toBe(true);
  });

  test("isOverlap() returns false if times do not overlap", () => {
    const aStart = new Date("2025-01-01T12:00:00");
    const aEnd = new Date("2025-01-01T13:00:00");
    const bStart = new Date("2025-01-01T13:00:00");
    const bEnd = new Date("2025-01-01T14:00:00");
    expect(isOverlap(aStart, aEnd, bStart, bEnd)).toBe(false);
  });

  test("formatTime() returns correct HH:MM format", () => {
    const date = new Date("2025-01-01T10:05:00");
    expect(formatTime(date)).toBe("10:05");
  });

  test("sanitizeInput() trims and normalizes whitespace", () => {
    expect(sanitizeInput("   hello   world   ")).toBe("hello world");
    expect(sanitizeInput("good   morning   everyone")).toBe("good morning everyone");
  });
});
