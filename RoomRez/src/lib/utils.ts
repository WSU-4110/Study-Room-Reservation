import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// Returns the duration in minutes between two Date objects
export function getDurationInMinutes(start: Date, end: Date): number {
  if (end < start) throw new Error("End time must be after start time");
  return Math.floor((end.getTime() - start.getTime()) / 60000);
}

// Returns whether two time intervals overlap
export function isOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 < end2 && start2 < end1;
}

// Formats a Date object into HH:MM (24-hour) format
export function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5);
}

// Sanitizes user input by trimming and removing extra whitespaces
export function sanitizeInput(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}
