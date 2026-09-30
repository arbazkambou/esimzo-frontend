import Link from "next/link";
import { Search, SlidersHorizontal, ArrowRight, Check } from "lucide-react";

type Step = {
  badge: string;
  badgeBg: string;
  badgeColor: string;
  title: string;
  description: string;
  icon: React.ElementType;
  boxBg: string;
  boxBorder: string;
  boxShadow: string;
  iconColor: string;
  accentColor: string;
  arrowBg: string;
  arrowColor: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  steps?: Step[];
  ctaLabel?: string;
  ctaHref?: string;
};

const defaultSteps: Step[] = [
  {
    badge: "01",
    badgeBg: "bg-primary-soft dark:bg-primary/20",
    badgeColor: "text-primary",
    title: "1) Search your destination",
    description:
      "Country, region, or global — it works for a single city break or a multi-stop trip.",
    icon: Search,
    boxBg: "bg-gradient-to-b from-white to-primary-soft dark:from-card dark:to-primary/10",
    boxBorder: "border-primary/20 dark:border-slate-800",
    boxShadow: "shadow-[0_6px_16px_rgba(255,107,53,0.12)]",
    iconColor: "text-primary",
    accentColor: "text-primary",
    arrowBg: "bg-primary-soft dark:bg-primary/20",
    arrowColor: "text-primary",
  },
  {
    badge: "02",
    badgeBg: "bg-primary-soft dark:bg-primary/20",
    badgeColor: "text-primary",
    title: "2) Compare what matters",
    description:
      "Filter by data size, trip length, top-ups, and cost per GB. If a plan slows down after a cap, you’ll know.",
    icon: SlidersHorizontal,
    boxBg: "bg-gradient-to-b from-white to-primary-soft dark:from-card dark:to-primary/10",
    boxBorder: "border-primary/20 dark:border-slate-800",
    boxShadow: "shadow-[0_6px_16px_rgba(255,107,53,0.12)]",
    iconColor: "text-primary",
    accentColor: "text-primary",
    arrowBg: "bg-primary-soft dark:bg-primary/20",
    arrowColor: "text-primary",
  },
  {
    badge: "03",
    badgeBg: "bg-success-soft dark:bg-success/20",
    badgeColor: "text-success",
    title: "3) Buy direct from the provider",
    description:
      "Choose your plan, apply a promo code (if available), install the eSIM, and you’re done.",
    icon: Check,
    boxBg: "bg-gradient-to-b from-white to-success-soft dark:from-card dark:to-success/10",
    boxBorder: "border-success/20 dark:border-slate-800",
    boxShadow: "shadow-[0_6px_16px_rgba(16,185,129,0.12)]",
    iconColor: "text-success",
    accentColor: "text-success",
    arrowBg: "bg-success-soft dark:bg-success/20",
    arrowColor: "text-success",
  },
];

export default function CompareAndSurf({
  heading = "Pick the right travel eSIM in 3 steps (without 12 tabs open)",
  subheading = "Buying an eSIM should be simple, but most sites hide the details that actually matter: speed drops, fair-use caps, hotspot restrictions, and confusing activation rules. eSIMzo puts those details where you can see them before you buy.",
  steps = defaultSteps,
  ctaLabel = "Compare Plans Now",
  ctaHref = "#hero",
}: Props) {
  return (
    <section
      id="how-it-works"
      className="relative py-14 sm:py-20 bg-background overflow-hidden"
    >
      {/* Subtle world map dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--brand-navy) 1.2px, transparent 1.2px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-primary-soft dark:bg-primary/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3.5 select-none">
            HOW ESIMZO WORKS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground dark:text-white tracking-tight leading-tight mb-3">
            Pick The Right Travel eSIM In 3 Steps{" "}
            <span className="text-primary block">
              (Without 12 Tabs Open)
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto font-normal">
            {subheading}
          </p>
        </div>

        {/* 3 Step Cards Grid with Connecting Dashed Line */}
        <div className="relative mb-14 sm:mb-18">
          {/* Horizontal Connecting Rounded Dashed Line precisely through the badge centers on desktop */}
          <div className="hidden lg:block absolute -top-[3px] left-[14%] right-[14%] h-1 z-0 pointer-events-none">
            <svg className="w-full h-2 overflow-visible" preserveAspectRatio="none">
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#FFE0D1"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-primary/30 dark:hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between pt-8 sm:pt-9 min-h-[210px]"
                >
                  {/* Step Number Badge positioned at top-left edge */}
                  <div
                    className={`absolute -top-3.5 left-6 rounded-full ${step.badgeBg} ${step.badgeColor} px-3 py-0.5 text-xs font-black shadow-xs tracking-wider select-none border border-white dark:border-card`}
                  >
                    {step.badge}
                  </div>

                  {/* Card Content Row: 3D Squircle Icon on Left, Text on Right */}
                  <div className="flex items-start gap-4 sm:gap-4.5">
                    {/* 3D Soft Neumorphic Icon Container with colored drop shadow */}
                    <div
                      className={`flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl ${step.boxBg} border ${step.boxBorder} ${step.boxShadow} transition-transform duration-300 group-hover:scale-105`}
                    >
                      {step.icon === Check ? (
                        <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-success text-white shadow-sm shadow-success/30">
                          <Check className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3]" />
                        </div>
                      ) : (
                        <Icon
                          className={`h-7 w-7 sm:h-8 sm:w-8 ${step.iconColor}`}
                          strokeWidth={2.2}
                        />
                      )}
                    </div>

                    {/* Text block */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3 className="text-base sm:text-[17px] font-bold text-foreground dark:text-white leading-snug mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Step progress label & Arrow Pill */}
                  <div className="mt-7 pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60">
                    <span className={`text-xs font-bold ${step.accentColor}`}>
                      Step {idx + 1} of 3
                    </span>
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft dark:bg-primary/20 text-primary dark:text-primary transition-transform duration-200 group-hover:translate-x-1 shrink-0"
                    >
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button with Playful Burst Accent Rays */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative inline-flex items-center justify-center">
            {/* Left Burst Rays */}
            <span className="absolute -top-3.5 left-4 w-3.5 h-[2.5px] bg-primary rounded-full rotate-[-45deg] opacity-90 pointer-events-none" />
            <span className="absolute -top-1 -left-1 w-3.5 h-[2.5px] bg-primary rounded-full rotate-[-75deg] opacity-90 pointer-events-none" />

            {/* Right Burst Rays */}
            <span className="absolute -top-3.5 right-4 w-3.5 h-[2.5px] bg-primary rounded-full rotate-[45deg] opacity-90 pointer-events-none" />
            <span className="absolute -top-1 -right-1 w-3.5 h-[2.5px] bg-primary rounded-full rotate-[75deg] opacity-90 pointer-events-none" />

            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary px-9 py-3.5 sm:px-11 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-primary/30 transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* Under-CTA Microcopy */}
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-3 text-center select-none">
            Same plans. Clearer information.
          </p>
        </div>
      </div>
    </section>
  );
}
