import Image from "next/image";
import { ArrowRight, GraduationCap, Languages, Layers, MapPin } from "lucide-react";

import type { SectionProps } from "@/components/sections/types";
import { CvButton } from "@/components/shared/cv-button";
import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";
import { cn, isPlaceholder } from "@/lib/utils";

export function Hero({ locale, t, profile, projectCount }: SectionProps & { profile: Profile; projectCount: number }) {
  const availability = profile.availability[locale];
  const facts = [
    { Icon: GraduationCap, label: t.hero.factSchool },
    { Icon: Layers, label: t.hero.factProjects(projectCount) },
    { Icon: Languages, label: t.hero.factLanguages },
  ];

  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-[72rem] items-center gap-12 px-4 pt-16 pb-20 sm:px-6 md:grid-cols-[1fr_auto] md:pt-24 md:pb-28">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-soft-foreground">
              <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
              {t.hero.openToWork}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              {profile.location[locale]}
            </span>
          </div>

          <h1 id="home-title" className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1] font-bold tracking-tight">
            {profile.fullName}
            <span className="mt-2 block text-primary">{profile.headline[locale]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{profile.subheadline[locale]}</p>
          <p className={cn("mt-3 text-sm font-medium", isPlaceholder(availability) && "text-danger")}>
            {availability}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CvButton cv={profile.cv} size="lg" />
            <Button asChild size="lg" variant="outline">
              <a href="#contact">
                {t.hero.contactMe}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          <SocialLinks
            profile={profile}
            label={t.hero.socialLabel}
            newTabLabel={t.common.opensInNewTab}
            className="mt-6 -ml-2"
          />

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t pt-6 text-sm text-muted-foreground">
            {facts.map(({ Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-56 sm:w-64 md:w-72">
          <div aria-hidden="true" className="absolute -inset-3 rounded-3xl border border-primary/25" />
          <Image
            src={profile.photo}
            alt={t.hero.photoAlt(profile.fullName)}
            width={460}
            height={460}
            sizes="(min-width: 768px) 288px, (min-width: 640px) 256px, 224px"
            priority
            className="relative aspect-square w-full rounded-2xl border bg-surface object-cover"
          />
        </div>
      </div>
    </section>
  );
}
