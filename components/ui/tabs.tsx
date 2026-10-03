"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

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
        className,
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list relative inline-flex w-full items-center text-text-secondary",
  {
    variants: {
      variant: {
        default:
          "gap-0 border-b border-border bg-transparent rounded-none p-0 h-auto",
        line: "gap-0 border-b border-border bg-transparent rounded-none p-0 h-auto",
        pill: "gap-1 rounded-md bg-muted p-1 h-auto w-full ring-1 ring-border",
        filled: "gap-1 rounded-md bg-muted p-1 h-auto w-full ring-1 ring-border",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  },
);

type Indicator = {
  left: number;
  width: number;
  ready: boolean;
};

type TabsListVariant = NonNullable<
  VariantProps<typeof tabsListVariants>["variant"]
>;

function indicatorClassName(variant: TabsListVariant | null | undefined) {
  switch (variant) {
    case "pill":
      return "top-1 bottom-1 rounded-lg bg-primary shadow-subtle";
    case "filled":
      return "top-1 bottom-1 rounded-lg bg-primary shadow-subtle";
    case "line":
    case "default":
    default:
      return "bottom-0 top-auto h-0.5 rounded-full bg-primary";
  }
}

function TabsList({
  className,
  variant = "line",
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = React.useState<Indicator>({
    left: 0,
    width: 0,
    ready: false,
  });

  const updateIndicator = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const active = list.querySelector<HTMLElement>(
      '[data-slot="tabs-trigger"][data-state="active"]',
    );
    if (!active) return;

    const listRect = list.getBoundingClientRect();
    const btnRect = active.getBoundingClientRect();
    const left = btnRect.left - listRect.left + list.scrollLeft;

    setIndicator({
      left,
      width: btnRect.width,
      ready: true,
    });
  }, []);

  React.useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, children, variant]);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(list);

    const mo = new MutationObserver(() => updateIndicator());
    mo.observe(list, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true,
      childList: true,
    });

    window.addEventListener("resize", updateIndicator);
    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator, children, variant]);

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 z-0 will-change-transform",
          "transition-[transform,width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          indicatorClassName(variant),
          !indicator.ready && "opacity-0",
        )}
        style={{
          width: indicator.width,
          transform: `translate3d(${indicator.left}px, 0, 0)`,
        }}
      />
      {children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap border-transparent px-4 py-3 text-nav text-text-secondary transition-[color,box-shadow,font-weight] duration-[var(--transition-base)] outline-none group/tab",
        "hover:text-text-primary",
        "focus-visible:shadow-[var(--focus-ring)] focus-visible:rounded-md",
        "disabled:pointer-events-none disabled:opacity-50",
        // Line / default — underline comes from sliding indicator
        "data-[state=active]:text-text-primary data-[state=active]:font-semibold",
        // Pill — sliding fill; trigger only handles text
        "group-data-[variant=pill]/tabs-list:rounded-lg group-data-[variant=pill]/tabs-list:min-h-10 group-data-[variant=pill]/tabs-list:flex-1 group-data-[variant=pill]/tabs-list:px-4 group-data-[variant=pill]/tabs-list:py-2 group-data-[variant=pill]/tabs-list:text-sm",
        "group-data-[variant=pill]/tabs-list:hover:text-brand-navy",
        "group-data-[variant=pill]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=pill]/tabs-list:data-[state=active]:text-primary-foreground group-data-[variant=pill]/tabs-list:data-[state=active]:shadow-none group-data-[variant=pill]/tabs-list:data-[state=active]:font-semibold",
        "group-data-[variant=pill]/tabs-list:data-[state=active]:hover:text-primary-foreground",
        // Filled — sliding fill with md radius
        "group-data-[variant=filled]/tabs-list:rounded-md group-data-[variant=filled]/tabs-list:min-h-10 group-data-[variant=filled]/tabs-list:flex-1 group-data-[variant=filled]/tabs-list:px-4 group-data-[variant=filled]/tabs-list:py-2 group-data-[variant=filled]/tabs-list:text-sm",
        "group-data-[variant=filled]/tabs-list:hover:text-brand-navy",
        "group-data-[variant=filled]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=filled]/tabs-list:data-[state=active]:text-primary-foreground group-data-[variant=filled]/tabs-list:data-[state=active]:shadow-none group-data-[variant=filled]/tabs-list:data-[state=active]:font-semibold",
        "group-data-[variant=filled]/tabs-list:data-[state=active]:hover:text-primary-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none pt-4 focus-visible:shadow-[var(--focus-ring)]",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
