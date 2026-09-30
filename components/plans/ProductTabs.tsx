"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type ProductTabItem = {
  value: string;
  label: string;
  count?: number;
  content: React.ReactNode;
};

type ProductTabsProps = {
  items: ProductTabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  sticky?: boolean;
  className?: string;
};

export function ProductTabs({
  items,
  defaultValue,
  value,
  onValueChange,
  sticky = false,
  className,
}: ProductTabsProps) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const activeValue = value ?? defaultValue ?? items[0]?.value;

  React.useEffect(() => {
    if (!listRef.current || !activeValue) return;
    const active = listRef.current.querySelector<HTMLElement>(
      `[data-state="active"]`
    );
    active?.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
      block: "nearest",
    });
  }, [activeValue]);

  return (
    <Tabs
      defaultValue={defaultValue ?? items[0]?.value}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <div
        className={cn(
          "relative",
          sticky &&
            "sticky top-[var(--header-h)] z-20 bg-surface border-b border-border -mx-[var(--gutter)] px-[var(--gutter)] lg:top-[var(--header-h-lg)]"
        )}
      >
        <div
          ref={listRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-none scroll-snap-x scroll-snap-proximity mask-[linear-gradient(to_right,black_calc(100%-2rem),transparent)]"
        >
          <TabsList variant="line" className="min-w-max">
            {items.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="scroll-snap-align-start"
              >
                {item.label}
                {typeof item.count === "number" && (
                  <span className="text-caption text-text-muted ml-1.5">
                    {item.count}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
