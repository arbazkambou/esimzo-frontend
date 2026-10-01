import { Skeleton } from "@/components/ui/skeleton";

function PlanCardSkeleton() {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
      {/* Header: logo + provider/name + chevron */}
      <div className="flex items-start gap-3 px-3.5 pt-3.5 pb-3 sm:px-4 sm:pt-4">
        <Skeleton className="size-10 shrink-0 rounded-lg sm:size-11" />
        <div className="min-w-0 flex-1 space-y-1.5 pt-0.5">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3 w-40 max-w-full" />
          <Skeleton className="h-2.5 w-20" />
        </div>
        <Skeleton className="size-8 shrink-0 rounded-full" />
      </div>

      {/* Stats strip: Data · Validity · Price */}
      <div className="grid grid-cols-3 border-t border-border bg-muted/40">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`flex flex-col gap-1.5 px-3 py-3 ${
              i < 2 ? "border-r border-border" : ""
            }`}
          >
            <Skeleton className="h-2.5 w-10" />
            <Skeleton className="h-3.5 w-14" />
          </div>
        ))}
      </div>

      {/* Feature chips footer */}
      <div className="flex flex-wrap items-center gap-1.5 border-t border-border bg-muted/25 px-3.5 py-2.5 sm:px-4">
        <Skeleton className="h-5 w-12 rounded-md" />
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-14 rounded-md" />
      </div>
    </article>
  );
}

function DesktopRowSkeleton() {
  return (
    <div className="flex items-center border-b border-border px-5 py-4 last:border-b-0">
      {/* Plan & Provider — ~31% */}
      <div className="flex w-[31%] shrink-0 items-center gap-3 pr-3">
        <Skeleton className="size-11 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3 w-36 max-w-full" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </div>

      {/* Data */}
      <div className="w-[9%] shrink-0 px-1">
        <Skeleton className="h-3.5 w-12" />
      </div>

      {/* Validity */}
      <div className="w-[11%] shrink-0 px-1">
        <Skeleton className="h-3.5 w-14" />
      </div>

      {/* Price/GB */}
      <div className="w-[10%] shrink-0 px-1">
        <Skeleton className="h-3.5 w-12" />
      </div>

      {/* Price */}
      <div className="w-[11%] shrink-0 px-1">
        <Skeleton className="h-4 w-14" />
      </div>

      {/* Features */}
      <div className="flex w-[21%] shrink-0 flex-wrap gap-1.5 px-1">
        <Skeleton className="h-5 w-12 rounded-md" />
        <Skeleton className="h-5 w-14 rounded-md" />
      </div>

      {/* Action */}
      <div className="flex w-[7%] shrink-0 justify-center">
        <Skeleton className="size-8 rounded-full" />
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div
      className="mt-2 space-y-3 sm:mt-4"
      aria-busy="true"
      aria-label="Loading plans"
    >
      {/* Mobile card skeletons — mirrors PlanMobileCard */}
      <div className="flex flex-col gap-2.5 lg:hidden">
        <Skeleton className="h-3.5 w-44" />
        {Array.from({ length: 4 }).map((_, i) => (
          <PlanCardSkeleton key={i} />
        ))}
      </div>

      {/* Desktop table skeleton — mirrors PlansTable */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-subtle lg:block">
        <div className="flex items-center border-b border-border bg-muted/60 px-5 py-4">
          <div className="w-[31%] shrink-0 pr-3">
            <Skeleton className="h-3.5 w-28" />
          </div>
          <div className="w-[9%] shrink-0 px-1">
            <Skeleton className="h-3.5 w-10" />
          </div>
          <div className="w-[11%] shrink-0 px-1">
            <Skeleton className="h-3.5 w-14" />
          </div>
          <div className="w-[10%] shrink-0 px-1">
            <Skeleton className="h-3.5 w-12" />
          </div>
          <div className="w-[11%] shrink-0 px-1">
            <Skeleton className="h-3.5 w-10" />
          </div>
          <div className="w-[21%] shrink-0 px-1">
            <Skeleton className="h-3.5 w-16" />
          </div>
          <div className="w-[7%] shrink-0" />
        </div>

        {Array.from({ length: 6 }).map((_, i) => (
          <DesktopRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function PlansTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-2.5 shadow-subtle sm:p-3">
        <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-12" />
            <div className="flex gap-1.5 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-md" />
              ))}
            </div>
          </div>
          <Skeleton className="h-9 w-full rounded-md md:w-48" />
        </div>
      </div>
      <TableSkeleton />
    </div>
  );
}
