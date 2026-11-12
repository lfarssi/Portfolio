import { formatPeriod } from "@/components/sections/period";
import type { SectionProps } from "@/components/sections/types";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Timeline } from "@/components/shared/timeline";
import type { Education } from "@/lib/types";

export function EducationTimeline({ locale, t, education }: SectionProps & { education: Education[] }) {
  return (
    <Section id="education">
      <SectionHeader id="education-title" {...t.sections.education} />
      <Timeline
        entries={education.map((entry, index) => ({
          key: `${index}-${entry.title.en}`,
          title: entry.title[locale],
          subtitle: entry.school[locale],
          period: formatPeriod(entry.dateStart, entry.dateEnd, locale, t),
          description: entry.description[locale],
          bullets: entry.bullets[locale],
        }))}
      />
    </Section>
  );
}
