"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "@/lib/utils";

export function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

export function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-transparent px-2.5 text-sm font-medium whitespace-nowrap text-foreground/70 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-foreground/15 data-[state=on]:bg-foreground/10 data-[state=on]:text-foreground sm:px-4",
        className,
      )}
      {...props}
    />
  );
}
