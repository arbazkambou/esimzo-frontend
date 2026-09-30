import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-text-muted selection:bg-primary selection:text-primary-foreground border-input h-[var(--input-h)] w-full min-w-0 rounded-md border bg-input-bg px-[var(--control-pad-x)] py-1 text-base shadow-none transition-[color,box-shadow,border-color] duration-[var(--transition-fast)] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium hover:border-text-muted disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--state-disabled-bg)] disabled:text-[var(--state-disabled-fg)] disabled:opacity-100",
        "focus-visible:border-input-focus focus-visible:shadow-[var(--focus-ring)]",
        "aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_2px_var(--background),0_0_0_4px_var(--destructive)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
