import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPopularCountries } from "@/lib/services/plans/plans.services";
import CountryCard from "../cards/CountryCard";

export default async function CountriesSection() {
  const popularCountries = await getPopularCountries();
  const countries = popularCountries.success ? popularCountries.data : [];

  return (
    <section
      id="countries"
      className="pt-6 sm:pt-8 pb-14 sm:pb-20 bg-background relative"
    >
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-[#FFF0E8] dark:bg-[#FF5A22]/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#FF5A22] mb-3.5 select-none">
            ALL DESTINATIONS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E48] dark:text-white tracking-tight leading-tight mb-3">
            Explore eSIM Plans by Country{" "}
            <span className="text-[#0EA5E9] block">
              (190+ Destinations)
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Find affordable local prepaid data packages across worldwide destinations with instant QR code delivery. Select your destination country to view plans and rates.
          </p>
        </div>

        {/* Dynamic Country Cards Grid */}
        <div className="grid grid-cols-1 gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {countries.slice(0, 15).map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>

        {/* View Regional Destinations CTA */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="#regions"
            className="inline-flex items-center gap-2.5 rounded-full border border-[#BCD8F6] dark:border-sky-800/80 bg-white dark:bg-card px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#0B1E48] dark:text-slate-200 hover:text-[#0284C7] hover:border-sky-400 shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
          >
            <span>Explore Regional & Multi-Country Bundles</span>
            <ArrowRight className="h-4 w-4 text-[#0284C7] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
