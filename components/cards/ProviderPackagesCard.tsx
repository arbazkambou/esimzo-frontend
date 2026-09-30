"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Check, X, Search, BadgeInfo } from "lucide-react";
import { Plan, Coverage } from "@/lib/types/plans.types";
import { formatPlanData, formatPrice, getEffectiveUsdPrice } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlanCard } from "@/components/plans/PlanCard";
import { Badge } from "@/components/ui/badge";

function BoolBadge({ value, label }: { value: boolean | null; label: string }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-body-sm text-text-muted">{label}</span>
      {value === true ? (
        <span className="flex items-center gap-1 rounded-sm bg-success-soft px-2.5 py-0.5 text-caption font-semibold text-success-foreground">
          <Check className="h-3 w-3" strokeWidth={1.75} /> Yes
        </span>
      ) : value === false ? (
        <span className="flex items-center gap-1 rounded-sm bg-muted px-2.5 py-0.5 text-caption font-semibold text-text-muted">
          <X className="h-3 w-3" strokeWidth={1.75} /> No
        </span>
      ) : (
        <span className="flex items-center gap-1 rounded-sm bg-muted px-2.5 py-0.5 text-caption font-semibold text-text-muted">
          <BadgeInfo className="h-3 w-3" strokeWidth={1.75} /> Unknown
        </span>
      )}
    </div>
  );
}

function GenPill({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded-xs border border-border px-1.5 py-0.5 text-caption font-semibold text-text-secondary">
      {type}
    </span>
  );
}

function CoverageRow({ coverage }: { coverage: Coverage }) {
  const networks = coverage.networks ?? [];

  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border-subtle last:border-0">
      <span className="w-32 shrink-0 text-body-sm text-text-muted leading-5">
        <span className="text-text-primary font-semibold">{coverage.code}</span>{" "}
        {coverage.name}
      </span>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {networks.length > 0 ? (
          networks.map((net) => (
            <span
              key={net.name}
              className="flex items-center gap-1.5 flex-wrap"
            >
              <span className="text-caption text-text-muted whitespace-nowrap">
                {net.name}
              </span>
              <span className="flex items-center gap-0.5">
                {net.types.map((t) => (
                  <GenPill key={t} type={t} />
                ))}
              </span>
            </span>
          ))
        ) : (
          <span className="text-caption text-text-muted italic">
            No network info
          </span>
        )}
      </div>
    </div>
  );
}

export const ProviderPackagesCard = ({ data }: { data: Plan }) => {
  const [open, setOpen] = useState(false);
  const [coverageQuery, setCoverageQuery] = useState("");
  const [debouncedCoverageQuery, setDebouncedCoverageQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    usdPrice,
    period,
    tethering,
    canTopUp,
    has5G,
    isLowLatency,
    coverages = [],
  } = data;
  const effectiveUsdPrice = getEffectiveUsdPrice(data);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setCoverageQuery("");
      setDebouncedCoverageQuery("");
    } else {
      setTimeout(() => searchRef.current?.focus(), 80);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setDebouncedCoverageQuery(coverageQuery), 200);
    return () => clearTimeout(t);
  }, [coverageQuery]);

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
      <PlanCard
        plan={data}
        onViewDetails={() => setOpen(true)}
        className="xl:max-w-md"
      />

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl! max-h-[75dvh] p-0 gap-0 flex flex-col overflow-hidden rounded-xl border-border">
          <DialogHeader className="px-5 pt-5 pb-4 border-b border-border shrink-0">
            <DialogTitle className="text-h3">Plan Details</DialogTitle>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="brand">{formatPlanData(data)}</Badge>
              <Badge variant="default">
                {period} {period === 1 ? "Day" : "Days"}
              </Badge>
              <Badge variant="navy">
                {formatPrice(effectiveUsdPrice)} USD
              </Badge>
              {has5G && <Badge variant="outline">5G Ready</Badge>}
              {usdPrice > effectiveUsdPrice && (
                <Badge variant="success">Discount</Badge>
              )}
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            <div>
              <BoolBadge
                value={tethering}
                label="Tethering (Personal Hotspot)"
              />
              <BoolBadge value={canTopUp} label="Top Up (Recharge)" />
              <BoolBadge value={has5G} label="5G Support" />
              <BoolBadge value={isLowLatency} label="Low Latency" />
            </div>

            {coverages.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-label font-semibold text-text-primary">
                    Supported Countries &amp; Networks
                  </h3>
                  <span className="text-caption text-text-muted">
                    {filteredCoverages.length}
                    {debouncedCoverageQuery
                      ? ` of ${coverages.length}`
                      : ""}{" "}
                    {coverages.length === 1 ? "country" : "countries"}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-md border border-input bg-input-bg px-3 h-[var(--input-h)] focus-within:border-input-focus focus-within:shadow-[var(--focus-ring)] transition-[border-color,box-shadow]">
                  <Search className="h-3.5 w-3.5 shrink-0 text-text-muted" strokeWidth={1.75} />
                  <input
                    ref={searchRef}
                    type="text"
                    value={coverageQuery}
                    onChange={(e) => setCoverageQuery(e.target.value)}
                    placeholder="Search country or network…"
                    className="flex-1 bg-transparent text-base text-text-primary placeholder:text-text-muted outline-none"
                  />
                  {coverageQuery && (
                    <button
                      onClick={() => setCoverageQuery("")}
                      className="rounded-md p-1.5 text-text-muted hover:text-text-primary transition-colors min-h-11 min-w-11 inline-flex items-center justify-center"
                      aria-label="Clear search"
                    >
                      <X className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </button>
                  )}
                </div>

                <div className="rounded-lg border border-border bg-surface-tint px-4">
                  {filteredCoverages.length > 0 ? (
                    filteredCoverages.map((c, i) => (
                      <CoverageRow key={`${c.code}-${i}`} coverage={c} />
                    ))
                  ) : (
                    <p className="py-6 text-center text-body-sm text-text-muted">
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
