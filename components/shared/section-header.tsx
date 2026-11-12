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
    <Reveal className={cn("mb-8 max-w-2xl sm:mb-10 md:mb-14", className)}>
      <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
        <span aria-hidden="true" className="eyebrow-line" />
        <span>
          <span aria-hidden="true">{"// "}</span>
          {eyebrow}
        </span>
      </p>
      <h2 id={id} className="mt-2 text-[1.6rem] leading-tight sm:mt-3 sm:text-[2rem] font-bold tracking-tight">
        {title}
      </h2>
      {intro ? <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base">{intro}</p> : null}
    </Reveal>
  );
}
