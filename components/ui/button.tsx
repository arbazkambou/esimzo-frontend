import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-button transition-[color,background-color,border-color,box-shadow] duration-[var(--transition-base)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--state-disabled-bg)] disabled:text-[var(--state-disabled-fg)] disabled:opacity-100 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:shadow-[var(--focus-ring)] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:shadow-[var(--focus-ring)]",
        outline:
          "border border-border-strong bg-transparent text-text-primary hover:bg-[var(--state-hover-bg)]",
        secondary:
          "bg-secondary text-primary-text hover:bg-secondary-hover",
        ghost:
          "text-text-secondary hover:bg-[var(--state-hover-bg)]",
        link: "text-primary-text underline-offset-4 hover:underline px-0 h-auto",
        onDark:
          "bg-white text-brand-navy hover:bg-white/90",
        onDarkOutline:
          "border border-white/80 bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "h-[var(--btn-h-md)] px-5 has-[>svg]:px-4",
        sm: "h-[var(--btn-h-sm)] px-4 has-[>svg]:px-3",
        lg: "h-[var(--btn-h-lg)] px-7 has-[>svg]:px-5",
        icon: "size-[var(--btn-h-md)]",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-[var(--btn-h-sm)]",
        "icon-lg": "size-[var(--btn-h-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  isLoading = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  const isDisabled = disabled || isLoading

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden />
          <span className="sr-only">Loading</span>
          <span className="invisible absolute">{children}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
