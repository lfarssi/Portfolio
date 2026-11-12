import { formatMonth, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function formatPeriod(start: string, end: string, locale: Locale, t: Dictionary): string {
  const from = formatMonth(start, locale);
  const to = end ? formatMonth(end, locale) : t.common.present;
  return from === to ? from : `${from} - ${to}`;
}
