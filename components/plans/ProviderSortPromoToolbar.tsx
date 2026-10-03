"use client";

import { useTransition } from "react";
import { Flame, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/lib/plans/sort-plans";

const SORT_OPTIONS: {
  value: SortOption;
  label: string;
  icon?: React.ReactNode;
}[] = [
  { value: "cheapest", label: "Cheapest" },
  {
    value: "best-value",
    label: "Best Value",
    icon: <Flame className="h-3.5 w-3.5" />,
  },
  { value: "most-data", label: "Most Data" },
  { value: "longest", label: "Longest Trip" },
];

type Props = {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  applyPromo: boolean;
  onApplyPromoChange: (value: boolean) => void;
  filteredCount: number;
  totalCount: number;
};

/** Same shell language as coverage tabs — full-width muted track. */
export function ProviderSortPromoToolbar({
  sort,
  onSortChange,
  applyPromo,
  onApplyPromoChange,
  filteredCount,
  totalCount,
}: Props) {
  const [, startTransition] = useTransition();

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-muted p-1.5 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <div
        role="group"
        aria-label="Sort plans"
        className="flex min-w-0 flex-1 gap-1 overflow-x-auto scrollbar-none"
      >
        {SORT_OPTIONS.map((opt) => {
          const isActive = sort === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => startTransition(() => onSortChange(opt.value))}
              aria-pressed={isActive}
              className={cn(
                "inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition-[color,background-color,box-shadow] active:scale-[0.98]",
                isActive
                  ? "bg-primary text-primary-foreground shadow-card [&_svg]:text-primary-foreground"
                  : "text-text-secondary hover:bg-card/70 hover:text-brand-navy [&_svg]:text-primary-text",
              )}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 px-2 sm:justify-end">
        <label className="flex cursor-pointer select-none items-center gap-2">
          <Sparkles className="h-4 w-4 shrink-0 text-primary-text" />
          <span className="text-sm font-semibold text-brand-navy">
            Apply Promo Codes
          </span>
          <Switch
            checked={applyPromo}
            onCheckedChange={(checked) =>
              startTransition(() => onApplyPromoChange(checked))
            }
            className="data-[state=checked]:bg-primary"
            aria-label="Toggle promo codes"
          />
        </label>

        <p className="text-sm font-medium text-text-secondary">
          <span className="tabular font-semibold text-brand-navy">
            {filteredCount}
          </span>{" "}
          of {totalCount}
        </p>
      </div>
    </div>
  );
}
