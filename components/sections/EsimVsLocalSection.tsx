import type { EsimVsLocalContent } from "@/lib/content/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeftRight } from "lucide-react";

type Props = {
  countryName: string;
  content: EsimVsLocalContent;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export default function EsimVsLocalSection({ countryName, content }: Props) {
  const values = { countryName };
  const heading = fillTemplate(content.headingTemplate, values);
  const intro = fillTemplate(content.intro, values);

  const rows = content.rows.filter(
    (row) => row.travelEsim.trim().length > 0 && row.localSim.trim().length > 0,
  );

  if (rows.length === 0) return null;

  const closingParagraphs = content.closingParagraphs
    .map((p) => fillTemplate(p, values).trim())
    .filter(Boolean);

  const notice = content.notice?.trim()
    ? fillTemplate(content.notice, values)
    : null;

  const titleSuffix = ` ${countryName}?`;
  const titleHasCountrySuffix = heading.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? heading.slice(0, -titleSuffix.length)
    : heading;

  return (
    <section
      id="esim-vs-local"
      aria-labelledby="esim-vs-local-heading"
      className="relative overflow-hidden bg-background py-14 sm:py-20"
    >
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-100/35 blur-3xl dark:bg-sky-950/25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/5 bottom-0 h-96 w-96 translate-x-1/3 rounded-full bg-orange-100/25 blur-3xl dark:bg-orange-950/20"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        <header className="mb-10 text-center sm:mb-12">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-[#FFF0E8] px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#FF5A22] select-none dark:bg-[#FF5A22]/15">
              <ArrowLeftRight
                className="h-3.5 w-3.5"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              {content.eyebrow}
            </p>
          ) : null}

          <h2
            id="esim-vs-local-heading"
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

          <p className="mx-auto max-w-3xl text-left text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] dark:text-slate-400">
            {intro}
          </p>
        </header>

        {notice ? (
          <Alert className="mb-8 border-sky-200/80 bg-sky-50/70 dark:border-sky-900 dark:bg-sky-950/30">
            <AlertDescription className="text-slate-600 dark:text-slate-300">
              {notice}
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-card">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left caption-bottom">
              <caption className="sr-only">
                Comparison of travel eSIM and local SIM options for{" "}
                {countryName}
              </caption>
              <thead>
                <tr className="border-b border-slate-200/80 bg-[#F8FBFE] dark:border-slate-800 dark:bg-slate-900/40">
                  <th
                    scope="col"
                    className="w-1/2 px-4 py-3.5 text-xs font-extrabold tracking-wide text-[#0B1E48] sm:px-5 sm:text-sm dark:text-white"
                  >
                    {content.columns.travelEsim}
                  </th>
                  <th
                    scope="col"
                    className="w-1/2 px-4 py-3.5 text-xs font-extrabold tracking-wide text-[#0B1E48] sm:px-5 sm:text-sm dark:text-white"
                  >
                    {content.columns.localSim}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={`${row.travelEsim}-${index}`}
                    className="border-b border-slate-100 last:border-b-0 dark:border-slate-800/80"
                  >
                    <td className="border-r border-slate-100 px-4 py-4 align-top text-xs leading-relaxed font-normal text-slate-500 sm:px-5 sm:text-[13.5px] dark:border-slate-800 dark:text-slate-400">
                      {row.travelEsim}
                    </td>
                    <td className="px-4 py-4 align-top text-xs leading-relaxed font-normal text-slate-500 sm:px-5 sm:text-[13.5px] dark:text-slate-400">
                      {row.localSim}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
