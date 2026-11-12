"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import type { Profile } from "@/lib/types";

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

  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={cv[locale]} download hrefLang={locale}>
        <Download aria-hidden="true" />
        {t.common.downloadCv}
      </a>
    </Button>
  );
}
