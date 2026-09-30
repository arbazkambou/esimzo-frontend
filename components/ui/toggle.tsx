"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-label font-medium hover:bg-[var(--state-hover-bg)] hover:text-text-primary disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary-soft data-[state=on]:text-primary-text data-[state=on]:border-primary [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:shadow-[var(--focus-ring)] outline-none transition-[color,box-shadow,background-color,border-color] duration-[var(--transition-fast)] aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-border bg-transparent hover:border-border-strong",
      },
      size: {
        default: "h-[var(--btn-h-md)] px-3 min-w-11",
        sm: "h-[var(--btn-h-sm)] px-2.5 min-w-9",
        lg: "h-[var(--btn-h-lg)] px-4 min-w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
