import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatLatency,
  formatMbps,
} from "@/lib/network-speeds/derive-view-model";
import type { NetworkSpeedsTableRow } from "@/lib/network-speeds/types";
import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  caption: string;
  rows: NetworkSpeedsTableRow[];
  note: string;
};

function DownloadBar({ percent }: { percent: number }) {
  return (
    <span
      className="block h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
      aria-hidden="true"
    >
      <span
        className="block h-full rounded-full bg-primary"
        style={{ width: `${percent}%` }}
      />
    </span>
  );
}

function OperatorCell({ row }: { row: NetworkSpeedsTableRow }) {
  return (
    <div className="flex min-w-[12.5rem] items-center gap-3">
      <span
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold tabular ring-1 sm:size-9",
          row.rank === 1
            ? "bg-primary-soft text-primary ring-primary/15 dark:bg-primary/20 dark:text-primary dark:ring-primary/20"
            : "bg-muted text-text-secondary ring-transparent",
        )}
        aria-hidden="true"
      >
        {row.rank}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-bold text-foreground sm:text-[15px] dark:text-white">
          {row.name}
        </span>
        {row.badge ? (
          <span className="w-fit rounded-full border border-primary/20 bg-primary-soft px-2.5 py-0.5 text-[11px] font-bold text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary">
            {row.badge}
          </span>
        ) : null}
        {!row.badge && row.formerly.length > 0 ? (
          <span className="text-[11px] text-text-secondary sm:text-xs">
            Formerly {row.formerly.join(", ")}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function NetworkSpeedsTable({
  heading,
  caption,
  rows,
  note,
}: Props) {
  return (
    <div className="flex flex-col gap-3.5 sm:gap-4">
      <h3 className="text-center text-base font-bold leading-snug text-foreground sm:text-[17px] dark:text-white">
        {heading}
      </h3>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] md:block dark:border-slate-800 dark:bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left caption-bottom">
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr className="border-b border-slate-200/80 bg-muted dark:border-slate-800 dark:bg-slate-900/40">
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-foreground sm:px-5 sm:text-sm dark:text-white"
                >
                  Network
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-foreground sm:px-5 sm:text-sm dark:text-white"
                >
                  Download
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-foreground sm:px-5 sm:text-sm dark:text-white"
                >
                  Upload
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-foreground sm:px-5 sm:text-sm dark:text-white"
                >
                  Latency
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-foreground sm:px-5 sm:text-sm dark:text-white"
                >
                  Best for
                </th>
                <th scope="col" className="px-4 py-3.5 sm:px-5">
                  <span className="sr-only">eSIM plans</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-slate-100 last:border-b-0 dark:border-slate-800/80"
                >
                  <td className="px-4 py-4 align-middle sm:px-5 sm:py-5">
                    <OperatorCell row={row} />
                  </td>
                  <td className="px-4 py-4 align-middle sm:px-5 sm:py-5">
                    <div className="flex min-w-[6.875rem] flex-col gap-1.5">
                      <span>
                        <span className="text-sm font-extrabold tabular text-foreground sm:text-[15px] dark:text-white">
                          {formatMbps(row.downloadMbps)}
                        </span>{" "}
                        <span className="text-[11px] text-text-secondary sm:text-xs">
                          Mbps
                        </span>
                      </span>
                      <DownloadBar percent={row.barPercent} />
                    </div>
                  </td>
                  <td className="px-4 py-4 align-middle sm:px-5 sm:py-5">
                    <span>
                      <span className="text-sm font-bold tabular text-foreground sm:text-[15px] dark:text-white">
                        {formatMbps(row.uploadMbps)}
                      </span>{" "}
                      <span className="text-[11px] text-text-secondary sm:text-xs">
                        Mbps
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle sm:px-5 sm:py-5">
                    <div className="flex flex-col gap-0.5">
                      <span>
                        <span className="text-sm font-bold tabular text-foreground sm:text-[15px] dark:text-white">
                          {formatLatency(row.latencyMs)}
                        </span>{" "}
                        <span className="text-[11px] text-text-secondary sm:text-xs">
                          ms
                        </span>
                      </span>
                      <span className="text-[11px] text-text-secondary sm:text-xs">
                        {row.latencyTier}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-middle sm:px-5 sm:py-5">
                    <span className="text-xs leading-relaxed text-text-secondary sm:text-[13.5px]">
                      {row.bestFor}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right align-middle sm:px-5 sm:py-5">
                    <Button asChild variant="secondary" size="sm">
                      <Link href={row.ctaHref}>
                        {row.ctaLabel}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 sm:gap-3.5 md:hidden">
        {rows.map((row) => (
          <article
            key={row.name}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:p-5 dark:border-slate-800 dark:bg-card"
          >
            <div className="mb-3 border-b border-slate-100 pb-3 dark:border-slate-800">
              <OperatorCell row={row} />
            </div>
            <dl className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[11px] font-extrabold uppercase tracking-wide text-text-secondary sm:text-xs">
                  Download
                </dt>
                <dd className="flex min-w-[7.5rem] flex-col items-end gap-1.5">
                  <span>
                    <span className="text-sm font-extrabold tabular text-foreground dark:text-white">
                      {formatMbps(row.downloadMbps)}
                    </span>{" "}
                    <span className="text-[11px] text-text-secondary">Mbps</span>
                  </span>
                  <div className="w-[7.5rem]">
                    <DownloadBar percent={row.barPercent} />
                  </div>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[11px] font-extrabold uppercase tracking-wide text-text-secondary sm:text-xs">
                  Upload
                </dt>
                <dd>
                  <span className="text-sm font-bold tabular text-foreground dark:text-white">
                    {formatMbps(row.uploadMbps)}
                  </span>{" "}
                  <span className="text-[11px] text-text-secondary">Mbps</span>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[11px] font-extrabold uppercase tracking-wide text-text-secondary sm:text-xs">
                  Latency
                </dt>
                <dd className="flex flex-col items-end gap-0.5">
                  <span>
                    <span className="text-sm font-bold tabular text-foreground dark:text-white">
                      {formatLatency(row.latencyMs)}
                    </span>{" "}
                    <span className="text-[11px] text-text-secondary">ms</span>
                  </span>
                  <span className="text-[11px] text-text-secondary">
                    {row.latencyTier}
                  </span>
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[11px] font-extrabold uppercase tracking-wide text-text-secondary sm:text-xs">
                  Best for
                </dt>
                <dd className="text-right text-xs leading-relaxed text-text-secondary sm:text-[13.5px]">
                  {row.bestFor}
                </dd>
              </div>
            </dl>
            <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
              <Link href={row.ctaHref}>
                {row.ctaLabel}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </article>
        ))}
      </div>

      <p className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
        {note}
      </p>
    </div>
  );
}
