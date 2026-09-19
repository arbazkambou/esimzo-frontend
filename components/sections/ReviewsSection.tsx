"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";

interface Review {
  id: string;
  name: string;
  location: string;
  avatarInitial: string;
  avatarBg: string;
  destination: string;
  flagUrl: string;
  provider: string;
  quote: string;
}

const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Marcus C.",
    location: "USA",
    avatarInitial: "M",
    avatarBg: "bg-blue-500 text-white",
    destination: "Japan",
    flagUrl: "https://flagcdn.com/w40/jp.png",
    provider: "Airalo",
    quote: "Instant 5G the moment wheels touched down at Narita. No airport Wi-Fi line needed.",
  },
  {
    id: "rev-2",
    name: "Elena R.",
    location: "Germany",
    avatarInitial: "E",
    avatarBg: "bg-purple-500 text-white",
    destination: "Europe",
    flagUrl: "https://flagcdn.com/w40/eu.png",
    provider: "Nomad",
    quote: "Laptop hotspotting worked smoothly on the train from Paris to Zurich for Zoom calls.",
  },
  {
    id: "rev-3",
    name: "Liam D.",
    location: "UK",
    avatarInitial: "L",
    avatarBg: "bg-amber-500 text-white",
    destination: "USA",
    flagUrl: "https://flagcdn.com/w40/us.png",
    provider: "Saily",
    quote: "Saved £110 compared to my carrier's roaming fee. T-Mobile 5G was rock solid.",
  },
  {
    id: "rev-4",
    name: "Sophie M.",
    location: "France",
    avatarInitial: "S",
    avatarBg: "bg-emerald-500 text-white",
    destination: "Thailand",
    flagUrl: "https://flagcdn.com/w40/th.png",
    provider: "Ubigi",
    quote: "Scanned the QR code before flying. Landed in Bangkok with instant high-speed data for $6.",
  },
  {
    id: "rev-5",
    name: "Tariq K.",
    location: "Canada",
    avatarInitial: "T",
    avatarBg: "bg-rose-500 text-white",
    destination: "UAE",
    flagUrl: "https://flagcdn.com/w40/ae.png",
    provider: "Yesim",
    quote: "Perfect speeds across Dubai and Abu Dhabi. Half the price of the airport SIM booths.",
  },
  {
    id: "rev-6",
    name: "David H.",
    location: "Australia",
    avatarInitial: "D",
    avatarBg: "bg-teal-500 text-white",
    destination: "Turkey",
    flagUrl: "https://flagcdn.com/w40/tr.png",
    provider: "GigSky",
    quote: "Traveled from Istanbul to Cappadocia with zero dropouts. Effortless activation.",
  },
];

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      aria-label="Traveler Reviews"
      className="py-14 sm:py-20 bg-background relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-[#EBF5FE] dark:bg-[#0EA5E9]/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] mb-3.5 select-none">
            VERIFIED TRAVELER REVIEWS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E48] dark:text-white tracking-tight leading-tight mb-3">
            Real Traveler Reviews{" "}
            <span className="text-[#FF5A22] block">
              (From People Who Actually Landed)
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto font-normal">
            Honest feedback on gate activation, real connection speeds, and carrier roaming savings.
          </p>
        </div>

        {/* Smooth Moving Review Cards Carousel */}
        <div className="relative overflow-hidden py-2">
          {/* Subtle gradient edge masks */}
          <div className="absolute left-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-r from-background via-background/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-l from-background via-background/60 to-transparent z-10 pointer-events-none" />

          <Marquee
            speed={28}
            pauseOnHover={true}
            gradient={false}
            autoFill={true}
            className="flex items-center py-2"
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="w-[300px] sm:w-[340px] shrink-0 mx-2.5 sm:mx-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:-translate-y-[2.5px] hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md hover:shadow-sky-500/5 hover:bg-[#F8FBFE] dark:hover:bg-slate-800/90 transition-all duration-[240ms] ease-out flex flex-col justify-between group"
              >
                {/* Top Row: Stars + Destination Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]"
                      />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F7FE] dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 px-2.5 py-0.5 text-[11px] font-semibold text-[#0284C7] dark:text-sky-300">
                    <div className="relative h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] border border-slate-200/60">
                      <Image
                        src={rev.flagUrl}
                        alt={rev.destination}
                        fill
                        sizes="20px"
                        className="object-cover"
                      />
                    </div>
                    <span>{rev.destination}</span>
                  </div>
                </div>

                {/* Short, Punchy Quote */}
                <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-4 min-h-[38px]">
                  "{rev.quote}"
                </p>

                {/* Bottom Row: User info & Provider tag */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${rev.avatarBg}`}
                    >
                      {rev.avatarInitial}
                    </div>
                    <div className="min-w-0 flex items-center gap-1">
                      <span className="text-xs font-bold text-[#0B1E48] dark:text-white truncate">
                        {rev.name}
                      </span>
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200/60 dark:border-slate-700 shrink-0">
                    {rev.provider}
                  </span>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
