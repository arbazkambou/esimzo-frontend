import type {
  CountryPlansHeroContent,
  PlansHeroStats,
} from "@/lib/content/countries";
import { fillCountryTemplate } from "@/lib/display-name";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Layers3, Sparkles, Tag, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  countryName: string;
  content: CountryPlansHeroContent;
  stats: PlansHeroStats;
};

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

function resolveUpdatedDate(value: PlansHeroStats["lastUpdated"]): Date {
  const date =
    value instanceof Date
      ? value
      : value == null || value === "" || value === "daily"
        ? new Date()
        : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date();
  }

  return date;
}

function formatUpdatedAt(value: PlansHeroStats["lastUpdated"]): string {
  return resolveUpdatedDate(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Compact stamp for narrow screens, e.g. "Oct 1, 1:00 AM" */
function formatUpdatedAtShort(value: PlansHeroStats["lastUpdated"]): string {
  return resolveUpdatedDate(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CountriesHeader({
  countryName,
  content,
  stats,
}: Props) {
  const startingPrice = formatPrice(stats.startingPrice);
  const updatedAt = formatUpdatedAt(stats.lastUpdated);
  const updatedAtShort = formatUpdatedAtShort(stats.lastUpdated);

  const title = fillCountryTemplate(content.titleTemplate, countryName);
  const description = fillCountryTemplate(content.description, countryName);
  const pricingValues = {
    startingPrice,
    lastUpdated: "daily",
  };

  const titleSuffix = ` ${countryName}`;
  const titleHasCountrySuffix = title.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? title.slice(0, -titleSuffix.length)
    : title;

  return (
    <section
      aria-label={`${countryName} eSIM plans`}
      className="border-b border-secondary/35 bg-background"
    >
      <div className="container py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:gap-14 xl:gap-20">
          <div className="flex min-w-0 flex-col gap-6">
            {content.eyebrow ? (
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-background/75 px-3.5 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur-sm sm:text-xs">
                <Sparkles
                  className="h-3.5 w-3.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {content.eyebrow}
              </p>
            ) : null}

            <div className="space-y-5">
              <h1 className="max-w-2xl text-[1.875rem] font-bold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-[2.625rem] lg:text-[2.5rem] xl:text-5xl">
                {titleHasCountrySuffix ? (
                  <>
                    <span className="block">{titlePrefix}</span>
                    {" "}
                    <span className="block text-primary">{countryName}</span>
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
                {description}
              </p>
              <a
                href="#plans"
                className="group inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_10px_24px_-12px_var(--primary)] transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_28px_-12px_var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Browse plans
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <div className="rounded-xl border border-white/70 bg-card/95 p-2 shadow-card ring-1 ring-border/40 backdrop-blur-sm dark:border-white/10 sm:rounded-[1.75rem] sm:p-6 sm:shadow-[0_14px_36px_-26px_rgba(15,23,42,0.22)]">
              {/* Header — title + timestamp on one row with space-between */}
              <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-4 sm:gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-secondary/30 text-foreground sm:h-7 sm:w-7 sm:rounded-lg">
                    <Sparkles
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                      aria-hidden="true"
                    />
                  </span>
                  <p className="truncate text-sm font-semibold leading-5 text-foreground">
                    Plan snapshot
                  </p>
                </div>
                <p className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-success">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-success"
                    aria-hidden="true"
                  />
                  <span className="sm:hidden" title={`Updated at ${updatedAt}`}>
                    Updated at {updatedAtShort}
                  </span>
                  <span className="hidden sm:inline">
                    Updated at {updatedAt}
                  </span>
                </p>
              </div>

              {/* Stats — compact equal columns */}
              <div className="grid grid-cols-3 overflow-hidden rounded-md border border-border sm:gap-3 sm:overflow-visible sm:rounded-none sm:border-0">
                <div className="flex min-w-0 flex-col items-start gap-1 bg-primary/[0.09] px-2 py-1.5 text-left sm:min-h-[6.5rem] sm:justify-between sm:rounded-2xl sm:border sm:border-primary/15 sm:px-4 sm:py-4">
                  <div className="flex w-full items-center gap-1 sm:gap-2">
                    <Tag
                      className="h-3 w-3 shrink-0 text-primary sm:h-4 sm:w-4"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-medium leading-tight text-muted-foreground sm:text-sm">
                      Starting price
                    </span>
                  </div>
                  <p className="text-base font-bold leading-none tracking-[-0.04em] text-primary tabular-nums sm:mt-3 sm:text-[1.875rem]">
                    {startingPrice}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col items-start gap-1 border-l border-border bg-secondary/[0.13] px-2 py-1.5 text-left sm:min-h-[6.5rem] sm:justify-between sm:rounded-2xl sm:border sm:border-secondary/30 sm:px-4 sm:py-4">
                  <div className="flex w-full items-center gap-1 sm:gap-2">
                    <Layers3
                      className="h-3 w-3 shrink-0 text-foreground sm:h-4 sm:w-4"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-medium leading-tight text-muted-foreground sm:text-sm">
                      Plans
                    </span>
                  </div>
                  <p className="text-base font-bold leading-none tracking-tight text-foreground tabular-nums sm:mt-3 sm:text-[1.75rem]">
                    {stats.planCount}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col items-start gap-1 border-l border-border bg-secondary/[0.13] px-2 py-1.5 text-left sm:min-h-[6.5rem] sm:justify-between sm:rounded-2xl sm:border sm:border-secondary/30 sm:px-4 sm:py-4">
                  <div className="flex w-full items-center gap-1 sm:gap-2">
                    <UsersRound
                      className="h-3 w-3 shrink-0 text-foreground sm:h-4 sm:w-4"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-medium leading-tight text-muted-foreground sm:text-sm">
                      Providers
                    </span>
                  </div>
                  <p className="text-base font-bold leading-none tracking-tight text-foreground tabular-nums sm:mt-3 sm:text-[1.75rem]">
                    {stats.providerCount}
                  </p>
                </div>
              </div>

              <p className="mt-1.5 rounded-md border border-primary/10 bg-primary/[0.045] px-2 py-1 text-xs leading-4 text-text-secondary sm:mt-4 sm:rounded-xl sm:px-3.5 sm:py-3 sm:text-sm sm:leading-6">
                {highlightTemplateValues(
                  content.pricingTemplate,
                  pricingValues,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
