import rawContent from "@/data/content.json";
import { contentSchema } from "@/lib/schema";
import type { Content, Locale, Localized, Project, ProjectCategory } from "@/lib/types";
import { isPlaceholder, usableUrl } from "@/lib/utils";

// Validated once at module load: a malformed entry fails `next build`.
const parsed = contentSchema.safeParse(rawContent);
if (!parsed.success) {
  throw new Error(`data/content.json is invalid:\n${parsed.error.message}`);
}

export const content: Content = parsed.data;

/** Drafts (projects whose title is still a placeholder) never render in production. */
export const showDrafts = process.env.NODE_ENV !== "production";

export function isDraftProject(project: Project): boolean {
  return isPlaceholder(project.title.en) || isPlaceholder(project.title.fr);
}

export function getProfile() {
  return content.profile;
}

/** Projects visible in this environment, newest first (unconfirmed dates last). */
export function getProjects(): Project[] {
  return content.projects
    .filter((project) => showDrafts || !isDraftProject(project))
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const aDate = isPlaceholder(a.project.date) ? "" : a.project.date;
      const bDate = isPlaceholder(b.project.date) ? "" : b.project.date;
      if (aDate !== bDate) return bDate.localeCompare(aDate);
      return a.index - b.index;
    })
    .map(({ project }) => project);
}

const FEATURED_COUNT = 6;

/** Featured projects in content.json order, topped up to six when drafts are hidden. */
export function getFeaturedProjects(): Project[] {
  const visible = content.projects.filter(
    (project) => showDrafts || !isDraftProject(project),
  );
  const featured = visible.filter((project) => project.isFeatured);
  const rest = visible.filter((project) => !project.isFeatured);
  return [...featured, ...rest].slice(0, FEATURED_COUNT);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}

export function getProjectCategories(): ProjectCategory[] {
  const used = new Set(getProjects().flatMap((project) => project.categories));
  const order: ProjectCategory[] = ["security", "mobile", "fullStack", "backEnd", "frontEnd", "systems"];
  return order.filter((category) => used.has(category));
}

/** Raw README URL: explicit `readmeUrl`, or derived from a real GitHub repo URL. */
export function getReadmeUrl(project: Project): string | undefined {
  const explicit = usableUrl(project.readmeUrl);
  if (explicit) return explicit;
  const github = usableUrl(project.github);
  const match = github?.match(/^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)\/?$/);
  if (!match) return undefined;
  return `https://raw.githubusercontent.com/${match[1]}/${match[2]}/HEAD/README.md`;
}

export function localize(value: Localized, locale: Locale): string {
  return value[locale];
}
