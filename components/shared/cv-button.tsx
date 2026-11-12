"use client";

import { Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import type { Profile } from "@/lib/types";

/** Opens the CV in a new tab by default; `download` saves the PDF instead. */
export function CvButton({
  cv,
  download = false,
  size = "default",
  variant = "default",
  className,
}: {
  cv: Profile["cv"];
  download?: boolean;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  className?: string;
}) {
  const { locale, t } = useLanguage();

  if (download) {
    return (
      <Button asChild size={size} variant={variant} className={className}>
        <a href={cv[locale]} download hrefLang={locale}>
          <Download aria-hidden="true" />
          {t.common.downloadCv}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={cv[locale]} target="_blank" rel="noopener noreferrer" hrefLang={locale}>
        <FileText aria-hidden="true" />
        {t.common.viewCv}
        <span className="sr-only">{t.common.opensInNewTab}</span>
      </a>
    </Button>
  );
}
