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
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 size-72 animate-drift sm:size-[28rem] rounded-full bg-[var(--blob-a)] blur-3xl" />
        <div className="absolute top-20 -right-24 size-64 animate-drift-slow sm:size-[24rem] rounded-full bg-[var(--blob-b)] blur-3xl" />
        <div className="bg-grid absolute inset-0" />
      </div>
      <div className="relative mx-auto grid w-full max-w-[72rem] items-center gap-8 px-4 sm:gap-12 pt-8 pb-14 sm:px-6 sm:pt-16 sm:pb-20 md:grid-cols-[1fr_auto] md:pt-24 md:pb-28">
        <div className="max-w-2xl">
          <div className="flex animate-fade-up flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-soft-foreground">
              <span aria-hidden="true" className="relative inline-flex size-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary" />
                <span className="relative size-2 rounded-full bg-primary" />
              </span>
              {t.hero.openToWork}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              {profile.location[locale]}
            </span>
          </div>

          <h1 id="home-title" className="mt-4 animate-fade-up text-[clamp(1.85rem,5vw,3.75rem)] leading-[1.1] font-bold tracking-tight [animation-delay:80ms]">
            {profile.fullName}
            <span className="text-gradient mt-2 block pb-1">{profile.headline[locale]}</span>
          </h1>
          <p className="mt-4 max-w-xl animate-fade-up text-base text-muted-foreground sm:mt-6 sm:text-lg [animation-delay:160ms]">{profile.subheadline[locale]}</p>
          <p className={cn("mt-3 animate-fade-up text-sm font-medium [animation-delay:200ms]", isPlaceholder(availability) && "text-danger")}>
            {availability}
          </p>

          <div className="mt-6 grid animate-fade-up grid-cols-2 items-center gap-3 sm:mt-8 sm:flex sm:flex-wrap [animation-delay:260ms]">
            <CvButton cv={profile.cv} size="lg" className="h-10 px-3 text-sm sm:h-11 sm:px-6 sm:text-base" />
            <Button asChild size="lg" variant="outline" className="h-10 px-3 text-sm sm:h-11 sm:px-6 sm:text-base">
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
            className="mt-6 -ml-2 animate-fade-up [animation-delay:320ms]"
          />

          <ul className="mt-6 flex animate-fade-up flex-wrap gap-x-5 gap-y-2 border-t pt-5 text-xs sm:mt-8 sm:gap-x-6 sm:gap-y-3 sm:pt-6 sm:text-sm text-muted-foreground [animation-delay:380ms]">
            {facts.map(({ Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative order-first mx-auto w-40 animate-fade-up sm:w-64 md:order-none md:w-72 [animation-delay:200ms]">
          <div className="relative animate-float">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/30 via-transparent to-secondary-accent/25 blur-2xl"
          />
          <div aria-hidden="true" className="absolute -inset-3 rounded-3xl border border-primary/30" />
          <Image
            src={profile.photo}
            alt={t.hero.photoAlt(profile.fullName)}
            width={460}
            height={460}
            sizes="(min-width: 768px) 288px, (min-width: 640px) 256px, 224px"
            priority
            className="relative aspect-square w-full rounded-2xl border bg-surface object-cover shadow-glow"
          />
          </div>
        </div>
      </div>
    </section>
  );
}
