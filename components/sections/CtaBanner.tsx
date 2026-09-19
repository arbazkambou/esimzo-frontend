"use client";

import React from "react";
import { Sparkles, Check, ShieldCheck, Zap, Globe2 } from "lucide-react";
import { SearchTrigger } from "@/components/search/SearchTrigger";

export default function CtaBanner() {
  return (
    <section
      aria-label="Find Your eSIM Destination"
      className="py-14 sm:py-20 bg-background relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4">
        {/* Curved Hero-Grade Banner Card */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#081533] via-[#0B1E48] to-[#0F2D6B] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-blue-950/25 border border-white/10">
          {/* Ambient luminous background orbs */}
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#FF5A22]/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-[#0EA5E9]/25 blur-3xl pointer-events-none" />

          {/* Decorative Flight Trail Pattern SVG */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-100,250 C200,100 400,400 700,200 C900,50 1100,300 1200,150"
                stroke="white"
                strokeWidth="2.5"
                strokeDasharray="8 8"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-sky-300 shadow-2xs mb-4 select-none">
              READY FOR TAKEOFF?
            </div>

            {/* H2 Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Get data that works{" "}
              <span className="text-[#FF5A22] block">
                the moment you land.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-xl mx-auto mb-8 font-normal">
              Compare 30,000+ plans across 200+ countries. See the real price per GB, fair-use limits, hotspot rules, and local partner networks — before you buy.
            </p>

            {/* Interactive Live Search Trigger */}
            <div className="w-full max-w-xl mb-8">
              <SearchTrigger
                variant="bar"
                placeholder="Where are you travelling to next?"
                buttonLabel="Compare Plans"
              />
            </div>

            {/* Trust & Peace of Mind Microcopy */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-[13px] text-blue-200/80 font-medium">
              <div className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>Instant QR delivery at home</span>
              </div>

              <div className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <Zap className="h-2.5 w-2.5 stroke-[2.5]" />
                </span>
                <span>Dual-SIM ready (keep your regular number)</span>
              </div>

              <div className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <ShieldCheck className="h-2.5 w-2.5 stroke-[2.5]" />
                </span>
                <span>100% unbiased (zero sponsored rankings)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
