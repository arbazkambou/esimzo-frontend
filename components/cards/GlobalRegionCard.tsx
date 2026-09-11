import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import globe from "@/assets/svgs/globe.png";
import Image from "next/image";

type Props = {
  label?: string;
  href?: string;
  description?: string;
};

export default function GlobalRegionCard({
  label = "Global",
  href = "/global",
  description = "All regions",
}: Props) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 rounded-2xl border border-border bg-secondary/20 p-4 hover:bg-secondary/40"
    >
      <div className="relative h-12 w-12 shrink-0 flex items-center justify-center">
        <Image src={globe} alt="globe" fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-card-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="rounded-full bg-primary p-1">
        <ChevronRight size={18} className="text-background" />
      </div>
    </Link>
  );
}
