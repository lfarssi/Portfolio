import { Flag, Mail, Store, Target } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import type { Profile } from "@/lib/types";
import { cn, usableUrl } from "@/lib/utils";

type SocialLinksProps = {
  profile: Profile;
  label: string;
  newTabLabel: string;
  className?: string;
  includeEmail?: boolean;
};

export function SocialLinks({
  profile,
  label,
  newTabLabel,
  className,
  includeEmail = true,
}: SocialLinksProps) {
  const email = usableUrl(profile.email);
  const links = [
    { name: "GitHub", href: usableUrl(profile.socials.github), Icon: GithubIcon },
    { name: "LinkedIn", href: usableUrl(profile.socials.linkedin), Icon: LinkedinIcon },
    { name: "TryHackMe / Hack The Box", href: usableUrl(profile.socials.tryhackme), Icon: Target },
    { name: "Root-Me", href: usableUrl(profile.socials.rootme), Icon: Flag },
    { name: "Store", href: usableUrl(profile.socials.store), Icon: Store },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href));

  if (links.length === 0 && !(includeEmail && email)) return null;

  return (
    <ul aria-label={label} className={cn("flex flex-wrap items-center gap-1", className)}>
      {links.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} ${newTabLabel}`}
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-primary"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
      {includeEmail && email ? (
        <li>
          <a
            href={`mailto:${email}`}
            aria-label={`Email ${email}`}
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-primary"
          >
            <Mail className="size-5" aria-hidden="true" />
          </a>
        </li>
      ) : null}
    </ul>
  );
}
