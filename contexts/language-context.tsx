"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getDictionary, LOCALE_COOKIE, type Dictionary } from "@/lib/i18n";
import type { Locale, Localized } from "@/lib/types";

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  l: (value: Localized) => string;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback(
    (next: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax${
        location.protocol === "https:" ? "; secure" : ""
      }`;
      document.documentElement.lang = next;
      setLocaleState(next);
      // Server components re-render with the new cookie.
      router.refresh();
    },
    [router],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      t: getDictionary(locale),
      l: (localized) => localized[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
