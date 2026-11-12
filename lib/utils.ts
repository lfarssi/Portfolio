import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PLACEHOLDER_RE = /\{\{[^}]*\}\}/;

/** True when a value still contains an unfilled `{{...}}` placeholder. */
export function isPlaceholder(value: unknown): boolean {
  return typeof value === "string" && PLACEHOLDER_RE.test(value);
}

/** Returns the URL only when it is set and not a placeholder. */
export function usableUrl(value: string | undefined | null): string | undefined {
  if (!value || isPlaceholder(value)) return undefined;
  return value;
}

export function initials(text: string): string {
  return text
    .replace(PLACEHOLDER_RE, "")
    .split(/[\s\-_/:]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("") || "?";
}
