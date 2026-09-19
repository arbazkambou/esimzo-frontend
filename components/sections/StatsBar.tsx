import React from "react";
import { Database, Globe, RefreshCw, ShieldCheck } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

const stats: StatItem[] = [
  {
    value: "30,000+",
    label: "eSIM plans listed",
    icon: Database,
    iconColor: "text-[#FF5A22]",
    iconBg: "bg-[#FFF0E8] dark:bg-[#FF5A22]/20",
  },
  {
    value: "200+",
    label: "countries covered",
    icon: Globe,
    iconColor: "text-[#0EA5E9]",
    iconBg: "bg-[#E8F5FF] dark:bg-[#0EA5E9]/20",
  },
  {
    value: "Daily",
    label: "price updates",
    icon: RefreshCw,
    iconColor: "text-[#10B981]",
    iconBg: "bg-[#E8FBF2] dark:bg-[#10B981]/20",
  },
  {
    value: "100% Unbiased",
    label: "No sponsored rankings",
    icon: ShieldCheck,
    iconColor: "text-[#8B5CF6]",
    iconBg: "bg-[#F2EDFE] dark:bg-[#8B5CF6]/20",
  },
];

export default function StatsBar() {
  return (
    <section
      aria-label="eSIMzo Key Statistics"
      className="w-full relative z-10 py-3 sm:py-5"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Floating rounded white card */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-card/95 backdrop-blur-md px-5 py-3.5 sm:px-8 sm:py-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-center justify-between gap-y-4 gap-x-2">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <React.Fragment key={stat.label}>
                  <div className="flex items-center gap-3 sm:gap-3.5 w-full sm:w-auto min-w-0 justify-start sm:justify-center">
                    {/* Circle Icon matching screenshot */}
                    <div
                      className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full ${stat.iconBg} ${stat.iconColor} transition-transform duration-200 hover:scale-105`}
                    >
                      <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 stroke-[2]" />
                    </div>

                    {/* Stat Numbers and Label */}
                    <div className="min-w-0 text-left">
                      <div className="text-base sm:text-lg font-extrabold tracking-tight text-[#0B1E48] dark:text-white leading-tight">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5 whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>

                  {/* Centered vertical divider between items on desktop */}
                  {idx < stats.length - 1 && (
                    <div className="hidden lg:block h-9 w-px bg-slate-200/80 dark:bg-slate-700/80 shrink-0 mx-2 xl:mx-4" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
