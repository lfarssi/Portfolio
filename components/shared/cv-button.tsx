"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import type { Profile } from "@/lib/types";

// Set at build time in next.config.ts from the files present in public/cv.
const available: { en: boolean; fr: boolean } = JSON.parse(
  process.env.NEXT_PUBLIC_CV_AVAILABLE ?? '{"en":false,"fr":false}',
);

export function CvButton({
  cv,
  size = "default",
  variant = "default",
  className,
}: {
  cv: Profile["cv"];
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  className?: string;
}) {
  const { locale, t } = useLanguage();
  const fallback = locale === "en" ? "fr" : "en";
  const target = available[locale] ? locale : available[fallback] ? fallback : null;

  if (!target) {
    return (
      <Button size={size} variant={variant} className={className} disabled>
        <Download aria-hidden="true" />
        {t.common.cvSoon}
      </Button>
    );
  }

  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={cv[target]} download hrefLang={target}>
        <Download aria-hidden="true" />
        {t.common.downloadCv}
        {target !== locale ? <span className="font-mono text-xs">({target.toUpperCase()})</span> : null}
      </a>
    </Button>
  );
}
