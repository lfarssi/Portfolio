import { cn, isPlaceholder } from "@/lib/utils";

export function TechChip({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-surface-muted px-2 py-0.5 font-mono text-xs text-muted-foreground",
        isPlaceholder(children) && "border-dashed border-danger/50 text-danger",
        className,
      )}
    >
      {children}
    </span>
  );
}
