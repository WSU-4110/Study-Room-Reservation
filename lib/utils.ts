import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind and conditional class names.
 * Used throughout all shadcn/ui and Study Buddy components.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
