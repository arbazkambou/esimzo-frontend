import { Region } from "@/lib/types/plans.types";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PropType = {
  region: Region;
};

export default function RegionCard({ region }: PropType) {
  const { name, flag, slug } = region;

  return (
    <Link
      href={`/region/${slug}`}
      className="group relative flex items-center gap-4 rounded-2xl border border-border bg-secondary/20 p-4 hover:bg-secondary/40"
    >
      {/* Flag Container */}
      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md">
        <Image
          src={flag}
          alt={name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      {/* Country Name */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-medium text-card-foreground">
          {name}
        </p>

        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold text-muted-foreground">
            View Plans
          </p>
        </div>
      </div>
      <div className="rounded-full bg-primary p-1">
        <ChevronRight size={18} className="text-background" />
      </div>
    </Link>
  );
}
