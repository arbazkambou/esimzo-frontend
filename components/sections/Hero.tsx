import Image from "next/image";
import AnimatedAirplane from "@/components/common/AnimatedAirplane";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import PopularDestinationsMarquee from "@/components/sections/PopularDestinationsMarquee";
import { Check, Globe, RefreshCw, ShieldCheck } from "lucide-react";

const trustBadges = [
  { icon: Globe, label: "200+ Countries", iconClass: "text-primary" },
  { icon: RefreshCw, label: "Updated Daily", iconClass: "text-success" },
  {
    icon: ShieldCheck,
    label: "No Paid Placements",
    iconClass: "text-primary",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden -mt-16 pt-20 pb-10 sm:pt-24 sm:pb-14 md:pt-30 md:pb-18"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-soft via-primary-muted/40 to-background dark:from-slate-900 dark:via-slate-900/90 dark:to-background lg:hidden" />

        <div className="hidden lg:block absolute inset-0">
          <Image
            src="/images/hero-bg-new.png"
            alt="Sky Travel Background with Landmarks"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent dark:from-background/25 dark:to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/30 to-transparent" />
      </div>

      <div className="hidden lg:block">
        <AnimatedAirplane />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="flex w-full flex-col items-stretch gap-5 lg:col-span-7 lg:max-w-none">
            {/* Trust badges — always one line */}
            <div className="inline-flex w-full max-w-full items-center justify-between sm:w-fit sm:justify-start gap-1 min-[380px]:gap-1.5 sm:gap-3.5 rounded-full border border-white/90 bg-white/95 px-2.5 min-[380px]:px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] min-[380px]:text-[11px] sm:text-[13px] font-medium text-slate-800 shadow-sm backdrop-blur-md select-none whitespace-nowrap overflow-x-auto scrollbar-none">
              {trustBadges.map(({ icon: Icon, label, iconClass }, i) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0"
                >
                  {i > 0 && (
                    <span className="mr-1 sm:mr-2 h-2.5 sm:h-3.5 w-px bg-slate-200 shrink-0" />
                  )}
                  <Icon
                    className={`h-3 w-3 sm:h-4 sm:w-4 shrink-0 ${iconClass}`}
                    strokeWidth={2.2}
                  />
                  <span>{label}</span>
                </span>
              ))}
            </div>

            <h1 className="text-[1.625rem] leading-[1.2] tracking-tight font-semibold text-brand-navy min-[375px]:text-[1.85rem] sm:text-4xl lg:text-[2.25rem] xl:text-[2.85rem] 2xl:text-[3.25rem] sm:leading-[1.15] lg:leading-[1.14]">
              <span className="block sm:whitespace-nowrap">
                Compare Travel eSIM&nbsp;Plans
              </span>
              <span className="block text-primary sm:whitespace-nowrap">
                Without Sponsored&nbsp;Rankings.
              </span>
            </h1>

            <p className="w-full max-w-lg text-[15px] leading-relaxed text-text-secondary sm:text-lg">
              Find the best eSIM for your trip across{" "}
              <span className="font-semibold text-brand-navy">
                200+ countries
              </span>
              . Sort by{" "}
              <span className="font-semibold text-brand-navy">
                price per GB
              </span>
              , validity, speed limits, and traveler ratings — not who paid to
              be first.
            </p>

            <div className="flex w-full flex-col gap-4">
              <SearchTrigger
                variant="bar"
                placeholder="Where are you travelling to?"
              />

              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4 text-[13px]">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span className="font-medium text-text-secondary leading-snug">
                    Instant email delivery.
                  </span>
                </div>

                <div className="hidden sm:block h-7 w-px bg-border shrink-0" />

                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span className="font-medium text-text-secondary leading-snug">
                    Set it up at home. Land with data already working.
                  </span>
                </div>
              </div>

              <PopularDestinationsMarquee />
            </div>
          </div>

          <div className="hidden lg:flex relative items-center justify-end translate-y-3 sm:translate-y-6 lg:translate-y-8 lg:col-span-5">
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
