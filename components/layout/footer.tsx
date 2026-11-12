import { SocialLinks } from "@/components/shared/social-links";
import type { Dictionary } from "@/lib/i18n";
import type { Profile } from "@/lib/types";

export function Footer({ profile, t }: { profile: Profile; t: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-sm">
          <p className="font-semibold">{profile.fullName}</p>
          <p className="text-muted-foreground">{t.footer.tagline}</p>
          <p className="font-mono text-xs text-muted-foreground">{t.footer.builtWith}</p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <SocialLinks profile={profile} label={t.hero.socialLabel} newTabLabel={t.common.opensInNewTab} />
          <p className="text-xs text-muted-foreground">
            © {year} {profile.fullName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
