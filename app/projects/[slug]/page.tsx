import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, Store, User, Users } from "lucide-react";

import { CategoryChip } from "@/components/projects/category-chip";
import { ProjectReadme } from "@/components/projects/project-readme";
import { ProjectVisual } from "@/components/projects/project-visual";
import { SecurityNotes } from "@/components/projects/security-notes";
import { GithubIcon } from "@/components/shared/brand-icons";
import { JsonLd } from "@/components/shared/json-ld";
import { TechChip } from "@/components/shared/tech-chip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdjacentProjects, getProjectBySlug, getProjects, getReadmeUrls, isDraftProject } from "@/lib/content";
import { formatMonth } from "@/lib/i18n";
import { getI18n } from "@/lib/locale";
import { projectJsonLd } from "@/lib/seo";
import { cn, isPlaceholder, usableUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const { locale } = await getI18n();
  const title = project.title[locale];
  const description = project.summary[locale];
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { type: "article", title, description, url: `/projects/${project.slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { locale, t } = await getI18n();
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const { previous, next } = getAdjacentProjects(slug);
  const title = project.title[locale];
  const github = usableUrl(project.github);
  const readmeUrls = getReadmeUrls(project);

  const meta = [
    { Icon: Calendar, label: t.projects.date, value: formatMonth(project.date, locale) },
    { Icon: User, label: t.projects.role, value: project.role[locale] },
    { Icon: Users, label: t.projects.teamSize, value: t.projects.teamOf(project.teamSize) },
  ];
  const links = [
    { href: github, label: t.projects.github, Icon: GithubIcon },
    { href: usableUrl(project.demo), label: t.projects.demo, Icon: ExternalLink },
    { href: usableUrl(project.storeUrl), label: t.projects.store, Icon: Store },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href));

  return (
    <article className="mx-auto w-full max-w-[56rem] px-4 py-12 sm:px-6 md:py-16">
      <JsonLd data={projectJsonLd(project, locale)} nonce={nonce} />

      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t.projects.allProjects}
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap gap-2">
          {project.categories.map((category) => (
            <CategoryChip key={category} category={category} t={t} />
          ))}
          {isDraftProject(project) ? <Badge variant="warning">{t.projects.draft}</Badge> : null}
        </div>
        <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-tight font-bold tracking-tight">{title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{project.summary[locale]}</p>

        <dl className="mt-6 grid gap-4 border-y py-4 sm:grid-cols-3">
          {meta.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className={cn("text-sm font-medium", isPlaceholder(value) && "text-danger")}>{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        {links.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {links.map(({ href, label, Icon }, index) => (
              <Button key={label} asChild variant={index === 0 ? "default" : "outline"}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon aria-hidden="true" />
                  {label}
                  <span className="sr-only">{t.common.opensInNewTab}</span>
                </a>
              </Button>
            ))}
          </div>
        ) : null}
      </header>

      <ProjectVisual
        project={project}
        title={title}
        priority
        sizes="(min-width: 896px) 848px, 100vw"
        className="mt-10 aspect-[2/1] rounded-xl border"
      />

      <div className="mt-10 space-y-10">
        <p className="text-lg leading-8">{project.description[locale]}</p>

        <section aria-labelledby="highlights-title">
          <h2 id="highlights-title" className="text-xl font-semibold">
            {t.projects.highlights}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 marker:text-primary">
            {project.highlights[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {project.securityNotes ? (
          <SecurityNotes title={t.projects.securityConsiderations} notes={project.securityNotes[locale]} />
        ) : null}

        <section aria-labelledby="technologies-title">
          <h2 id="technologies-title" className="text-xl font-semibold">
            {t.projects.technologies}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <TechChip className="text-sm">{tech}</TechChip>
              </li>
            ))}
          </ul>
        </section>

        {readmeUrls.length > 0 ? (
          <Suspense fallback={<div className="h-40 animate-pulse rounded-xl border bg-surface-muted" />}>
            <ProjectReadme readmeUrls={readmeUrls} repoUrl={github} title={t.projects.readme} />
          </Suspense>
        ) : null}
      </div>

      <nav aria-label={t.projects.allProjects} className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/projects/${previous.slug}`}
            className="group rounded-xl border bg-surface p-4 transition-colors hover:border-primary"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              {t.projects.previous}
            </span>
            <span className="mt-1 block font-medium group-hover:text-primary">{previous.title[locale]}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-xl border bg-surface p-4 text-right transition-colors hover:border-primary"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              {t.projects.next}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
            <span className="mt-1 block font-medium group-hover:text-primary">{next.title[locale]}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
