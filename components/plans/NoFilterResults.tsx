"use client";

import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

type Props = {
  onClear: () => void;
};

export default function NoFilterResults({ onClear }: Props) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16 px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        No plans match your filters
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        Try adjusting your filters or clearing them to see all available plans.
      </p>
      <Button variant="outline" size="sm" onClick={onClear} className="mt-4">
        Clear all filters
      </Button>
    </div>
  );
}
