"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UsePackageFiltersReturn } from "@/lib/hooks/use-package-filters";
import { Separator } from "@/components/ui/separator";

type Props = {
  filters: UsePackageFiltersReturn;
  children: React.ReactNode;
};

const DATA_OPTIONS = [
  { label: "Any", value: "any" },
  { label: "100 MB", value: "100" },
  { label: "500 MB", value: "500" },
  { label: "1 GB", value: "1024" },
  { label: "3 GB", value: "3072" },
  { label: "5 GB", value: "5120" },
  { label: "10 GB", value: "10240" },
  { label: "20 GB", value: "20480" },
  { label: "50 GB", value: "51200" },
];

export default function MoreFiltersPopover({ filters, children }: Props) {
  const {
    minData,
    maxData,
    has5G,
    tethering,
    topUp,
    unlimited,
    setMinData,
    setMaxData,
    setHas5G,
    setTethering,
    setTopUp,
    setUnlimited,
    clearAll,
    activeFilterCount,
    providers,
    setProviders,
    allProviders,
  } = filters;

  const toggleProvider = (slug: string) => {
    if (providers.includes(slug)) {
      setProviders(providers.filter((p) => p !== slug));
    } else {
      setProviders([...providers, slug]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Advanced Filters
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <Separator />

          {/* Data Range */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              Data Range
            </Label>
            <div className="flex items-center gap-2">
              <Select
                value={minData !== null ? String(minData) : "any"}
                onValueChange={(val) =>
                  setMinData(val === "any" ? null : Number(val))
                }
              >
                <SelectTrigger className="h-8 flex-1 text-xs">
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  {DATA_OPTIONS.map((opt) => (
                    <SelectItem key={`min-${opt.value}`} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground">to</span>
              <Select
                value={maxData !== null ? String(maxData) : "any"}
                onValueChange={(val) =>
                  setMaxData(val === "any" ? null : Number(val))
                }
              >
                <SelectTrigger className="h-8 flex-1 text-xs">
                  <SelectValue placeholder="Max" />
                </SelectTrigger>
                <SelectContent>
                  {DATA_OPTIONS.map((opt) => (
                    <SelectItem key={`max-${opt.value}`} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Feature toggles */}
          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Features
            </Label>

            <div className="space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={has5G}
                  onCheckedChange={(checked) => setHas5G(checked === true)}
                />
                <span className="text-sm">5G Network</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={tethering}
                  onCheckedChange={(checked) => setTethering(checked === true)}
                />
                <span className="text-sm">Tethering / Hotspot</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={topUp}
                  onCheckedChange={(checked) => setTopUp(checked === true)}
                />
                <span className="text-sm">Can Top Up</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={unlimited}
                  onCheckedChange={(checked) => setUnlimited(checked === true)}
                />
                <span className="text-sm">Unlimited Data</span>
              </label>
            </div>
          </div>

          {allProviders && allProviders.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label className="text-xs font-medium text-muted-foreground">
                  Providers
                </Label>
                <div className="space-y-2.5">
                  {allProviders.map((provider) => (
                    <label
                      key={provider.slug}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={providers.includes(provider.slug)}
                        onCheckedChange={() => toggleProvider(provider.slug)}
                      />
                      <span className="text-sm">{provider.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
