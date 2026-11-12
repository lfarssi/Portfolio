"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";
import { projectCategories } from "@/lib/schema";
import type { Project, ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

function isCategory(value: string | null): value is ProjectCategory {
  return projectCategories.includes(value as ProjectCategory);
}

/** Gallery with category tabs and search, both mirrored in the query string. */
export function ProjectFilters({
  projects,
  categories,
  draftSlugs,
}: {
  projects: Project[];
  categories: ProjectCategory[];
  draftSlugs: string[];
}) {
  const { locale, t } = useLanguage();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get("category");
  const category = isCategory(rawCategory) ? rawCategory : null;
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  function update(next: { category?: ProjectCategory | null; q?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextCategory = next.category === undefined ? category : next.category;
    const nextQuery = next.q === undefined ? query : next.q;
    if (nextCategory) params.set("category", nextCategory);
    else params.delete("category");
    if (nextQuery.trim()) params.set("q", nextQuery);
    else params.delete("q");
    if (next.q !== undefined) setQuery(next.q);
    const search = params.toString();
    // Shallow URL update: Next.js syncs useSearchParams without a server round-trip.
    window.history.replaceState(null, "", search ? `${pathname}?${search}` : pathname);
  }

  const needle = query.trim().toLowerCase();
  const filtered = projects.filter((project) => {
    if (category && !project.categories.includes(category)) return false;
    if (!needle) return true;
    const haystack = [project.title.en, project.title.fr, ...project.technologies].join(" ").toLowerCase();
    return haystack.includes(needle);
  });

  const tabs: { value: ProjectCategory | null; label: string }[] = [
    { value: null, label: t.projects.all },
    ...categories.map((value) => ({ value, label: t.projects.categories[value] })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={t.projects.filterLabel} className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {tabs.map((tab) => {
              const selected = tab.value === category;
              return (
                <button
                  key={tab.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => update({ category: tab.value })}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-surface text-muted-foreground hover:border-primary hover:text-primary",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="project-search" className="sr-only">
            {t.projects.searchLabel}
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => update({ q: event.target.value })}
            placeholder={t.projects.searchPlaceholder}
            maxLength={80}
            className="pl-9"
          />
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-muted-foreground" aria-live="polite">
        {t.projects.resultCount(filtered.length)} · {t.projects.sortedByDate}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.slug}>
              <ProjectCard
                project={project}
                locale={locale}
                t={t}
                headingLevel="h2"
                isDraft={draftSlugs.includes(project.slug)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed p-10 text-center">
          <p className="text-muted-foreground">{t.projects.empty}</p>
          <Button variant="outline" className="mt-4" onClick={() => update({ category: null, q: "" })}>
            {t.projects.resetFilters}
          </Button>
        </div>
      )}
    </div>
  );
}
