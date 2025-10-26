import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function fetcher(...args: Parameters<typeof fetch>) {
	return await fetch(...args).then((response) => response.json());
}
