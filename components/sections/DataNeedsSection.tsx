import type { DataNeedsContent } from "@/lib/content/countries";
import { fillCountryTemplate } from "@/lib/display-name";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Gauge } from "lucide-react";

type Props = {
  countryName: string;
  content: DataNeedsContent;
};

export default function DataNeedsSection({ countryName, content }: Props) {
  const heading = fillCountryTemplate(content.headingTemplate, countryName);
  const intro = fillCountryTemplate(content.intro, countryName);

  const rows = content.rows.filter(
    (row) =>
      row.travelerType.trim().length > 0 &&
      row.planningRange.trim().length > 0 &&
      row.typicalUse.trim().length > 0,
  );

  if (rows.length === 0) return null;

  const closingParagraphs = content.closingParagraphs
    .map((p) => fillCountryTemplate(p, countryName).trim())
    .filter(Boolean);

  const sectionNotice = content.notice?.trim()
    ? fillCountryTemplate(content.notice, countryName)
    : null;

  const titleSuffix = ` ${countryName}?`;
  const titleHasCountrySuffix = heading.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? heading.slice(0, -titleSuffix.length)
    : heading;

  return (
    <section
      id="data-needs"
      aria-labelledby="data-needs-heading"
      className="bg-background py-[var(--section-y-tight)]"
    >
      <div className="w-full">
        <header className="mb-10 text-center sm:mb-12">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-primary-soft px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-primary/15 dark:text-primary">
              <Gauge
                className="h-3.5 w-3.5"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              {content.eyebrow}
            </p>
          ) : null}

          <h2
            id="data-needs-heading"
            className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl dark:text-white"
          >
            {titleHasCountrySuffix ? (
              <>
                {titlePrefix}{" "}
                <span className="text-primary">{countryName}</span>?
              </>
            ) : (
              heading
            )}
          </h2>

          <p className="mx-auto max-w-3xl text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
            {intro}
          </p>
        </header>

        {sectionNotice ? (
          <Alert className="mb-8 border-primary/20 bg-primary-soft/70 dark:border-primary/30 dark:bg-primary/30">
            <AlertDescription className="text-text-secondary">
              {sectionNotice}
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-card">
          <table className="w-full min-w-[36rem] border-collapse text-left caption-bottom">
            <caption className="sr-only">
              Suggested weekly data planning ranges by traveler type for{" "}
              {countryName}
            </caption>
            <thead>
              <tr className="border-b border-slate-200/80 bg-muted dark:border-slate-800 dark:bg-slate-900/40">
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-foreground sm:px-5 sm:text-sm dark:text-white"
                >
                  {content.columns.travelerType}
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-foreground sm:px-5 sm:text-sm dark:text-white"
                >
                  {content.columns.planningRange}
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-foreground sm:px-5 sm:text-sm dark:text-white"
                >
                  {content.columns.typicalUse}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={`${row.travelerType}-${index}`}
                  className="border-b border-slate-100 last:border-b-0 dark:border-slate-800/80"
                >
                  <th
                    scope="row"
                    className="px-4 py-4 align-top text-xs font-bold text-foreground sm:px-5 sm:text-sm dark:text-white"
                  >
                    {row.travelerType}
                  </th>
                  <td className="px-4 py-4 align-top text-xs font-semibold text-primary sm:px-5 sm:text-sm dark:text-primary">
                    {row.planningRange}
                  </td>
                  <td className="px-4 py-4 align-top text-xs leading-relaxed font-normal text-text-secondary sm:px-5 sm:text-[13.5px]">
                    {row.typicalUse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {closingParagraphs.length > 0 ? (
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:gap-3.5">
            {closingParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
