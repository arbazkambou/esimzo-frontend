import type {
  CountryPlansHeroContent,
  PlansHeroStats,
} from "@/lib/content/countries";
import { formatPrice } from "@/lib/utils";
import { ArrowDown, Layers3, Sparkles, Tag, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  countryName: string;
  content: CountryPlansHeroContent;
  stats: PlansHeroStats;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

function highlightTemplateValues(
  template: string,
  values: Record<string, string>,
): ReactNode[] {
  return template.split(/(\{\w+\})/g).map((part, index) => {
    const match = part.match(/^\{(\w+)\}$/);
    if (!match) return part;

    return (
      <strong
        key={`${match[1]}-${index}`}
        className="font-bold text-foreground"
      >
        {values[match[1]] ?? ""}
      </strong>
    );
  });
}

function formatLastUpdated(value: PlansHeroStats["lastUpdated"]): string {
  if (value == null || value === "") return "daily";
  if (value instanceof Date) {
    return value.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return String(value);
}

export default function CountriesHeader({
  countryName,
  content,
  stats,
}: Props) {
  const startingPrice = formatPrice(stats.startingPrice);
  const lastUpdated = formatLastUpdated(stats.lastUpdated);

  const title = fillTemplate(content.titleTemplate, { countryName });
  const description = fillTemplate(content.description, { countryName });
  const browseValues = {
    planCount: String(stats.planCount),
    providerCount: String(stats.providerCount),
  };
  const pricingValues = {
    startingPrice,
    lastUpdated,
  };

  // Highlight country name in the H1 when the template ends with it
  const titleSuffix = ` ${countryName}`;
  const titleHasCountrySuffix = title.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? title.slice(0, -titleSuffix.length)
    : title;

  return (
    <section
      aria-label={`${countryName} eSIM plans`}
      className="relative isolate overflow-hidden border-b border-secondary/35 bg-gradient-to-br from-secondary/35 via-secondary/10 to-background"
    >
      <div
        className="pointer-events-none absolute -left-24 top-12 -z-10 h-72 w-72 rounded-full bg-secondary/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-secondary/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="container py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(28rem,0.98fr)] lg:gap-16 xl:gap-24">
          <div className="flex min-w-0 flex-col gap-6">
            {content.eyebrow ? (
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-background/75 px-3.5 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur-sm sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                {content.eyebrow}
              </p>
            ) : null}

            <div className="space-y-5">
              <h1 className="max-w-2xl text-[1.875rem] font-bold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-[2.625rem] lg:text-[2.5rem] xl:text-5xl">
                {titleHasCountrySuffix ? (
                  <>
                    <span className="block">{titlePrefix}</span>
                    <span className="block text-primary">{countryName}</span>
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {description}
              </p>
              <a
                href="#plans"
                className="group inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_10px_24px_-12px_var(--primary)] transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_28px_-12px_var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Browse plans
                <ArrowDown
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <div className="relative w-full max-w-full overflow-hidden rounded-[1.75rem] border border-white/70 bg-card/95 p-5 shadow-[0_14px_36px_-26px_rgba(15,23,42,0.22)] ring-1 ring-border/40 backdrop-blur-sm dark:border-white/10 sm:p-7">
              <div className="min-w-0">
                <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-3 px-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/30 text-foreground">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    Plan snapshot
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/25 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    Updated {lastUpdated}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[1.45fr_1fr_1fr] sm:gap-3">
                  <div className="col-span-2 flex min-w-0 flex-col justify-between rounded-2xl border border-primary/15 bg-primary/[0.09] px-4 py-4 sm:col-span-1 sm:min-h-28 sm:px-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
                      <Tag
                        className="h-4 w-4 shrink-0 text-primary"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Starting price
                    </div>
                    <p className="mt-3 text-3xl font-bold leading-none tracking-[-0.04em] text-primary tabular-nums sm:text-[2rem]">
                      {startingPrice}
                    </p>
                  </div>

                  <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-secondary/30 bg-secondary/[0.13] px-4 py-4 sm:min-h-28">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
                      <Layers3
                        className="h-4 w-4 shrink-0 text-foreground"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      Plans
                    </div>
                    <p className="mt-3 text-2xl font-bold leading-none tracking-tight text-foreground tabular-nums sm:text-[1.75rem]">
                      {stats.planCount}
                    </p>
                  </div>

                  <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-secondary/30 bg-secondary/[0.13] px-4 py-4 sm:min-h-28">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
                      <UsersRound
                        className="h-4 w-4 shrink-0 text-foreground"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      Providers
                    </div>
                    <p className="mt-3 text-2xl font-bold leading-none tracking-tight text-foreground tabular-nums sm:text-[1.75rem]">
                      {stats.providerCount}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-border/55 pt-4 text-sm leading-6 text-muted-foreground">
                  <p className="flex items-start gap-2.5 rounded-xl border border-secondary/15 bg-secondary/[0.06] px-3 py-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-background/80 text-primary ring-1 ring-border/35">
                      <Layers3
                        className="h-3.5 w-3.5"
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </span>
                    <span>
                      {highlightTemplateValues(
                        content.browseTemplate,
                        browseValues,
                      )}
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5 rounded-xl border border-primary/10 bg-primary/[0.045] px-3 py-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-background/80 text-primary ring-1 ring-border/35">
                      <Tag
                        className="h-3.5 w-3.5"
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </span>
                    <span>
                      {highlightTemplateValues(
                        content.pricingTemplate,
                        pricingValues,
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
