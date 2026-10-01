import { BarChart3 } from "lucide-react";
import NetworkSpeedsFaqTip from "@/components/sections/network-speeds/NetworkSpeedsFaqTip";
import NetworkSpeedsTable from "@/components/sections/network-speeds/NetworkSpeedsTable";
import NetworkSpeedsVerdicts from "@/components/sections/network-speeds/NetworkSpeedsVerdicts";
import type { NetworkSpeedsViewModel } from "@/lib/network-speeds/types";

type Props = {
  data: NetworkSpeedsViewModel;
};

export default function NetworkSpeedsSection({ data }: Props) {
  return (
    <section
      id="network-speeds"
      aria-labelledby="network-speeds-heading"
      className="bg-background py-[var(--section-y-tight)]"
    >
      <div className="w-full">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-3.5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-primary-soft px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-primary/15 dark:text-primary">
            <BarChart3
              className="h-3.5 w-3.5"
              strokeWidth={2.2}
              aria-hidden="true"
            />
            <span>Network speed test</span>
            <span aria-hidden="true">•</span>
            <span>
              Updated{" "}
              <time dateTime={data.updatedDatetime}>{data.updatedLabel}</time>
            </span>
          </p>

          <h2
            id="network-speeds-heading"
            className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl dark:text-white"
          >
            Mobile network speeds in{" "}
            <span className="text-primary">{data.country}</span> (2026)
          </h2>

          <p className="mx-auto max-w-3xl text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
            {data.intro}
          </p>
        </header>

        <div className="mb-8 sm:mb-10">
          <NetworkSpeedsVerdicts verdicts={data.verdicts} />
        </div>

        <div className="mb-8 sm:mb-10">
          <NetworkSpeedsTable
            heading={data.tableHeading}
            caption={data.tableCaption}
            rows={data.rows}
            note={data.note}
          />
        </div>

        <NetworkSpeedsFaqTip
          country={data.country}
          faq={data.faq}
          tip={data.tip}
        />

        <footer className="mt-8 flex flex-col gap-1.5 border-t border-slate-200/80 pt-5 sm:mt-10 dark:border-slate-800">
          <p className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
            {data.footerDisclaimer}
          </p>
          {data.sources.length > 0 ? (
            <p className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
              Sources:{" "}
              {data.sources.map((source, index) => (
                <span key={`${source.label}-${source.url}`}>
                  {index > 0 ? " · " : null}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener nofollow"
                    className="font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
          ) : null}
        </footer>
      </div>
    </section>
  );
}
