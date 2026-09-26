import type { NetworkCoverageContent } from "@/lib/content/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPinned, Signal } from "lucide-react";

type Props = {
  countryName: string;
  content: NetworkCoverageContent;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export default function NetworkCoverageSection({
  countryName,
  content,
}: Props) {
  const values = { countryName };
  const heading = fillTemplate(content.headingTemplate, values);

  const paragraphs = content.paragraphs
    .map((p) => fillTemplate(p, values).trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  const networks = content.networks?.map((n) => n.trim()).filter(Boolean) ?? [];
  const territories =
    content.territories?.map((t) => t.trim()).filter(Boolean) ?? [];
  const notice = content.notice?.trim()
    ? fillTemplate(content.notice, values)
    : null;

  const titleSuffix = ` ${countryName}`;
  const titleHasCountrySuffix = heading.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? heading.slice(0, -titleSuffix.length)
    : heading;

  return (
    <section
      id="coverage"
      aria-labelledby="coverage-heading"
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
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-[#EBF5FE] px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0284C7] select-none dark:bg-[#0EA5E9]/15 dark:text-[#38BDF8]">
              <Signal
                className="h-3.5 w-3.5"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              {content.eyebrow}
            </p>
          ) : null}

          <h2
            id="coverage-heading"
            className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-[#0B1E48] sm:text-3xl lg:text-4xl dark:text-white"
          >
            {titleHasCountrySuffix ? (
              <>
                {titlePrefix}{" "}
                <span className="text-[#FF5A22]">{countryName}</span>
              </>
            ) : (
              heading
            )}
          </h2>
        </header>

        {networks.length > 0 ? (
          <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:mb-8 sm:p-6 dark:border-slate-800 dark:bg-card">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EBF5FE] text-[#0284C7] dark:bg-sky-950/50 dark:text-sky-400"
                aria-hidden="true"
              >
                <Signal className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <p className="text-xs font-extrabold tracking-wide text-[#0B1E48] sm:text-sm dark:text-white">
                Major mainland networks
              </p>
            </div>
            <ul className="flex flex-wrap gap-2 sm:gap-2.5">
              {networks.map((network) => (
                <li key={network}>
                  <span className="inline-flex items-center rounded-full border border-sky-100 bg-[#F8FBFE] px-3.5 py-1.5 text-xs font-bold text-[#0B1E48] sm:text-sm dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-white">
                    {network}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:gap-3.5 sm:p-6 dark:border-slate-800 dark:bg-card">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] dark:text-slate-400"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {notice ? (
          <aside className="mt-6 sm:mt-8">
            <Alert className="rounded-2xl border-orange-200/80 bg-[#FFF0E8]/70 px-5 py-4 dark:border-orange-900/50 dark:bg-[#FF5A22]/10 sm:px-6 sm:py-5">
              <MapPinned className="text-[#FF5A22]" aria-hidden="true" />
              <AlertDescription className="text-xs leading-relaxed text-slate-600 sm:text-[13.5px] dark:text-slate-300">
                <p>{notice}</p>
                {territories.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {territories.map((territory) => (
                      <li key={territory}>
                        <span className="inline-flex rounded-full border border-orange-200/90 bg-white px-3 py-1 text-[11px] font-bold text-[#E04A1A] dark:border-[#FF5A22]/30 dark:bg-card dark:text-[#FF5A22] sm:text-xs">
                          {territory}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </AlertDescription>
            </Alert>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
