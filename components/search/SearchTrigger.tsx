"use client";

import { Search, ArrowRight } from "lucide-react";
import { useSearchDialog } from "./SearchDialogProvider";

type Variant = "bar" | "icon";

interface SearchTriggerProps {
  variant?: Variant;
  placeholder?: string;
  buttonLabel?: string;
}

export function SearchTrigger({
  variant = "icon",
  placeholder = "Where are you travelling to?",
  buttonLabel = "Compare Plans",
}: SearchTriggerProps) {
  const { openSearch } = useSearchDialog();

  if (variant === "bar") {
    return (
      <button
        type="button"
        onClick={openSearch}
        className="flex w-full max-w-xl items-center gap-3 rounded-full border border-slate-200/90 bg-white p-1.5 pl-4 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-card dark:shadow-none text-left cursor-pointer hover:border-primary/60 hover:ring-2 hover:ring-primary/20 transition-all group"
        aria-label="Open search"
      >
        <Search className="h-4.5 w-4.5 shrink-0 text-slate-400 group-hover:text-primary transition-colors" />
        <span className="flex-1 py-1.5 text-sm text-slate-500 dark:text-slate-400 select-none">
          {placeholder}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff5a22] hover:bg-[#e84a12] px-3.5 min-[375px]:px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm pointer-events-none transition-transform group-hover:scale-[1.02] shrink-0">
          <span>{buttonLabel}</span>
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search destinations"
      className="flex items-center gap-2 rounded-full border border-slate-300/90 bg-white/90 dark:bg-card/90 dark:border-slate-700 px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white shadow-xs hover:border-slate-400 hover:bg-white dark:hover:bg-card transition-all cursor-pointer"
    >
      <Search className="h-4 w-4 text-slate-700 dark:text-slate-300" />
      <span>Destinations</span>
    </button>
  );
}
