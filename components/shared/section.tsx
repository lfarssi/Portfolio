import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  id: string;
  muted?: boolean;
};

/** Page section with an anchor id and the standard vertical rhythm. */
export function Section({ id, muted = false, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 md:py-28", muted && "bg-surface-muted/50", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-[72rem] px-4 sm:px-6">{children}</div>
    </section>
  );
}
