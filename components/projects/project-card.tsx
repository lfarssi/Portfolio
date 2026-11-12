import Link from "next/link";
import { Users } from "lucide-react";

import { CategoryChip } from "@/components/projects/category-chip";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectVisual } from "@/components/projects/project-visual";
import { TechChip } from "@/components/shared/tech-chip";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n";
import type { Locale, Project } from "@/lib/types";
import { isPlaceholder } from "@/lib/utils";

export function ProjectCard({
  project,
  locale,
  t,
  headingLevel = "h3",
  isDraft = false,
}: {
  project: Project;
  locale: Locale;
  t: Dictionary;
  headingLevel?: "h2" | "h3";
  isDraft?: boolean;
}) {
  const Heading = headingLevel;
  const title = project.title[locale];
  const mainCategory =
    project.categories.find((category) => category === "security" || category === "mobile") ?? project.categories[0];

  return (
    <Card interactive className="group relative flex h-full flex-col overflow-hidden">
      <ProjectVisual
        project={project}
        title={title}
        className="aspect-[16/9] border-b"
        sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {mainCategory ? <CategoryChip category={mainCategory} t={t} /> : null}
          {isDraft ? <Badge variant="warning">{t.projects.draft}</Badge> : null}
        </div>
        <Heading className="mt-3 text-lg leading-snug font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] group-hover:text-primary"
          >
            {title}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{project.summary[locale]}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.projects.technologies}>
          {project.technologies.slice(0, 4).map((tech) => (
            <li key={tech}>
              <TechChip>{tech}</TechChip>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
          <span
            className={
              isPlaceholder(project.teamSize)
                ? "inline-flex items-center gap-1.5 font-mono text-xs text-danger"
                : "inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
            }
          >
            <Users className="size-4" aria-hidden="true" />
            <span className="sr-only">{t.projects.teamSize}: </span>
            {t.projects.teamOf(project.teamSize)}
          </span>
          <ProjectLinks project={project} t={t} title={title} />
        </div>
      </div>
    </Card>
  );
}
