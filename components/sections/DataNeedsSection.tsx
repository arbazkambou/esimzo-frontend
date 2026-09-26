import type { DataNeedsContent } from "@/lib/content/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Gauge } from "lucide-react";

type Props = {
  countryName: string;
  content: DataNeedsContent;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export default function DataNeedsSection({ countryName, content }: Props) {
  const values = { countryName };
  const heading = fillTemplate(content.headingTemplate, values);
  const intro = fillTemplate(content.intro, values);

  const rows = content.rows.filter(
    (row) =>
      row.travelerType.trim().length > 0 &&
      row.planningRange.trim().length > 0 &&
      row.typicalUse.trim().length > 0,
  );

  if (rows.length === 0) return null;

  const closingParagraphs = content.closingParagraphs
    .map((p) => fillTemplate(p, values).trim())
    .filter(Boolean);

  const sectionNotice = content.notice?.trim()
    ? fillTemplate(content.notice, values)
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
      className="relative overflow-hidden bg-background py-14 sm:py-20"
    >
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-100/25 blur-3xl dark:bg-orange-950/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/5 bottom-0 h-96 w-96 translate-x-1/3 rounded-full bg-sky-100/35 blur-3xl dark:bg-sky-950/25"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        <header className="mb-10 text-center sm:mb-12">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-[#EBF5FE] px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0284C7] select-none dark:bg-[#0EA5E9]/15 dark:text-[#38BDF8]">
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
            className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-[#0B1E48] sm:text-3xl lg:text-4xl dark:text-white"
          >
            {titleHasCountrySuffix ? (
              <>
                {titlePrefix}{" "}
                <span className="text-[#FF5A22]">{countryName}</span>?
              </>
            ) : (
              heading
            )}
          </h2>

          <p className="mx-auto max-w-3xl text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] dark:text-slate-400">
            {intro}
          </p>
        </header>

        {sectionNotice ? (
          <Alert className="mb-8 border-sky-200/80 bg-sky-50/70 dark:border-sky-900 dark:bg-sky-950/30">
            <AlertDescription className="text-slate-600 dark:text-slate-300">
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
              <tr className="border-b border-slate-200/80 bg-[#F8FBFE] dark:border-slate-800 dark:bg-slate-900/40">
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-[#0B1E48] sm:px-5 sm:text-sm dark:text-white"
                >
                  {content.columns.travelerType}
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-[#0B1E48] sm:px-5 sm:text-sm dark:text-white"
                >
                  {content.columns.planningRange}
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-xs font-extrabold tracking-wide text-[#0B1E48] sm:px-5 sm:text-sm dark:text-white"
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
                    className="px-4 py-4 align-top text-xs font-bold text-[#0B1E48] sm:px-5 sm:text-sm dark:text-white"
                  >
                    {row.travelerType}
                  </th>
                  <td className="px-4 py-4 align-top text-xs font-semibold text-[#FF5A22] sm:px-5 sm:text-sm dark:text-[#FF5A22]">
                    {row.planningRange}
                  </td>
                  <td className="px-4 py-4 align-top text-xs leading-relaxed font-normal text-slate-500 sm:px-5 sm:text-[13.5px] dark:text-slate-400">
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
                className="text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] dark:text-slate-400"
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
