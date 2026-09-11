"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Plan } from "@/lib/types/plans.types";
import type {
  SortOption,
  SortDirection,
} from "@/lib/hooks/use-package-filters";
import { formatData, formatPrice, pricePerGB } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Signal,
  Wifi,
  RefreshCw,
  UserPlus,
  Fingerprint,
  Smartphone,
  Info,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import fiveG from "@/assets/svgs/5g.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  plans: Plan[];
  sort: SortOption;
  sortDir: SortDirection;
  onSort: (sort: SortOption) => void;
  slug: string;
};

type ColumnSort = {
  id: SortOption;
  label: string;
};

const SORTABLE_COLUMNS: ColumnSort[] = [
  { id: "most-data", label: "Data" },
  { id: "longest", label: "Validity" },
  { id: "best-value", label: "Price/GB" },
  { id: "cheapest", label: "Price" },
];

export default function PlansTable({
  plans,
  sort,
  sortDir,
  onSort,
  slug,
}: Props) {
  const pathname = usePathname();
  const isRegional = pathname.startsWith("/region");
  return (
    <div className="mt-4 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 border-border border">
            <TableHead className="min-w-[220px]">
              <div className="flex items-center gap-1">
                Plan Name & Provider
                <ArrowUpDown className="h-3 w-3 text-muted-foreground/50" />
              </div>
            </TableHead>
            {SORTABLE_COLUMNS.map((col) => (
              <TableHead key={col.id}>
                <button
                  onClick={() => onSort(col.id)}
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium transition-colors",
                    sort === col.id
                      ? "text-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  {col.label}
                  {sort === col.id ? (
                    sortDir === "asc" ? (
                      <ArrowUp className="h-3 w-3 text-primary" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-primary" />
                    )
                  ) : (
                    <ArrowUpDown className="h-3 w-3 text-muted-foreground/50" />
                  )}
                </button>
              </TableHead>
            ))}
            <TableHead className="min-w-[180px]">Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan) => (
            <TableRow
              key={plan.id}
              className="group cursor-pointer transition-colors border-border hover:bg-secondary/10"
            >
              {/* Plan Name + Provider */}
              <TableCell>
                <Link
                  href={
                    isRegional
                      ? `/region/${slug}/${plan.provider.slug}-provider`
                      : `/${slug}/${plan.provider.slug}-provider`
                  }
                >
                  <div className="flex items-center gap-3">
                    {plan.provider.image ? (
                      <div className="relative h-10 w-10">
                        <Image
                          src={plan.provider.image}
                          alt={plan.provider.name}
                          fill
                          className="rounded-md object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/10 text-xs font-bold text-primary">
                        {plan.provider.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-muted-foreground">
                        {plan.provider.name}
                      </p>
                      <p className="truncate text-sm font-medium text-foreground">
                        {plan.name}
                        {plan.has5G && (
                          <span className="ml-1.5 inline-flex items-center">
                            <Image
                              src={fiveG}
                              alt="5G"
                              width={20}
                              height={20}
                            />
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              </TableCell>

              {/* Data */}
              <TableCell>
                <Link
                  href={
                    isRegional
                      ? `/region/${slug}/${plan.provider.slug}-provider`
                      : `/${slug}/${plan.provider.slug}-provider`
                  }
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {formatData(plan.capacity)}
                    </span>
                  </div>
                </Link>
              </TableCell>

              {/* Validity */}
              <TableCell>
                <Link
                  href={
                    isRegional
                      ? `/region/${slug}/${plan.provider.slug}-provider`
                      : `/${slug}/${plan.provider.slug}-provider`
                  }
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-foreground">
                      {plan.period} {plan.period === 1 ? "Day" : "Days"}
                    </span>
                    {plan.isConsecutive && (
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              Consecutive days from activation
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </Link>
              </TableCell>

              {/* Price/GB */}
              <TableCell>
                <Link
                  href={
                    isRegional
                      ? `/region/${slug}/${plan.provider.slug}-provider`
                      : `/${slug}/${plan.provider.slug}-provider`
                  }
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {pricePerGB(plan.usdPrice, plan.capacity)}
                  </span>
                </Link>
              </TableCell>

              {/* Price */}
              <TableCell>
                <Link
                  href={
                    isRegional
                      ? `/region/${slug}/${plan.provider.slug}-provider`
                      : `/${slug}/${plan.provider.slug}-provider`
                  }
                >
                  <span
                    className={cn(
                      "text-sm font-bold",
                      plan.usdPrice === 0
                        ? "text-green-600"
                        : "text-foreground",
                    )}
                  >
                    {formatPrice(plan.usdPrice)}
                  </span>
                </Link>
              </TableCell>

              {/* Tags */}
              <TableCell>
                <Link
                  href={
                    isRegional
                      ? `/region/${slug}/${plan.provider.slug}-provider`
                      : `/${slug}/${plan.provider.slug}-provider`
                  }
                >
                  <div className="flex flex-wrap gap-1">
                    {plan.payAsYouGo && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] gap-1 px-1.5 py-0"
                      >
                        <Wifi className="h-2.5 w-2.5" />
                        Pay-As-You-Go
                      </Badge>
                    )}
                    {plan.newUserOnly && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] gap-1 px-1.5 py-0"
                      >
                        <UserPlus className="h-2.5 w-2.5" />
                        New Users Only
                      </Badge>
                    )}
                    {plan.tethering && (
                      <Badge
                        variant="outline"
                        className="text-[10px] gap-1 px-1.5 py-0"
                      >
                        <Smartphone className="h-2.5 w-2.5" />
                        Hotspot
                      </Badge>
                    )}
                    {plan.canTopUp && (
                      <Badge
                        variant="outline"
                        className="text-[10px] gap-1 px-1.5 py-0"
                      >
                        <RefreshCw className="h-2.5 w-2.5" />
                        Top Up
                      </Badge>
                    )}
                    {plan.eKYC && (
                      <Badge
                        variant="outline"
                        className="text-[10px] gap-1 px-1.5 py-0"
                      >
                        <Fingerprint className="h-2.5 w-2.5" />
                        eKYC
                      </Badge>
                    )}
                  </div>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
