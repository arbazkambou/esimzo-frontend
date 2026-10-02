"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "rounded-lg border border-border bg-card px-[var(--card-pad)] shadow-subtle transition-[background-color,border-color,box-shadow] duration-[var(--transition-fast)]",
        "data-[state=open]:border-primary data-[state=open]:bg-primary-soft",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 rounded-md py-3.5 min-h-11 text-left text-sm font-semibold leading-snug text-foreground transition-[color,box-shadow] duration-[var(--transition-fast)] outline-none hover:no-underline focus-visible:shadow-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50 sm:text-[15px]",
          "[&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-primary",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className="text-text-muted pointer-events-none size-5 shrink-0 transition-[transform,color] duration-[var(--transition-base)]"
          strokeWidth={1.75}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  forceMount: forceMountProp,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  // SSR/hydration: keep answers in HTML for SEO. After mount, let Radix
  // unmount closed panels so open/close animations work normally.
  const [forceMount, setForceMount] = React.useState<true | undefined>(true)

  React.useEffect(() => {
    setForceMount(undefined)
  }, [])

  const resolvedForceMount =
    forceMountProp !== undefined ? forceMountProp : forceMount

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount={resolvedForceMount}
      className={cn(
        "overflow-hidden text-body data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        // While force-mounted for SEO, collapse closed panels without unmounting.
        resolvedForceMount === true && "data-[state=closed]:hidden",
      )}
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-4 text-xs leading-relaxed text-text-secondary sm:text-[13.5px]",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
