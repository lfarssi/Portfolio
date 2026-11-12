import { ExternalLink, Store } from "lucide-react";

import { GithubIcon } from "@/components/shared/brand-icons";
import type { Dictionary } from "@/lib/i18n";
import type { Project } from "@/lib/types";
import { usableUrl } from "@/lib/utils";

export function ProjectLinks({ project, t, title }: { project: Project; t: Dictionary; title: string }) {
  const links = [
    { href: usableUrl(project.github), label: t.projects.github, Icon: GithubIcon },
    { href: usableUrl(project.demo), label: t.projects.demo, Icon: ExternalLink },
    { href: usableUrl(project.storeUrl), label: t.projects.store, Icon: Store },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href));

  if (links.length === 0) return null;

  return (
    <ul className="relative z-10 flex items-center gap-1">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label}: ${title} ${t.common.opensInNewTab}`}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-muted hover:text-primary"
          >
            <Icon className="size-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
