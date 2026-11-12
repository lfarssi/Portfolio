"use client";

import { useEffect, useState } from "react";

import { navItems, type NavId } from "@/components/layout/nav-items";

/** Tracks which home section is in view. Off the home page, "projects" is active. */
export function useActiveSection(isHome: boolean): NavId | null {
  const [active, setActive] = useState<NavId | null>("home");

  useEffect(() => {
    if (!isHome) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        const current = navItems.find((item) => visible.has(item.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const item of navItems) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [isHome]);

  return isHome ? active : "projects";
}
