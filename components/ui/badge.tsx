import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex h-6 items-center justify-center rounded-sm border border-transparent px-2 text-caption font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:shadow-[var(--focus-ring)] overflow-hidden transition-[color,background-color,box-shadow] duration-[var(--transition-fast)]",
  {
    variants: {
      variant: {
        default: "bg-muted text-text-secondary",
        brand: "bg-primary-soft text-primary-text",
        navy: "bg-brand-navy text-brand-navy-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success-soft text-success-foreground",
        warning: "bg-warning-soft text-warning-foreground",
        error: "bg-destructive-soft text-destructive-foreground",
        info: "bg-info-soft text-info-foreground",
        destructive: "bg-destructive-soft text-destructive-foreground",
        outline: "border-border text-text-secondary bg-transparent",
        ghost: "bg-transparent text-text-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
