export default function RegionSkeleton() {
  return (
    <div className="h-full bg-card border border-border rounded-2xl p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0" />
          <div className="flex-1">
            <div className="h-8 bg-muted rounded-lg mb-2 w-3/4" />
            <div className="h-4 bg-muted rounded-lg w-1/2" />
          </div>
        </div>
        <div className="w-5 h-5 bg-muted rounded-full" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
        <div>
          <div className="h-4 bg-muted rounded-lg mb-3 w-3/4" />
          <div className="h-8 bg-muted rounded-lg w-1/2" />
        </div>
        <div>
          <div className="h-4 bg-muted rounded-lg mb-3 w-3/4" />
          <div className="h-8 bg-muted rounded-lg w-1/2" />
        </div>
      </div>

      {/* Countries Skeleton */}
      <div className="grid grid-cols-2 gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  );
}
