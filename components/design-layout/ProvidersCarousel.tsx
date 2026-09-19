"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { BarChart3, Check, ChevronRight, ArrowRight } from "lucide-react";
import { Provider } from "@/lib/types/providers.types";

interface ProvidersCarouselProps {
  providers?: Provider[];
}

export default function ProvidersCarousel({
  providers = [],
}: ProvidersCarouselProps) {
  const hasProviders = providers && providers.length > 0;

  return (
    <section
      id="providers"
      aria-label="Compare eSIM Providers"
      className="py-16 sm:py-24 bg-white dark:bg-background relative overflow-hidden"
    >
      {/* Soft ambient gradient glow matching screenshot */}
      <div className="absolute -left-28 -top-28 w-96 h-96 rounded-full bg-sky-100/50 dark:bg-sky-950/20 blur-3xl pointer-events-none" />
      <div className="absolute -right-28 -bottom-28 w-96 h-96 rounded-full bg-sky-100/40 dark:bg-sky-950/15 blur-3xl pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow badge matching screenshot */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF5FF] dark:bg-sky-950/50 border border-[#D6E8FF] dark:border-sky-900/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0084FF] dark:text-sky-400 shadow-2xs mb-4 select-none">
            <BarChart3 className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>eSIM PROVIDERS</span>
          </div>

          {/* Heading matching screenshot */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1E48] dark:text-white tracking-tight leading-tight mb-3">
            Compare 50+ eSIM providers{" "}
            <span className="text-[#FF5A22]">in one place</span>
          </h2>

          {/* Subtitle matching screenshot */}
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Find the best eSIM providers, compare plans, check coverage, and get
            the perfect eSIM for your next trip — all in one place.
          </p>
        </div>

        {/* Dynamic Provider Cards Horizontal Row / Carousel */}
        {hasProviders ? (
          <div className="relative overflow-hidden py-3">
            {/* Subtle fade edge masks */}
            <div className="absolute left-0 top-0 h-full w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none dark:from-background dark:via-background/80" />
            <div className="absolute right-0 top-0 h-full w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none dark:from-background dark:via-background/80" />

            <Marquee
              speed={32}
              pauseOnHover={true}
              gradient={false}
              autoFill={true}
              className="flex items-center py-2"
            >
              {providers.map((provider) => (
                <Link
                  key={provider.id || provider.slug}
                  href={`/provider/${provider.slug}`}
                  className="group mx-2 sm:mx-2.5 flex items-center justify-between gap-3.5 rounded-[20px] border border-slate-200/90 bg-white dark:bg-card dark:border-slate-800 px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#FF5A22]/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 shrink-0 min-w-[170px] sm:min-w-[190px]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Logo Squircle Box */}
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-1 border border-slate-100 dark:border-slate-800">
                      {provider.image ? (
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="font-extrabold text-sm text-[#0B1E48] dark:text-white">
                          {provider.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Name & Subtitle */}
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-xs sm:text-[13px] font-bold text-[#0B1E48] dark:text-white group-hover:text-[#FF5A22] transition-colors truncate leading-tight">
                        {provider.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal truncate leading-tight mt-0.5">
                        {provider.planCount
                          ? `${provider.planCount} Plans`
                          : "eSIM Data"}
                      </span>
                    </div>
                  </div>

                  {/* Circular Chevron Button */}
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100/90 dark:bg-slate-800 text-slate-400 group-hover:text-[#FF5A22] group-hover:bg-[#FFF0E8] transition-colors ml-1">
                    <ChevronRight className="h-3 w-3 stroke-[2.5]" />
                  </div>
                </Link>
              ))}
            </Marquee>
          </div>
        ) : null}

        {/* Soft Blue Callout Banner matching screenshot */}
        <div className="mt-10 sm:mt-12 max-w-xl mx-auto px-4">
          <div className="flex items-center gap-3.5 sm:gap-4 rounded-full bg-[#F0F7FF] dark:bg-card border border-[#E0EFFF] dark:border-slate-800 py-3.5 px-6 sm:px-8 shadow-[0_2px_12px_rgba(0,122,255,0.04)]">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00C48C] text-white shadow-xs">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs sm:text-[13px] font-bold text-[#0B1E48] dark:text-white leading-tight">
                Compare plans from 50+ providers
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Get the best coverage, data plans and prices for your
                destination.
              </div>
            </div>
          </div>
        </div>

        {/* Blue Outline Pill CTA Button matching screenshot */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#1B68F8] bg-white dark:bg-card px-7 py-3 text-xs sm:text-sm font-bold text-[#1B68F8] hover:bg-[#1B68F8] hover:text-white shadow-xs hover:shadow-md transition-all duration-200 group cursor-pointer"
          >
            <span>Compare plans from 50+ providers</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
