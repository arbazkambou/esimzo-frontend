import type { NetworkSpeedsVerdict } from "@/lib/network-speeds/types";
import { cn } from "@/lib/utils";

type Props = {
  verdicts: NetworkSpeedsVerdict[];
};

const dotClass: Record<NetworkSpeedsVerdict["dot"], string> = {
  primary: "bg-primary",
  navy: "bg-brand-navy",
  muted: "bg-muted-foreground/50",
};

export default function NetworkSpeedsVerdicts({ verdicts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4">
      {verdicts.map((verdict) => (
        <div
          key={verdict.id}
          className="flex h-full flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:p-5 dark:border-slate-800 dark:bg-card"
        >
          <span className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-text-secondary sm:text-xs">
            <span
              className={cn(
                "size-2 shrink-0 rounded-full",
                dotClass[verdict.dot],
              )}
              aria-hidden="true"
            />
            {verdict.label}
          </span>
          <span className="text-sm font-bold leading-snug text-foreground sm:text-[15px] dark:text-white">
            {verdict.name}
          </span>
          <span className="text-xs font-semibold tabular text-text-secondary sm:text-[13.5px]">
            {verdict.value}
          </span>
        </div>
      ))}
    </div>
  );
}
