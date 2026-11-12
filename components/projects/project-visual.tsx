import Image from "next/image";

import type { Project } from "@/lib/types";
import { cn, initials, isPlaceholder } from "@/lib/utils";

/** Project image, or a palette gradient with the project initials. */
export function ProjectVisual({
  project,
  title,
  className,
  sizes,
  priority = false,
}: {
  project: Project;
  title: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  if (project.image && !isPlaceholder(project.image)) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-muted", className)}>
        <Image src={project.image} alt="" fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
    );
  }

  const security = project.categories.includes("security");
  const mobile = project.categories.includes("mobile");
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        mobile
          ? "from-secondary-soft via-surface-muted to-surface"
          : security
            ? "from-primary-soft via-surface-muted to-surface"
            : "from-surface-muted via-surface-muted to-surface",
        className,
      )}
    >
      <div className="bg-grid absolute inset-0" />
      <span
        className={cn(
          "relative font-mono text-4xl font-bold tracking-tight",
          mobile ? "text-secondary-soft-foreground" : security ? "text-primary-soft-foreground" : "text-muted-foreground",
        )}
      >
        {initials(title)}
      </span>
    </div>
  );
}
