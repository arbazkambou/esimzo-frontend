import RegionGrid from "@/components/cards/RegionGrid";
import RegionSkeleton from "@/components/skeletons/RegionsSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Regions | eSIM",
  description:
    "Explore regions and find the best eSIM plans for your destination",
};

export default function RegionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/10 to-background">
      {/* Header */}
      <div className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Explore Regions
        </h1>
        <p className="text-muted-foreground text-lg">
          Find the best eSIM plans for your destination
        </p>
      </div>

      {/* Content */}
      <div className="container px-4 py-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <RegionSkeleton key={i} />
              ))}
            </div>
          }
        >
          <RegionGrid />
        </Suspense>
      </div>
    </main>
  );
}
