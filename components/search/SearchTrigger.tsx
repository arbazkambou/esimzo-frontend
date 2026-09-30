"use client";

import { Search, ArrowRight } from "lucide-react";
import { useSearchDialog } from "./SearchDialogProvider";
import { cn } from "@/lib/utils";

type Variant = "bar" | "icon";
type Size = "md" | "lg";

interface SearchTriggerProps {
  variant?: Variant;
  size?: Size;
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}

export function SearchTrigger({
  variant = "icon",
  size = "md",
  placeholder = "Where are you travelling to?",
  buttonLabel = "Compare Plans",
  className,
}: SearchTriggerProps) {
  const { openSearch } = useSearchDialog();
  const isLarge = size === "lg";

  if (variant === "bar") {
    return (
      <button
        type="button"
        onClick={openSearch}
        className={cn(
          "group flex w-full max-w-xl cursor-pointer flex-col gap-2 rounded-xl border border-border bg-card p-2 text-left shadow-card outline-none transition-[border-color,box-shadow] duration-[var(--transition-base)] hover:border-border-strong hover:shadow-elevated focus-visible:shadow-[var(--focus-ring)] sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:p-1.5 sm:pl-5",
          isLarge && "max-w-2xl sm:p-2 sm:pl-5",
          className
        )}
        aria-label="Open search"
      >
        <span
          className={cn(
            "flex min-h-11 flex-1 items-center gap-2.5 px-2 sm:min-h-0 sm:px-0",
            isLarge && "sm:min-h-12"
          )}
        >
          <Search
            className="size-5 shrink-0 text-text-muted transition-colors group-hover:text-primary"
            strokeWidth={1.75}
          />
          <span className="min-w-0 flex-1 truncate text-body-sm text-text-muted select-none sm:text-body">
            {placeholder}
          </span>
        </span>
        <span
          className={cn(
            "pointer-events-none inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-5 text-button font-semibold text-primary-foreground transition-colors group-hover:bg-primary-hover sm:w-auto sm:shrink-0 sm:rounded-full",
            isLarge
              ? "h-12 px-6 sm:h-[var(--btn-h-lg)] sm:px-7"
              : "h-11 sm:h-[var(--btn-h-md)] sm:px-6"
          )}
        >
          <span>{buttonLabel}</span>
          <ArrowRight className="size-4 shrink-0" strokeWidth={1.75} />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search destinations"
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md border border-border-strong bg-card px-4 py-1.5 text-caption font-semibold text-text-primary shadow-subtle outline-none transition-all hover:border-border hover:bg-[var(--state-hover-bg)] focus-visible:shadow-[var(--focus-ring)]",
        className
      )}
    >
      <Search className="size-4 text-text-secondary" strokeWidth={1.75} />
      <span>Destinations</span>
    </button>
  );
}
