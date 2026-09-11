"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Info, Check, X, Search, ZoomInIcon, BadgeInfo } from "lucide-react";
import { Plan, Coverage } from "@/lib/types/plans.types";
import { formatData, formatPrice } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ── BoolBadge ──────────────────────────────────────────────────────────────
function BoolBadge({ value, label }: { value: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      {value ? (
        <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
          <Check className="h-3 w-3" /> Yes
        </span>
      ) : (
        <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
          <X className="h-3 w-3" /> No
        </span>
      )}
    </div>
  );
}

// ── Network generation pill ────────────────────────────────────────────────
function GenPill({ type }: { type: string }) {
  const styles: Record<string, string> = {
    "5G": "bg-primary text-foreground",
    "4G": "bg-primary/70 text-foreground",
    "3G": "bg-primary/40 text-foreground",
    "2G": "bg-primary/20 text-foreground",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold ${styles[type] ?? styles["2G"]}`}
    >
      {type}
    </span>
  );
}

// ── Single coverage row — matches reference image layout ───────────────────
// Country name (bold) | Provider name  2G 3G 4G  |  Provider2  4G 5G
function CoverageRow({ coverage }: { coverage: Coverage }) {
  const networks = coverage.networks ?? [];

  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0">
      {/* Country name — fixed width so providers line up */}
      <span className="w-32 shrink-0 text-sm text-muted-foreground leading-5">
        <span className="text-foreground font-semibold">{coverage.code}</span>{" "}
        {coverage.name}
      </span>

      {/* Provider(s) inline */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {networks.length > 0 ? (
          networks.map((net) => (
            <span
              key={net.name}
              className="flex items-center gap-1.5 flex-wrap"
            >
              {/* Provider name */}
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {net.name}
              </span>
              {/* Generation pills */}
              <span className="flex items-center gap-0.5">
                {net.types.map((t) => (
                  <GenPill key={t} type={t} />
                ))}
              </span>
            </span>
          ))
        ) : (
          <span className="text-xs text-muted-foreground italic">
            No network info
          </span>
        )}
      </div>
    </div>
  );
}

// ── Main card ──────────────────────────────────────────────────────────────
export const ProviderPackagesCard = ({ data }: { data: Plan }) => {
  const [open, setOpen] = useState(false);
  const [coverageQuery, setCoverageQuery] = useState("");
  const [debouncedCoverageQuery, setDebouncedCoverageQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    name,
    capacity,
    usdPrice,
    period,
    tethering,
    canTopUp,
    has5G,
    isLowLatency,
    coverages,
  } = data;

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setCoverageQuery("");
      setDebouncedCoverageQuery("");
    } else {
      setTimeout(() => searchRef.current?.focus(), 80);
    }
  }, [open]);

  // 200ms debounce on coverage search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedCoverageQuery(coverageQuery), 200);
    return () => clearTimeout(t);
  }, [coverageQuery]);

  // Filter coverages by name or code
  const filteredCoverages = useMemo<Coverage[]>(() => {
    const q = debouncedCoverageQuery.trim().toLowerCase();
    if (!q) return coverages;
    return coverages.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.networks?.some((n) => n.name.toLowerCase().includes(q)),
    );
  }, [debouncedCoverageQuery, coverages]);

  return (
    <>
      {/* ── Plan Card ────────────────────────────────────────────────────── */}
      <div className="group relative xl:max-w-4xl overflow-hidden rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {name}
          </h3>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              {formatData(capacity)}
            </span>
          </div>

          <div className="hidden md:block h-12 w-[1px] bg-border" />

          <div className="flex flex-col">
            <span className="text-xl font-semibold text-foreground">
              {period} {period === 1 ? "Day" : "Days"}
            </span>
            <div className="flex items-center gap-1 uppercase text-xs text-muted-foreground mt-1">
              <span>Validity</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(usdPrice)}
            </span>
          </div>

          <div className="flex flex-col gap-2 min-w-[140px]">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center cursor-pointer justify-center gap-1.5 text-primary font-semibold"
            >
              <Info size={20} />
              Details
            </button>
          </div>
        </div>
      </div>

      {/* ── Details Dialog ───────────────────────────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl! max-h-[75dvh] p-0 gap-0 flex flex-col overflow-hidden rounded-2xl border-border">
          {/* Header */}
          <DialogHeader className="px-5 pt-5 pb-4 border-b border-border shrink-0">
            <DialogTitle className="text-lg font-bold text-foreground">
              Plan Details
            </DialogTitle>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                {formatData(capacity)}
              </span>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                {period} {period === 1 ? "Day" : "Days"}
              </span>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                {formatPrice(usdPrice)}
              </span>
              {has5G && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  5G Ready
                </span>
              )}
            </div>
          </DialogHeader>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {/* ── Features ── */}
            <div>
              <div className="">
                <BoolBadge
                  value={tethering}
                  label="Tethering (Personal Hotspot)"
                />
                <BoolBadge value={canTopUp} label="Top Up (Recharge)" />
                <BoolBadge value={has5G} label="5G Support" />
                <BoolBadge value={isLowLatency} label="Low Latency" />
              </div>
            </div>

            {/* ── Coverage & Networks ── */}
            {coverages.length > 0 && (
              <div className="space-y-3">
                {/* Section title */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground">
                    Supported Countries &amp; Networks
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {filteredCoverages.length}
                    {debouncedCoverageQuery
                      ? ` of ${coverages.length}`
                      : ""}{" "}
                    {coverages.length === 1 ? "country" : "countries"}
                  </span>
                </div>

                {/* Search input */}
                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/20 px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={coverageQuery}
                    onChange={(e) => setCoverageQuery(e.target.value)}
                    placeholder="Search country or network…"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                  {coverageQuery && (
                    <button
                      onClick={() => setCoverageQuery("")}
                      className="rounded-md p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Coverage list */}
                <div className="rounded-2xl border border-border bg-secondary/10 px-4">
                  {filteredCoverages.length > 0 ? (
                    filteredCoverages.map((c, i) => (
                      <CoverageRow key={`${c.code}-${i}`} coverage={c} />
                    ))
                  ) : (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      No countries match &quot;{debouncedCoverageQuery}&quot;
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
