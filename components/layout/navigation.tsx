"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { navItems } from "@/components/layout/nav-items";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useActiveSection } from "@/components/layout/use-active-section";
import { CvButton } from "@/components/shared/cv-button";
import { useLanguage } from "@/contexts/language-context";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Navigation({ name, initials, cv }: { name: string; initials: string; cv: Profile["cv"] }) {
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-[72rem] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-md font-semibold" aria-label={`${name}, ${t.nav.home}`}>
          <span
            aria-hidden="true"
            className="inline-flex size-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground"
          >
            {initials}
          </span>
          <span className="hidden sm:inline">{name}</span>
        </Link>

        <nav aria-label={t.nav.primary} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    active === item.id ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <CvButton cv={cv} size="sm" className="ml-2 hidden lg:inline-flex" />
          <MobileMenu active={active} cv={cv} name={name} />
        </div>
      </div>
    </header>
  );
}
