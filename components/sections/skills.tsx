import type { SectionProps } from "@/components/sections/types";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { TechChip } from "@/components/shared/tech-chip";
import { Card } from "@/components/ui/card";
import type { Profile, SkillCategory } from "@/lib/types";
import { cn, isPlaceholder } from "@/lib/utils";

export function Skills({
  locale,
  t,
  categories,
  spokenLanguages,
}: SectionProps & { categories: SkillCategory[]; spokenLanguages: Profile["spokenLanguages"] }) {
  return (
    <Section id="skills">
      <SectionHeader id="skills-title" {...t.sections.skills} />
      <ul className="stagger grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Reveal as="li" key={category.id}>
            <Card className="h-full p-5">
              <h3
                className={cn(
                  "font-mono text-xs font-semibold tracking-[0.2em] uppercase",
                  category.id === "security"
                    ? "text-primary"
                    : category.id === "mobile"
                      ? "text-secondary-accent"
                      : "text-muted-foreground",
                )}
              >
                {category.name[locale]}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li key={item}>
                    <TechChip
                      className={cn(
                        "text-[0.8rem]",
                        !isPlaceholder(item) && category.id === "security" && "border-primary/30 bg-primary-soft text-primary-soft-foreground",
                        !isPlaceholder(item) && category.id === "mobile" && "border-secondary-accent/30 bg-secondary-soft text-secondary-soft-foreground",
                      )}
                    >
                      {item}
                    </TechChip>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
        <Reveal as="li">
          <Card className="h-full p-5">
            <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {t.sections.spokenLanguages}
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              {spokenLanguages.map((language) => (
                <div key={language.name.en} className="flex items-baseline justify-between gap-4">
                  <dt className="font-medium">{language.name[locale]}</dt>
                  <dd className={cn("text-muted-foreground", isPlaceholder(language.level[locale]) && "text-danger")}>
                    {language.level[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </ul>
    </Section>
  );
}
