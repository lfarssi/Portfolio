import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-xl border bg-surface text-card-foreground shadow-card",
        interactive &&
          "transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}

export { Card };
