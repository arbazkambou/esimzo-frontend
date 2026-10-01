"use client";

import type { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type HintTipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  label?: string;
  className?: string;
  contentClassName?: string;
};

/** Click/tap-friendly tip. Stops parent link navigation on mobile. */
export function HintTip({
  content,
  children,
  side = "bottom",
  align = "center",
  label,
  className,
  contentClassName,
}: HintTipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={cn(className)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={6}
        className={cn(
          "w-fit max-w-[16rem] border-none bg-primary p-0 px-3 py-1.5 text-xs text-balance text-primary-foreground shadow-none",
          contentClassName,
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}
