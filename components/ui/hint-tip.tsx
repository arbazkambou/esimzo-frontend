"use client";

import type { ReactNode } from "react";
import { useState, useSyncExternalStore } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

const HOVER_MQ = "(hover: hover) and (pointer: fine)";

function subscribeHover(onChange: () => void) {
  const media = window.matchMedia(HOVER_MQ);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function useCanHover() {
  return useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia(HOVER_MQ).matches,
    () => true, // SSR / desktop-first
  );
}

const tipContentClass =
  "w-fit max-w-[16rem] border-none bg-primary p-0 px-3 py-1.5 text-xs text-balance text-primary-foreground shadow-none";

/** Desktop: hover tooltip. Mobile: click/tap popover. */
export function HintTip({
  content,
  children,
  side = "bottom",
  align = "center",
  label,
  className,
  contentClassName,
}: HintTipProps) {
  const canHover = useCanHover();
  // Controlled open — pointer only. Dialog autofocus must not open tips.
  const [open, setOpen] = useState(false);

  if (canHover) {
    return (
      <Tooltip
        open={open}
        onOpenChange={(next) => {
          // Ignore focus-driven opens (Radix opens tooltips on focus).
          if (!next) setOpen(false);
        }}
        delayDuration={200}
      >
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={label}
            className={cn(className)}
            onClick={(e) => e.stopPropagation()}
            onPointerEnter={() => setOpen(true)}
            onPointerLeave={() => setOpen(false)}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={6}
          className={cn(tipContentClass, contentClassName)}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
        className={cn(tipContentClass, contentClassName)}
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
