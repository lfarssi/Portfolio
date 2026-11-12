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
          "transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-card-hover motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}

export { Card };
