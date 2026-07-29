import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Deterministic pseudo-random in [0,1) from an integer seed (stable across SSR/CSR). */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 999.13 + 1.11) * 43758.5453;
  return x - Math.floor(x);
}

/** Format a number with thousands separators. */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}
