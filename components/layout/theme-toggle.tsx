"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

const order = ["system", "light", "dark"] as const;
type ThemeChoice = (typeof order)[number];

const subscribe = () => () => {};

/** Cycles system, light, dark. Renders a neutral icon until mounted. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const current: ThemeChoice = mounted && order.includes(theme as ThemeChoice) ? (theme as ThemeChoice) : "system";
  const next = order[(order.indexOf(current) + 1) % order.length] ?? "system";
  const Icon = current === "light" ? Sun : current === "dark" ? Moon : Monitor;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(next)}
      aria-label={`${t.common.theme.toggle}: ${t.common.theme[current]} → ${t.common.theme[next]}`}
      title={`${t.common.theme.toggle} (${t.common.theme[current]})`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </Button>
  );
}
