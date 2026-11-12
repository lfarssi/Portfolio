import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
};

export function SectionHeader({ id, eyebrow, title, intro, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("mb-10 max-w-2xl md:mb-14", className)}>
      <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
        <span aria-hidden="true" className="eyebrow-line" />
        <span>
          <span aria-hidden="true">{"// "}</span>
          {eyebrow}
        </span>
      </p>
      <h2 id={id} className="mt-3 text-[2rem] leading-tight font-bold tracking-tight">
        {title}
      </h2>
      {intro ? <p className="mt-3 text-muted-foreground">{intro}</p> : null}
    </Reveal>
  );
}
