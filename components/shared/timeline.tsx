import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { cn, isPlaceholder } from "@/lib/utils";

export type TimelineEntry = {
  key: string;
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  bullets: string[];
};

/** Vertical timeline used by Education and Experience. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="stagger relative space-y-8 border-l border-border pl-6 md:ml-2 md:pl-10">
      {entries.map((entry, index) => (
        <Reveal as="li" key={entry.key} className="relative">
          <span aria-hidden="true" className="absolute top-6 -left-[1.95rem] size-3.5 md:-left-[2.95rem]">
            {index === 0 ? (
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary" />
            ) : null}
            <span className="absolute inset-0 rounded-full border-2 border-primary bg-background" />
          </span>
          <Card interactive className="p-6">
            <p className={cn("font-mono text-xs tracking-wider text-primary uppercase", isPlaceholder(entry.period) && "text-danger")}>
              {entry.period}
            </p>
            <h3 className="mt-2 text-lg leading-snug font-semibold">{entry.title}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{entry.subtitle}</p>
            {entry.description ? <p className="mt-3 text-sm leading-6">{entry.description}</p> : null}
            {entry.bullets.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground marker:text-primary">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        </Reveal>
      ))}
    </ol>
  );
}
