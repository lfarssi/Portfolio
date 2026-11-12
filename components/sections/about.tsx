import { CircleCheck } from "lucide-react";

import type { SectionProps } from "@/components/sections/types";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import type { Profile } from "@/lib/types";

export function About({ locale, t, profile }: SectionProps & { profile: Profile }) {
  return (
    <Section id="about">
      <SectionHeader id="about-title" {...t.sections.about} />
      <div className="grid gap-8 md:grid-cols-[3fr_2fr] md:gap-12">
        <Reveal>
          <p className="text-base leading-7 sm:text-lg sm:leading-8">{profile.about[locale]}</p>
        </Reveal>
        <Reveal>
          <Card className="p-5 sm:p-6">
            <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {t.sections.whatIBring}
            </h3>
            <ul className="mt-4 space-y-3">
              {profile.whatIBring[locale].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
