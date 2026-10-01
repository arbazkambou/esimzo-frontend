import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="mt-2 space-y-3 sm:mt-4">
      {/* Mobile card skeletons */}
      <div className="flex flex-col gap-2.5 lg:hidden">
        <Skeleton className="h-4 w-40" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-3 shadow-card"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-md" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-2 rounded-md border border-border-subtle bg-muted/30 px-2.5 py-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="mt-2 flex gap-1">
              <Skeleton className="h-5 w-14 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table skeleton */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-[0_4px_20px_rgba(11,18,33,0.04)] lg:block">
        {/* Header */}
        <div className="flex items-center gap-6 border-b border-border bg-muted/60 px-5 py-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
        {/* Rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-border px-5 py-4 last:border-b-0"
          >
            {/* Plan & Provider */}
            <div className="flex w-[31%] shrink-0 items-center gap-3">
              <Skeleton className="size-11 shrink-0 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-2.5 w-12" />
              </div>
            </div>
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-5 w-14" />
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-10 rounded-md" />
              <Skeleton className="h-5 w-14 rounded-md" />
            </div>
            <Skeleton className="size-8 rounded-full" />
          </div>
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
