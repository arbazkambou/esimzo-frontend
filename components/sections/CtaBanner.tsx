"use client";

import React from "react";
import { Check, Plane, ShieldCheck, Zap } from "lucide-react";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { cn } from "@/lib/utils";

const trustItems = [
  {
    icon: Check,
    label: "Instant QR delivery at home",
    iconWrap: "bg-success-soft text-success",
  },
  {
    icon: Zap,
    label: "Dual-SIM ready",
    iconWrap: "bg-card text-primary border border-primary/20",
  },
  {
    icon: ShieldCheck,
    label: "No sponsored rankings",
    iconWrap: "bg-warning-soft text-warning",
  },
] as const;

export default function CtaBanner() {
  return (
    <section
      aria-label="Find Your eSIM Destination"
      className="py-[var(--section-y)] bg-background"
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary-soft shadow-card">
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-[var(--card-pad-lg)] py-10 text-center sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-md border border-primary/20 bg-card/80 px-3 py-1.5 text-caption font-semibold uppercase tracking-[0.08em] text-primary-text shadow-subtle">
              <Plane className="size-3.5 text-primary" strokeWidth={1.75} aria-hidden />
              Ready for takeoff?
            </div>

            <h2 className="text-h1 mb-4 max-w-2xl text-balance text-brand-navy">
              Get data that works,{" "}
              <span className="text-primary-text">the moment you land.</span>
            </h2>

            <p className="mx-auto mb-8 max-w-xl text-body leading-relaxed text-text-secondary sm:mb-10">
              Compare 30,000+ plans across 200+ countries. See the real price
              per GB, fair-use limits, hotspot rules, and local partner networks
              — before you buy.
            </p>

            <div className="mb-8 w-full max-w-2xl sm:mb-10">
              <SearchTrigger
                variant="bar"
                size="lg"
                placeholder="Where are you travelling to next?"
                buttonLabel="Compare Plans"
              />
            </div>

            <ul className="flex w-full max-w-3xl flex-nowrap items-center justify-center gap-x-3 overflow-x-auto border-t border-primary/15 pt-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-x-0 sm:pt-7 [&::-webkit-scrollbar]:hidden">
              {trustItems.map(({ icon: Icon, label, iconWrap }, i) => (
                <li
                  key={label}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-2 text-caption font-medium text-text-secondary sm:px-4",
                    i > 0 && "sm:border-l sm:border-primary/15"
                  )}
                >
                  <span
                    className={`inline-flex size-5 shrink-0 items-center justify-center rounded-full ${iconWrap}`}
                  >
                    <Icon className="size-3" strokeWidth={2.25} aria-hidden />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
