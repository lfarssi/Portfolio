import "server-only";
import { cookies, headers } from "next/headers";

import { defaultLocale, getDictionary, isLocale, LOCALE_COOKIE } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/** Locale from the cookie, then Accept-Language, then English. */
export async function getLocale(): Promise<Locale> {
  const cookieValue = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieValue)) return cookieValue;

  const accept = (await headers()).get("accept-language") ?? "";
  const preferred = accept.split(",")[0]?.trim().slice(0, 2).toLowerCase();
  return isLocale(preferred) ? preferred : defaultLocale;
}

export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: getDictionary(locale) };
}
