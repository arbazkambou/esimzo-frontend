"use client";

import { useState, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import type { UsePackageFiltersReturn } from "@/lib/hooks/use-package-filters";

type Props = {
  filters: UsePackageFiltersReturn;
  children: React.ReactNode;
};

export default function ProvidersFilter({ filters, children }: Props) {
  const {
    allProviders,
    providers: selectedProviders,
    setProviders,
    filteredCount,
    totalCount,
  } = filters;
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // Local draft state so we can apply/clear without hitting URL on every toggle
  const [draft, setDraft] = useState<Set<string>>(new Set(selectedProviders));

  // Sync draft when popover opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setDraft(new Set(selectedProviders));
      setSearch("");
    }
    setOpen(isOpen);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return allProviders;
    const q = search.toLowerCase();
    return allProviders.filter((p) => p.name.toLowerCase().includes(q));
  }, [allProviders, search]);

  const toggleProvider = (slug: string) => {
    setDraft((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const showAll = () => {
    setDraft(new Set(allProviders.map((p) => p.slug)));
  };

  const hideAll = () => {
    setDraft(new Set());
  };

  const handleApply = () => {
    setProviders(Array.from(draft));
    setOpen(false);
  };

  const handleClear = () => {
    setDraft(new Set());
    setProviders([]);
    setOpen(false);
  };

  const shownCount = draft.size === 0 ? allProviders.length : draft.size;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="start" side="bottom" className="w-[320px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Providers Filter
            </h3>
            <p className="text-xs text-muted-foreground">
              {shownCount}/{allProviders.length} shown
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 text-xs"
          />
        </div>

        {/* Show All / Hide All */}
        <div className="flex gap-2 px-4 pb-3">
          <Button
            variant="outline"
            size="sm"
            className="h-7 flex-1 text-xs"
            onClick={showAll}
          >
            Show all
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 flex-1 text-xs"
            onClick={hideAll}
          >
            Hide all
          </Button>
        </div>

        <Separator />

        {/* Provider list */}
        <ScrollArea className="h-[280px]">
          <div className="space-y-0.5 p-2">
            {filtered.map((provider) => {
              const isActive = draft.size === 0 || draft.has(provider.slug);

              return (
                <label
                  key={provider.slug}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-accent/50"
                >
                  <Switch
                    checked={isActive}
                    onCheckedChange={() => toggleProvider(provider.slug)}
                    className="scale-75"
                  />
                  {/* Provider image */}
                  {provider.image ? (
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="h-6 w-6 rounded-md object-contain"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                      {provider.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm text-foreground truncate">
                    {provider.name}
                  </span>
                </label>
              );
            })}
            {filtered.length === 0 && (
              <p className="py-6 text-center text-xs text-muted-foreground">
                No providers match &quot;{search}&quot;
              </p>
            )}
          </div>
        </ScrollArea>

        <Separator />

        {/* Footer */}
        <div className="flex gap-2 p-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button size="sm" className="flex-1" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
