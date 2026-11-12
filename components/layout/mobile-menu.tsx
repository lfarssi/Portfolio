"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { navItems, type NavId } from "@/components/layout/nav-items";
import { CvButton } from "@/components/shared/cv-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MobileMenu({ active, cv, name }: { active: NavId | null; cv: Profile["cv"]; name: string }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={t.nav.menu}>
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={t.nav.closeMenu}>
        <SheetTitle className="font-semibold">{name}</SheetTitle>
        <SheetDescription className="sr-only">{t.nav.primary}</SheetDescription>
        <nav aria-label={t.nav.primary} className="mt-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-surface-muted",
                    active === item.id ? "text-primary" : "text-foreground",
                  )}
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <CvButton cv={cv} className="mt-auto w-full" />
      </SheetContent>
    </Sheet>
  );
}
