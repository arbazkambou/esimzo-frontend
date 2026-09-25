import type {
  CountryPlansHeroContent,
  PlansHeroStats,
} from "@/lib/content/countries";
import { formatPrice } from "@/lib/utils";
import { Layers, Tag, Users } from "lucide-react";

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
  const browseLine = fillTemplate(content.browseTemplate, {
    planCount: String(stats.planCount),
    providerCount: String(stats.providerCount),
  });
  const pricingLine = fillTemplate(content.pricingTemplate, {
    startingPrice,
    lastUpdated,
  });

  // Highlight country name in the H1 when the template ends with it
  const titleSuffix = ` ${countryName}`;
  const titleHasCountrySuffix = title.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? title.slice(0, -titleSuffix.length)
    : title;

  return (
    <section
      aria-label={`${countryName} eSIM plans`}
      className="relative bg-gradient-to-br from-secondary/35 via-secondary/15 to-background"
    >
      <div className="container py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
            {content.eyebrow ? (
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <span
                  className="inline-flex h-2 w-2 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {content.eyebrow}
              </p>
            ) : null}

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance min-[360px]:text-4xl sm:text-5xl">
                {titleHasCountrySuffix ? (
                  <>
                    {titlePrefix}{" "}
                    <span className="text-primary">{countryName}</span>
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4 rounded-xl bg-primary/10 px-4 py-3.5 sm:px-5">
                <div className="flex min-w-0 items-center gap-2.5 text-sm text-muted-foreground sm:text-base">
                  <Tag
                    className="h-4 w-4 shrink-0 text-foreground"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>Starting price</span>
                </div>
                <p className="shrink-0 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                  {startingPrice}
                </p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl bg-secondary/20 px-4 py-3.5 sm:gap-3.5 sm:px-5">
                  <Layers
                    className="h-5 w-5 shrink-0 text-foreground"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {stats.planCount}
                    </p>
                    <p className="text-sm text-muted-foreground">Plans</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-secondary/20 px-4 py-3.5 sm:gap-3.5 sm:px-5">
                  <Users
                    className="h-5 w-5 shrink-0 text-foreground"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {stats.providerCount}
                    </p>
                    <p className="text-sm text-muted-foreground">Providers</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                <p className="flex gap-2.5">
                  <Layers
                    className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">{browseLine}</span>
                </p>
                <p className="flex gap-2.5">
                  <Tag
                    className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">{pricingLine}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
