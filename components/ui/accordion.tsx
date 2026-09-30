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
          "flex flex-1 items-center justify-between gap-4 rounded-md py-4 min-h-14 text-left text-h4 text-brand-navy transition-[color,box-shadow] duration-[var(--transition-fast)] outline-none hover:no-underline focus-visible:shadow-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50",
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
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-body"
      {...props}
    >
      <div className={cn("pt-0 pb-4 text-text-secondary", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
