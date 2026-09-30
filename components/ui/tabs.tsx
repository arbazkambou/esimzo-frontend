"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-0 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-full items-center text-text-secondary",
  {
    variants: {
      variant: {
        default:
          "gap-0 border-b border-border bg-transparent rounded-none p-0 h-auto",
        line: "gap-0 border-b border-border bg-transparent rounded-none p-0 h-auto",
        pill: "gap-1 rounded-md bg-muted p-1 h-auto w-fit",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
)

function TabsList({
  className,
  variant = "line",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap border-transparent px-4 py-3 text-nav text-text-secondary transition-[color,box-shadow,font-weight] duration-[var(--transition-fast)] outline-none",
        "hover:text-text-primary hover:after:opacity-100 hover:after:bg-border-strong",
        "focus-visible:shadow-[var(--focus-ring)] focus-visible:rounded-md",
        "disabled:pointer-events-none disabled:opacity-50",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent after:opacity-0 after:transition-opacity",
        "data-[state=active]:text-text-primary data-[state=active]:font-semibold data-[state=active]:after:bg-primary data-[state=active]:after:opacity-100",
        "group-data-[variant=pill]/tabs-list:rounded-sm group-data-[variant=pill]/tabs-list:after:hidden group-data-[variant=pill]/tabs-list:min-h-9 group-data-[variant=pill]/tabs-list:px-3 group-data-[variant=pill]/tabs-list:py-2",
        "group-data-[variant=pill]/tabs-list:data-[state=active]:bg-surface group-data-[variant=pill]/tabs-list:data-[state=active]:shadow-subtle group-data-[variant=pill]/tabs-list:data-[state=active]:font-semibold",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none pt-4 focus-visible:shadow-[var(--focus-ring)]", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
