import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/projects/project-card";
import type { SectionProps } from "@/components/sections/types";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";

export function FeaturedProjects({
  locale,
  t,
  projects,
  isDraft,
}: SectionProps & { projects: Project[]; isDraft: (project: Project) => boolean }) {
  return (
    <Section id="projects" muted>
      <SectionHeader id="projects-title" {...t.sections.projects} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Reveal as="li" key={project.slug}>
            <ProjectCard project={project} locale={locale} t={t} isDraft={isDraft(project)} />
          </Reveal>
        ))}
      </ul>
      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">
            {t.common.seeAll}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
