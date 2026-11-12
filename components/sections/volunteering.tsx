import { HeartHandshake } from "lucide-react";

import { formatPeriod } from "@/components/sections/period";
import type { SectionProps } from "@/components/sections/types";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import type { Volunteering as VolunteeringEntry } from "@/lib/types";

/** Hidden entirely while there are no entries. */
export function Volunteering({ locale, t, volunteering }: SectionProps & { volunteering: VolunteeringEntry[] }) {
  if (volunteering.length === 0) return null;

  return (
    <Section id="volunteering">
      <SectionHeader id="volunteering-title" {...t.sections.volunteering} />
      <ul className="stagger grid gap-5 md:grid-cols-2">
        {volunteering.map((entry, index) => (
          <Reveal as="li" key={`${index}-${entry.organization}`}>
            <Card className="flex h-full gap-4 p-5">
              <HeartHandshake className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs tracking-wider text-primary uppercase">
                  {formatPeriod(entry.dateStart, entry.dateEnd, locale, t)}
                </p>
                <h3 className="mt-1 font-semibold">{entry.role[locale]}</h3>
                <p className="text-sm text-muted-foreground">{entry.organization}</p>
                <p className="mt-2 text-sm leading-6">{entry.description[locale]}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
