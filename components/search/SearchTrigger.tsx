"use client";

import { Search } from "lucide-react";
import { useSearchDialog } from "./SearchDialogProvider";

type Variant = "bar" | "icon";

export function SearchTrigger({ variant = "icon" }: { variant?: Variant }) {
  const { openSearch } = useSearchDialog();

  if (variant === "bar") {
    return (
      <button
        type="button"
        onClick={openSearch}
        className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-lg shadow-muted/50 text-left cursor-pointer hover:border-primary/50 hover:ring-2 hover:ring-accent transition-all group"
        aria-label="Open search"
      >
        <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="flex-1 py-2 text-sm text-muted-foreground select-none">
          Search by country or region…
        </span>
        <span className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground pointer-events-none">
          Search
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search destinations"
      className="flex items-center gap-2 rounded-full border border-foreground px-4 py-1 text-foreground cursor-pointer hover:bg-foreground hover:text-background transition-colors"
    >
      <Search className="h-4 w-4" />
      <span>Destinations</span>
    </button>
  );
}
