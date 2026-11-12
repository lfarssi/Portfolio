import { Code, Server, ShieldCheck, Smartphone } from "lucide-react";

import type { SectionProps } from "@/components/sections/types";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { TechChip } from "@/components/shared/tech-chip";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Role } from "@/lib/types";

const icons: Record<string, typeof ShieldCheck> = {
  appsec: ShieldCheck,
  mobile: Smartphone,
  backend: Server,
  fullstack: Code,
};

export function Roles({ locale, t, roles }: SectionProps & { roles: Role[] }) {
  return (
    <Section id="roles" muted>
      <SectionHeader id="roles-title" {...t.sections.roles} />
      <ul className="grid gap-6 md:grid-cols-2">
        {roles.map((role) => {
          const Icon = icons[role.id] ?? Code;
          const primary = role.level === "primary";
          return (
            <Reveal as="li" key={role.id}>
              <Card interactive className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={
                      primary
                        ? "inline-flex size-11 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground"
                        : "inline-flex size-11 items-center justify-center rounded-lg bg-surface-muted text-muted-foreground"
                    }
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <Badge variant={primary ? "default" : "outline"}>
                    {primary ? t.sections.primaryRole : t.sections.secondaryRole}
                  </Badge>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{role.title[locale]}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{role.summary[locale]}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {role.stack.map((item) => (
                    <li key={item}>
                      <TechChip>{item}</TechChip>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
