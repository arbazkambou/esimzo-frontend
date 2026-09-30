import React from "react";
import {
  Scale,
  Calculator,
  Gauge,
  RadioTower,
  Wifi,
  MessageSquareQuote,
} from "lucide-react";

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  tag: string;
}

const features: FeatureCard[] = [
  {
    title: "Providers can't pay to rank higher",
    description:
      "eSIMzo doesn’t sell “top spots.” Plans are sorted by measurable factors like price, validity, value per GB, and traveler ratings.",
    icon: Scale,
    iconBg: "bg-primary-soft dark:bg-primary/20",
    iconBorder: "border-primary/20 dark:border-slate-800",
    iconColor: "text-primary",
    tag: "100% Unbiased",
  },
  {
    title: "Price per GB (real value) is shown clearly",
    description:
      "A cheap-looking plan can be expensive when you do the math. eSIMzo highlights the value so you can compare cleanly.",
    icon: Calculator,
    iconBg: "bg-primary-soft dark:bg-primary/20",
    iconBorder: "border-primary/20 dark:border-slate-800",
    iconColor: "text-primary",
    tag: "Cost Breakdown",
  },
  {
    title: "Unlimited plans are treated with caution (as they should be)",
    description:
      "“Unlimited” often means “high-speed up to a cap, then slow.” Sometimes the post-cap speed is so low that maps and messaging become painful. We surface the fair-use limits and the slow-speed rules when providers disclose them.",
    icon: Gauge,
    iconBg: "bg-primary-soft dark:bg-primary/20",
    iconBorder: "border-primary/20 dark:border-slate-800",
    iconColor: "text-primary",
    tag: "Fair-Use Rules",
  },
  {
    title: "Telecom reality: coverage depends on the local network partner",
    description:
      "Two “Japan” plans can behave very differently depending on the network they roam on. Same destination, different partner carrier, different experience. That’s why reviews and coverage notes matter — and why we show them.",
    icon: RadioTower,
    iconBg: "bg-primary-soft dark:bg-primary/20",
    iconBorder: "border-primary/20 dark:border-slate-800",
    iconColor: "text-primary",
    tag: "Carrier Insights",
  },
  {
    title: "Hotspot/tethering isn't guaranteed",
    description:
      "Some plans block hotspot even if your phone supports it. If a provider restricts tethering, we flag it.",
    icon: Wifi,
    iconBg: "bg-success-soft dark:bg-success/20",
    iconBorder: "border-success/20 dark:border-slate-800",
    iconColor: "text-success",
    tag: "Tethering Flags",
  },
  {
    title: "Reviews aren't polished",
    description:
      "If activation fails, if support is slow, if speeds drop too hard — you’ll see that in the feedback.",
    icon: MessageSquareQuote,
    iconBg: "bg-muted dark:bg-slate-800",
    iconBorder: "border-border dark:border-slate-700",
    iconColor: "text-muted-foreground dark:text-slate-300",
    tag: "Raw Feedback",
  },
];

export default function WhyEsimzo() {
  return (
    <section
      id="why-esimzo"
      className="py-14 sm:py-20 bg-background relative overflow-hidden"
    >
      {/* Decorative World Map Grid / Globe Watermark clipped at top right */}
      <div className="hidden xl:block absolute -top-10 -right-16 w-[360px] h-[360px] opacity-[0.045] pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-foreground">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <ellipse cx="100" cy="100" rx="45" ry="90" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1.5" />
          <line x1="25" y1="60" x2="175" y2="60" stroke="currentColor" strokeWidth="1.5" />
          <line x1="25" y1="140" x2="175" y2="140" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header Wrapper */}
        <div className="relative mb-12 sm:mb-16">
          {/* Centered Main Header */}
          <div className="text-center max-w-2xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center justify-center rounded-full bg-primary-soft dark:bg-primary/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary dark:text-primary mb-3.5 select-none">
              WHY ESIMZO
            </div>

            {/* Main Heading strictly formatted in 2 clean lines */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground dark:text-white tracking-tight leading-tight mb-3">
              Built For Travelers Who Need Their Phone To Work{" "}
              <span className="text-primary block">
                (Not For Affiliate Rankings)
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto font-normal">
              Most “best eSIM” lists are basically the same five brands reshuffled. The problem is simple:
              rankings often follow commissions, not value.
            </p>
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-primary/30 dark:hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Squircle Icon on Left, Filter Tag on Right */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${feature.iconBg} border ${feature.iconBorder} shadow-2xs transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className={`h-5 w-5 sm:h-5.5 sm:w-5.5 ${feature.iconColor}`} strokeWidth={2.2} />
                    </div>

                    <span className="text-[11px] font-semibold text-primary dark:text-primary bg-primary-soft dark:bg-primary/20 px-3 py-0.5 rounded-full border border-primary/15 dark:border-primary/30 select-none">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground dark:text-white leading-snug mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
