"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const next = locale === "en" ? "fr" : "en";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(next)}
      aria-label={t.common.language.switchTo}
      lang={next}
      className="font-mono text-xs tracking-wider"
    >
      <span aria-hidden="true">
        <span className={locale === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
        <span className="text-muted-foreground"> / </span>
        <span className={locale === "fr" ? "text-primary" : "text-muted-foreground"}>FR</span>
      </span>
    </Button>
  );
}
