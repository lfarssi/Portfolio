import { Suspense } from "react";
import type { Metadata } from "next";

import { ProjectFilters } from "@/components/projects/project-filters";
import { getProjectCategories, getProjects, isDraftProject } from "@/lib/content";
import { getI18n } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    title: t.meta.projectsTitle,
    description: t.meta.projectsDescription,
    alternates: { canonical: "/projects" },
    openGraph: { title: t.meta.projectsTitle, description: t.meta.projectsDescription, url: "/projects" },
  };
}

export default async function ProjectsPage() {
  const { t } = await getI18n();
  const projects = getProjects();

  return (
    <div className="mx-auto w-full max-w-[72rem] px-4 py-16 sm:px-6 md:py-20">
      <p className="font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
        <span aria-hidden="true">{"// "}</span>
        {t.sections.projects.eyebrow.replace(/^\d+\s*/, "")}
      </p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] leading-tight font-bold tracking-tight">
        {t.projects.allProjects}
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t.projects.pageIntro}</p>
      <div className="mt-10">
        <Suspense>
          <ProjectFilters
            projects={projects}
            categories={getProjectCategories()}
            draftSlugs={projects.filter(isDraftProject).map((project) => project.slug)}
          />
        </Suspense>
      </div>
    </div>
  );
}
