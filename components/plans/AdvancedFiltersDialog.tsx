"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  Wifi,
  PhoneCall,
  Clock,
  Zap,
  Globe,
  Tag,
  Gauge,
  Calendar,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UsePackageFiltersReturn } from "@/lib/hooks/use-package-filters";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: UsePackageFiltersReturn;
}

type TabSection = "all" | "preferences" | "networks" | "providers";

export default function AdvancedFiltersDialog({
  open,
  onOpenChange,
  filters,
}: Props) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<TabSection>("all");
  const [providerSearch, setProviderSearch] = useState("");
  const [networkSearch, setNetworkSearch] = useState("");

  const {
    hideThrottling,
    setHideThrottling,
    hideSpeedLimits,
    setHideSpeedLimits,
    hideDailyCaps,
    setHideDailyCaps,
    hideSubscriptions,
    setHideSubscriptions,
    hideDataOnly,
    setHideDataOnly,
    onlyHotspot,
    setOnlyHotspot,
    onlyLocalBreakout,
    setOnlyLocalBreakout,
    onlyPromo,
    setOnlyPromo,
    networks,
    setNetworks,
    providers,
    setProviders,
    allNetworks,
    allProviders,
    clearAdvancedFilters,
    advancedFilterCount,
    filteredCount,
  } = filters;

  // Count active plan preferences
  const preferencesCount = useMemo(() => {
    return [
      hideThrottling,
      hideSpeedLimits,
      hideDailyCaps,
      hideSubscriptions,
      hideDataOnly,
      onlyHotspot,
      onlyLocalBreakout,
      onlyPromo,
    ].filter(Boolean).length;
  }, [
    hideThrottling,
    hideSpeedLimits,
    hideDailyCaps,
    hideSubscriptions,
    hideDataOnly,
    onlyHotspot,
    onlyLocalBreakout,
    onlyPromo,
  ]);

  // ── Network Toggle Helpers ──
  const allNetworkNames = useMemo(
    () => allNetworks.map((n) => n.name),
    [allNetworks],
  );

  const handleShowAllNetworks = () => setNetworks([]);
  const handleHideAllNetworks = () =>
    setNetworks(["__NONE_SELECTED__"]); // forces empty match

  const toggleNetwork = (name: string) => {
    if (networks.length === 0) {
      // If previously all were selected, unselecting one means selecting all EXCEPT this one
      setNetworks(allNetworkNames.filter((n) => n !== name));
    } else if (networks.includes(name)) {
      const next = networks.filter((n) => n !== name);
      setNetworks(next.length === 0 ? ["__NONE_SELECTED__"] : next);
    } else {
      const next = [...networks.filter((n) => n !== "__NONE_SELECTED__"), name];
      if (next.length === allNetworkNames.length) {
        setNetworks([]); // back to all
      } else {
        setNetworks(next);
      }
    }
  };

  const isNetworkChecked = (name: string) => {
    if (networks.length === 0) return true;
    return networks.includes(name);
  };

  // Filtered networks by search term
  const displayedNetworks = useMemo(() => {
    if (!networkSearch.trim()) return allNetworks;
    const term = networkSearch.toLowerCase().trim();
    return allNetworks.filter((n) => n.name.toLowerCase().includes(term));
  }, [allNetworks, networkSearch]);

  // ── Provider Toggle Helpers ──
  const allProviderSlugs = useMemo(
    () => allProviders.map((p) => p.slug),
    [allProviders],
  );

  const handleShowAllProviders = () => setProviders([]);
  const handleHideAllProviders = () =>
    setProviders(["__NONE_SELECTED__"]);

  const toggleProvider = (slug: string) => {
    if (providers.length === 0) {
      setProviders(allProviderSlugs.filter((s) => s !== slug));
    } else if (providers.includes(slug)) {
      const next = providers.filter((s) => s !== slug);
      setProviders(next.length === 0 ? ["__NONE_SELECTED__"] : next);
    } else {
      const next = [...providers.filter((s) => s !== "__NONE_SELECTED__"), slug];
      if (next.length === allProviderSlugs.length) {
        setProviders([]);
      } else {
        setProviders(next);
      }
    }
  };

  const isProviderChecked = (slug: string) => {
    if (providers.length === 0) return true;
    return providers.includes(slug);
  };

  // Filtered providers by search term
  const displayedProviders = useMemo(() => {
    if (!providerSearch.trim()) return allProviders;
    const term = providerSearch.toLowerCase().trim();
    return allProviders.filter((p) => p.name.toLowerCase().includes(term));
  }, [allProviders, providerSearch]);

  const renderHeader = (isDrawer: boolean) => {
    const TitleComp = isDrawer ? DrawerTitle : DialogTitle;
    return (
      <div className="flex flex-col gap-0 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <div>
              <TitleComp className="text-base font-bold text-foreground flex items-center gap-2">
                Advanced Filters
                {advancedFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground shadow-xs">
                    {advancedFilterCount} active
                  </span>
                )}
              </TitleComp>
              <p className="text-xs text-muted-foreground mt-0.5">
                Fine-tune plans by speed policies, carrier networks, and features
              </p>
            </div>
          </div>
        </div>

        {/* Quick Category Navigation Tabs with Active Badges (Far superior to eSIMDB) */}
        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition-all shrink-0",
              activeTab === "all"
                ? "bg-foreground text-background"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            All Sections
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("preferences")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all shrink-0",
              activeTab === "preferences"
                ? "bg-foreground text-background"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <span>Plan Preferences</span>
            {preferencesCount > 0 && (
              <span
                className={cn(
                  "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold",
                  activeTab === "preferences"
                    ? "bg-background text-foreground"
                    : "bg-primary text-primary-foreground",
                )}
              >
                {preferencesCount}
              </span>
            )}
          </button>

          {allNetworks.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("networks")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all shrink-0",
                activeTab === "networks"
                  ? "bg-foreground text-background"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span>Networks</span>
              <span className="text-[10px] opacity-70">({allNetworks.length})</span>
              {networks.length > 0 && (
                <span
                  className={cn(
                    "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold",
                    activeTab === "networks"
                      ? "bg-background text-foreground"
                      : "bg-primary text-primary-foreground",
                  )}
                >
                  {networks.length}
                </span>
              )}
            </button>
          )}

          {allProviders.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("providers")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all shrink-0",
                activeTab === "providers"
                  ? "bg-foreground text-background"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span>Providers</span>
              <span className="text-[10px] opacity-70">({allProviders.length})</span>
              {providers.length > 0 && (
                <span
                  className={cn(
                    "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold",
                    activeTab === "providers"
                      ? "bg-background text-foreground"
                      : "bg-primary text-primary-foreground",
                  )}
                >
                  {providers.length}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  const bodyContent = (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8 divide-y divide-border/60">
          {/* ══════════════════════════════════════════════════════════════
              SECTION 1: PLAN PREFERENCES (8 Toggles from eSIMDB)
             ══════════════════════════════════════════════════════════════ */}
          {(activeTab === "all" || activeTab === "preferences") && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  PLAN PREFERENCES
                </span>
                <p className="text-xs text-muted-foreground/80 mt-0.5">
                  Filter by speed policies, billing models, and hardware capabilities
                </p>
              </div>

              <div className="space-y-3">
                {/* 1. Hide plans with possible throttling */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-3.5 transition-colors hover:border-border">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                      <Gauge className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Hide plans with possible throttling
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Exclude unlimited plans that may reduce your speed after a certain amount of high-speed data usage.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={hideThrottling}
                    onCheckedChange={setHideThrottling}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>

                {/* 2. Hide plans with maximum speed limits */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-3.5 transition-colors hover:border-border">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Hide plans with maximum speed limits
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Exclude plans that have a capped maximum download/upload speed.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={hideSpeedLimits}
                    onCheckedChange={setHideSpeedLimits}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>

                {/* 3. Hide plans with daily data caps */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-3.5 transition-colors hover:border-border">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Hide plans with daily data caps
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Exclude plans that limit the amount of high-speed data you can use each day (e.g. 1GB/day).
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={hideDailyCaps}
                    onCheckedChange={setHideDailyCaps}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>

                {/* 4. Hide subscription-based plans */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-3.5 transition-colors hover:border-border">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Hide subscription-based plans
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Exclude plans that automatically renew at regular intervals (e.g. monthly) until canceled by the user.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={hideSubscriptions}
                    onCheckedChange={setHideSubscriptions}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>

                {/* 5. Hide data-only plans (no Voice / SMS) */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-3.5 transition-colors hover:border-border">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                      <PhoneCall className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Hide data-only plans (no Voice / SMS)
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Exclude plans that don&apos;t include voice calling or text messaging features.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={hideDataOnly}
                    onCheckedChange={setHideDataOnly}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>

                {/* 6. Only show plans with hotspot support */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-3.5 transition-colors hover:border-border">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                      <Wifi className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Only show plans with hotspot support
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Only show plans that explicitly support tethering (personal hotspot), allowing you to share your mobile data connection with other devices.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={onlyHotspot}
                    onCheckedChange={setOnlyHotspot}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>

                {/* 7. Only show plans with local internet breakout */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-3.5 transition-colors hover:border-border">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Only show plans with local internet breakout
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Exclude plans that route data internationally (roaming), which can lead to slower response times. Plans with local breakout connect you directly to the internet in your destination country, providing lower latency.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={onlyLocalBreakout}
                    onCheckedChange={setOnlyLocalBreakout}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>

                {/* 8. Only show plans with a promo code */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-3.5 transition-colors hover:border-border">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                      <Tag className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Only show plans with a promo code
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Only show plans that currently offer a discount or promo code.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={onlyPromo}
                    onCheckedChange={setOnlyPromo}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              SECTION 2: NETWORKS (Carriers with plan counts)
             ══════════════════════════════════════════════════════════════ */}
          {(activeTab === "all" || activeTab === "networks") && allNetworks.length > 0 && (
            <div className={cn("space-y-4", activeTab === "all" && "pt-6")}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    NETWORKS
                  </span>
                  <p className="text-xs text-muted-foreground/80 mt-0.5">
                    Select networks to find plans that include any of them
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={handleShowAllNetworks}
                    className="text-primary hover:underline"
                  >
                    Show all
                  </button>
                  <span className="text-muted-foreground/40">|</span>
                  <button
                    type="button"
                    onClick={handleHideAllNetworks}
                    className="text-muted-foreground hover:underline"
                  >
                    Hide all
                  </button>
                </div>
              </div>

              {/* Network Search input if more than 4 networks */}
              {allNetworks.length > 4 && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    value={networkSearch}
                    onChange={(e) => setNetworkSearch(e.target.value)}
                    placeholder="Search carrier networks..."
                    className="pl-8 pr-8 h-8 text-xs rounded-xl bg-card border-border/80"
                  />
                  {networkSearch && (
                    <button
                      type="button"
                      onClick={() => setNetworkSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Carrier list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                {displayedNetworks.map((net) => {
                  const checked = isNetworkChecked(net.name);
                  return (
                    <div
                      key={net.name}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleNetwork(net.name)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          toggleNetwork(net.name);
                        }
                      }}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all select-none",
                        checked
                          ? "border-primary/60 bg-primary/5 dark:bg-primary/10"
                          : "border-border/60 bg-card hover:bg-accent/40 opacity-70",
                      )}
                    >
                      <div className="flex items-center gap-2.5 pointer-events-none">
                        <Checkbox
                          checked={checked}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="text-xs font-semibold text-foreground">
                          {net.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        ({net.count.toLocaleString()})
                      </span>
                    </div>
                  );
                })}

                {displayedNetworks.length === 0 && (
                  <p className="col-span-full py-4 text-center text-xs text-muted-foreground">
                    No networks matching &ldquo;{networkSearch}&rdquo;
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              SECTION 3: PROVIDERS (Search + Logos + Plan counts)
             ══════════════════════════════════════════════════════════════ */}
          {(activeTab === "all" || activeTab === "providers") && allProviders.length > 0 && (
            <div className={cn("space-y-4", activeTab === "all" && "pt-6")}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    PROVIDERS
                  </span>
                  <p className="text-xs text-muted-foreground/80 mt-0.5">
                    Filter by specific eSIM brands and aggregators
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={handleShowAllProviders}
                    className="text-primary hover:underline"
                  >
                    Show all
                  </button>
                  <span className="text-muted-foreground/40">|</span>
                  <button
                    type="button"
                    onClick={handleHideAllProviders}
                    className="text-muted-foreground hover:underline"
                  >
                    Hide all
                  </button>
                </div>
              </div>

              {/* Provider Search input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={providerSearch}
                  onChange={(e) => setProviderSearch(e.target.value)}
                  placeholder="Search by name..."
                  className="pl-9 pr-8 h-9 text-xs rounded-xl bg-card border-border/80"
                />
                {providerSearch && (
                  <button
                    type="button"
                    onClick={() => setProviderSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Providers grid/list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                {displayedProviders.map((prov) => {
                  const checked = isProviderChecked(prov.slug);
                  return (
                    <div
                      key={prov.slug}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleProvider(prov.slug)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          toggleProvider(prov.slug);
                        }
                      }}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all select-none",
                        checked
                          ? "border-primary/60 bg-primary/5 dark:bg-primary/10"
                          : "border-border/60 bg-card hover:bg-accent/40 opacity-70",
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pointer-events-none">
                        <Checkbox
                          checked={checked}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        {prov.image ? (
                          <div className="relative h-6 w-6 shrink-0 rounded overflow-hidden">
                            <Image
                              src={prov.image}
                              alt={prov.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold text-foreground">
                            {prov.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-xs font-semibold text-foreground truncate">
                          {prov.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono ml-2 shrink-0">
                        ({prov.count.toLocaleString()})
                      </span>
                    </div>
                  );
                })}

                {displayedProviders.length === 0 && (
                  <p className="col-span-full py-6 text-center text-xs text-muted-foreground">
                    No providers matching &ldquo;{providerSearch}&rdquo;
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
  );

  const renderFooter = () => (
    <div className="flex items-center justify-between w-full">
      <button
        type="button"
        onClick={clearAdvancedFilters}
        disabled={advancedFilterCount === 0}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-semibold transition-colors",
          advancedFilterCount > 0
            ? "text-muted-foreground hover:text-primary cursor-pointer"
            : "text-muted-foreground/40 cursor-not-allowed",
        )}
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </button>

      <Button
        type="button"
        onClick={() => onOpenChange(false)}
        className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs px-5 py-2 h-9 shadow-sm transition-all"
      >
        {filteredCount > 0 ? (
          <span>View {filteredCount.toLocaleString()} Plans</span>
        ) : (
          <span>Done (0 Plans)</span>
        )}
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[92vh] h-[90vh] p-0 overflow-hidden flex flex-col gap-0 rounded-t-3xl border-t border-border/80 bg-card">
          <DrawerHeader className="p-4 pb-3 border-b border-border/60 bg-card text-left">
            {renderHeader(true)}
          </DrawerHeader>
          {bodyContent}
          <div className="p-3.5 px-4 border-t border-border/60 bg-card">
            {renderFooter()}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden flex flex-col gap-0 border-border/80 rounded-2xl shadow-xl">
        <DialogHeader className="p-5 pb-3 border-b border-border/60 bg-card text-left">
          {renderHeader(false)}
        </DialogHeader>
        {bodyContent}
        <div className="p-4 px-5 border-t border-border/60 bg-card">
          {renderFooter()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
