import { Country } from "@/lib/types/plans.types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PropType = {
  country: Country;
};

export default function CountryCard({ country }: PropType) {
  const { name, flag, slug } = country;

  return (
    <Link
      href={`/${slug}`}
      className="group relative flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card p-3.5 sm:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:-translate-y-[2.5px] hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md hover:shadow-sky-500/5 hover:bg-[#F8FBFE] dark:hover:bg-slate-800/90 active:scale-[0.985] transition-all duration-[240ms] ease-out"
    >
      <div className="relative h-7 w-10 sm:h-8 sm:w-11 shrink-0 overflow-hidden rounded-[5px] border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-2xs">
        <Image
          src={flag}
          alt={name}
          fill
          sizes="48px"
          className="object-cover group-hover:scale-[1.04] transition-transform duration-[240ms] ease-out"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-[#0B1E48] dark:text-white group-hover:text-[#0284C7] transition-colors duration-[240ms] ease-out">
          {name}
        </p>

        <div className="flex items-center mt-0.5">
          <span className="text-[11.5px] sm:text-xs text-slate-400 dark:text-slate-400 font-normal">
            View Plans
          </span>
        </div>
      </div>

      <div className="flex h-7 w-7 sm:h-7.5 sm:w-7.5 shrink-0 items-center justify-center rounded-full bg-[#F0F7FE] dark:bg-sky-950/40 text-[#0284C7] dark:text-sky-400 group-hover:bg-[#0284C7] group-hover:text-white transition-all duration-[240ms] ease-out ml-auto">
        <ChevronRight
          size={15}
          className="transition-transform duration-[240ms] ease-out group-hover:translate-x-[3px]"
        />
      </div>
    </Link>
  );
}
