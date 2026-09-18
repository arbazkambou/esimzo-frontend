"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Image from "next/image";
import { Provider } from "@/lib/types/providers.types";

interface ProvidersCarouselProps {
  providers?: Provider[];
}

// Curated top brands matching the high-fidelity screenshot
const fallbackBrands = [
  {
    name: "eSIM Card",
    href: "/provider/esim-card",
    logo: (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-xs shadow-xs">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="3" />
            <path d="M8 6h.01" />
            <path d="M12 6h.01" />
            <path d="M8 10h.01" />
            <path d="M12 10h.01" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
          </svg>
        </div>
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm tracking-tight">eSIM Card</span>
      </div>
    ),
  },
  {
    name: "airalo",
    href: "/provider/airalo",
    logo: (
      <div className="flex items-center gap-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-orange-500 text-white">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        </div>
        <span className="font-bold text-slate-900 dark:text-white text-base tracking-tighter">airalo</span>
      </div>
    ),
  },
  {
    name: "Holafly",
    href: "/provider/holafly",
    logo: (
      <div className="flex items-center gap-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF2D55] text-white font-extrabold text-sm shadow-xs">
          H
        </div>
        <span className="font-bold text-[#FF2D55] text-base tracking-tight">Holafly</span>
      </div>
    ),
  },
  {
    name: "Nomad",
    href: "/provider/nomad",
    logo: (
      <div className="flex items-center gap-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1B68F8] text-white font-black text-sm shadow-xs">
          N
        </div>
        <span className="font-bold text-[#1B68F8] text-base tracking-tight">Nomad</span>
      </div>
    ),
  },
  {
    name: "Saily",
    href: "/provider/saily",
    logo: (
      <div className="flex items-center gap-1">
        <span className="font-black text-slate-950 dark:text-white text-lg tracking-tight">Saily</span>
      </div>
    ),
  },
  {
    name: "Ubigi",
    href: "/provider/ubigi",
    logo: (
      <div className="flex items-center gap-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs">
          <svg className="h-4 w-4 text-[#00A3E0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-base tracking-tight">Ubigi</span>
      </div>
    ),
  },
  {
    name: "maya",
    href: "/provider/maya",
    logo: (
      <div className="flex items-center">
        <span className="font-extrabold text-[#0B5CFF] text-lg tracking-tighter">maya</span>
      </div>
    ),
  },
  {
    name: "RedteaGO",
    href: "/provider/redteago",
    logo: (
      <div className="flex items-center gap-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E52828] text-white font-bold text-xs shadow-xs">
          <span className="text-white text-[11px] font-black">R</span>
        </div>
        <span className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">Redtea<span className="text-[#E52828]">GO</span></span>
      </div>
    ),
  },
  {
    name: "Yesim",
    href: "/provider/yesim",
    logo: (
      <div className="flex items-center gap-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF6200] text-white font-bold text-xs shadow-xs">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="14" width="3" height="7" rx="1" />
            <rect x="8" y="10" width="3" height="11" rx="1" />
            <rect x="13" y="6" width="3" height="15" rx="1" />
            <rect x="18" y="2" width="3" height="19" rx="1" />
          </svg>
        </div>
        <span className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">Yesim</span>
      </div>
    ),
  },
  {
    name: "aloSIM",
    href: "/provider/alosim",
    logo: (
      <div className="flex items-center">
        <span className="font-black text-[#0052FF] text-base tracking-tight">alo<span className="font-bold text-slate-900 dark:text-white">SIM</span></span>
      </div>
    ),
  },
];

export default function ProvidersCarousel({
  providers = [],
}: ProvidersCarouselProps) {
  // If dynamic providers exist and have valid images, incorporate them
  const hasDynamicProviders = providers && providers.length > 0;

  return (
    <section className="w-full relative z-20 -mt-6 sm:-mt-8 mb-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Floating white card container matching screenshot */}
        <div className="rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-card/95 backdrop-blur-md border border-slate-100 dark:border-border/60 shadow-xl shadow-slate-900/5 p-4 sm:py-4.5 sm:px-6 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          {/* Heading label matching screenshot */}
          <div className="shrink-0 text-center lg:text-left">
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-normal whitespace-nowrap">
              A growing directory of{" "}
              <span className="font-bold text-slate-900 dark:text-white">120+</span> travel
              eSIM brands
            </p>
          </div>

          {/* Continuous Smooth Infinite Marquee (rmarquee) */}
          <div className="relative overflow-hidden flex-1 w-full">
            {/* Gradient fade edge masks */}
            <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none dark:from-card dark:via-card/80" />
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none dark:from-card dark:via-card/80" />

            <Marquee
              speed={36}
              pauseOnHover={true}
              gradient={false}
              autoFill={true}
              className="flex items-center py-1"
            >
              {hasDynamicProviders ? (
                providers.map((provider) => (
                  <Link
                    key={provider.id || provider.slug}
                    href={`/provider/${provider.slug}`}
                    className="mx-5 md:mx-7 flex items-center gap-2.5 opacity-85 hover:opacity-100 transition-all duration-200 hover:scale-105 shrink-0"
                  >
                    {provider.image ? (
                      <Image
                        src={provider.image}
                        alt={provider.name}
                        width={28}
                        height={28}
                        className="rounded-lg object-contain"
                      />
                    ) : null}
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {provider.name}
                    </span>
                  </Link>
                ))
              ) : (
                fallbackBrands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="mx-5 md:mx-7 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:scale-105 shrink-0"
                  >
                    {brand.logo}
                  </Link>
                ))
              )}

              {/* + Many more pill button matching screenshot */}
              <Link
                href="/plans"
                className="mx-5 md:mx-7 inline-flex items-center justify-center rounded-full border border-slate-200/90 bg-white/90 dark:bg-card dark:border-border/80 px-4 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs hover:border-slate-400 hover:bg-white dark:hover:bg-card hover:text-primary transition-all shrink-0 cursor-pointer"
              >
                + Many more
              </Link>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
