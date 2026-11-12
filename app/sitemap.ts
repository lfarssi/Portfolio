import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/env";
import { isPlaceholder } from "@/lib/utils";

/** Routes that exist in app/. Every sitemap URL must match one of them. */
const ROUTE_PATTERNS = [/^\/$/, /^\/projects$/, /^\/projects\/[a-z0-9]+(-[a-z0-9]+)*$/];

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects();
  const knownSlugs = new Set(projects.map((project) => project.slug));

  const entries: { path: string; lastModified?: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/projects", priority: 0.8 },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      lastModified: isPlaceholder(project.date) ? undefined : project.date,
      priority: 0.6,
    })),
  ];

  // Build-time assertion: fail the build if a URL would not resolve to a real page.
  for (const { path } of entries) {
    const slug = path.startsWith("/projects/") ? path.slice("/projects/".length) : null;
    const valid = ROUTE_PATTERNS.some((pattern) => pattern.test(path)) && (slug === null || knownSlugs.has(slug));
    if (!valid) throw new Error(`sitemap: "${path}" does not map to an existing route`);
  }

  return entries.map(({ path, lastModified, priority }) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    ...(lastModified ? { lastModified } : {}),
    priority,
  }));
}
