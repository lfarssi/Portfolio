import { formatPeriod } from "@/components/sections/period";
import type { SectionProps } from "@/components/sections/types";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Timeline } from "@/components/shared/timeline";
import type { Experience as ExperienceEntry } from "@/lib/types";

/** Rendered only when data/content.json has at least one experience entry. */
export function Experience({ locale, t, experience }: SectionProps & { experience: ExperienceEntry[] }) {
  if (experience.length === 0) return null;

  return (
    <Section id="experience">
      <SectionHeader id="experience-title" {...t.sections.experience} />
      <Timeline
        entries={experience.map((entry, index) => ({
          key: `${index}-${entry.company}`,
          title: entry.role[locale],
          subtitle: `${entry.company}, ${entry.location[locale]}`,
          period: formatPeriod(entry.dateStart, entry.dateEnd, locale, t),
          bullets: entry.bullets[locale],
        }))}
      />
    </Section>
  );
}
