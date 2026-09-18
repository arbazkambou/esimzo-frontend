import Link from "next/link";
import Image from "next/image";
import AnimatedAirplane from "@/components/common/AnimatedAirplane";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { Check, Globe, RefreshCw, ShieldCheck } from "lucide-react";

const popularDestinationsRow1 = [
  {
    flagImg: "https://flagcdn.com/w40/eu.png",
    name: "Europe",
    link: "/region/europe",
  },
  { flagImg: "https://flagcdn.com/w40/jp.png", name: "Japan", link: "/japan" },
  {
    flagImg: "https://flagcdn.com/w40/us.png",
    name: "USA",
    link: "/united-states",
  },
  {
    flagImg: "https://flagcdn.com/w40/gb.png",
    name: "UK",
    link: "/united-kingdom",
  },
  {
    flagImg: "https://flagcdn.com/w40/ae.png",
    name: "UAE",
    link: "/united-arab-emirates",
  },
];

const popularDestinationsRow2 = [
  {
    flagImg: "https://flagcdn.com/w40/tr.png",
    name: "Turkey",
    link: "/turkey",
  },
  {
    flagImg: "https://flagcdn.com/w40/th.png",
    name: "Thailand",
    link: "/thailand",
  },
  { isGlobal: true, name: "Global", link: "/global" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden -mt-16 pt-24 pb-14 md:pt-30 md:pb-18"
    >
      {/* Background Image from ui-assets (bg-hero-new.png with landmarks skyline) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <Image
          src="/images/hero-bg-new.png"
          alt="Sky Travel Background with Landmarks"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Very subtle soft overlay for gentle text contrast without washing out the artwork */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent dark:from-background/25 dark:to-transparent" />
        {/* Subtle gradient at the bottom edge to blend with page content */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/30 to-transparent" />
      </div>

      {/* Moving Aeroplane Trail Animation */}
      <AnimatedAirplane />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          {/* ── Left: copy + CTA ── */}
          <div className="flex flex-col items-start gap-5 w-full lg:col-span-7">
            {/* Eyebrow badge matching screenshot */}
            <div className="inline-flex items-center gap-3 sm:gap-3.5 rounded-full border border-white/90 bg-white/95 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-[13px] font-medium text-slate-800 shadow-sm backdrop-blur-md dark:border-slate-700/80 dark:bg-card/90 dark:text-slate-200">
              <span className="inline-flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                <Globe className="h-4 w-4 text-[#0ea5e9] shrink-0 stroke-[2.2]" />
                <span>200+ Countries</span>
              </span>
              <span className="h-3.5 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />
              <span className="inline-flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                <RefreshCw className="h-3.5 w-3.5 text-[#10b981] shrink-0 stroke-[2.2]" />
                <span>Updated Daily</span>
              </span>
              <span className="h-3.5 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />
              <span className="inline-flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                <ShieldCheck className="h-4 w-4 text-[#f97316] shrink-0 stroke-[2.2]" />
                <span>No Paid Placements</span>
              </span>
            </div>

            {/* Heading matching screenshot: strictly max 2 lines on desktop */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.25rem] xl:text-[2.85rem] 2xl:text-[3.25rem] font-extrabold leading-[1.14] tracking-tight">
              <span className="block text-[#0B1E48] dark:text-white lg:whitespace-nowrap">
                Compare Travel eSIM Plans
              </span>
              <span className="block text-[#ff5a22] lg:whitespace-nowrap">
                Without Sponsored Rankings.
              </span>
            </h1>

            {/* Subtext */}
            <p className="max-w-lg text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              Find the best eSIM for your trip across{" "}
              <span className="font-semibold text-slate-950 dark:text-white">
                200+ countries
              </span>
              . Sort by{" "}
              <span className="font-semibold text-slate-950 dark:text-white">
                price per GB
              </span>
              , validity, speed limits, and traveler ratings — not who paid to
              be first.
            </p>

            {/* Search bar + microcopy + popular tags */}
            <div className="w-full">
              <SearchTrigger
                variant="bar"
                placeholder="Where are you travelling to?"
              />

              {/* Instant delivery microcopy */}
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                </span>
                <span className="font-medium">
                  Instant email delivery.
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  Set it up at home. Land with data already working.
                </span>
              </div>

              {/* Popular tags in 2 rows matching screenshot */}
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mr-0.5">
                    Popular destinations:
                  </span>
                  {popularDestinationsRow1.map((d) => (
                    <Link
                      key={d.name}
                      href={d.link}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 dark:bg-card/90 dark:border-border/80 px-3 py-1 text-xs font-medium text-slate-800 dark:text-slate-200 shadow-2xs transition-all hover:border-[#ff5a22]/50 hover:bg-white hover:text-[#ff5a22] hover:shadow-xs"
                    >
                      <div className="relative h-2.5 w-4 overflow-hidden rounded-[2px] border border-slate-200 shrink-0">
                        <Image
                          src={d.flagImg!}
                          alt={d.name}
                          fill
                          sizes="16px"
                          className="object-cover"
                        />
                      </div>
                      <span>{d.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 pl-0 sm:pl-[148px]">
                  {popularDestinationsRow2.map((d) => (
                    <Link
                      key={d.name}
                      href={d.link}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 dark:bg-card/90 dark:border-border/80 px-3 py-1 text-xs font-medium text-slate-800 dark:text-slate-200 shadow-2xs transition-all hover:border-[#ff5a22]/50 hover:bg-white hover:text-[#ff5a22] hover:shadow-xs"
                    >
                      {d.isGlobal ? (
                        <Globe className="h-3.5 w-3.5 text-[#ff5a22] shrink-0" />
                      ) : (
                        <div className="relative h-2.5 w-4 overflow-hidden rounded-[2px] border border-slate-200 shrink-0">
                          <Image
                            src={d.flagImg!}
                            alt={d.name}
                            fill
                            sizes="16px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span>{d.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Simplified Animated Hero SVG Illustration (brought down) ── */}
          <div className="relative flex items-center justify-center lg:justify-end translate-y-3 sm:translate-y-6 lg:translate-y-8 lg:col-span-5">
            <div className="relative z-10 w-full max-w-[660px] drop-shadow-md">
              <Image
                src="/images/update-sidebar-svg.svg"
                alt="eSIMzo App Live Comparison"
                width={1380}
                height={1140}
                unoptimized
                priority
                className="w-full h-auto object-contain select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
