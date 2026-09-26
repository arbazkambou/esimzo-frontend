import type { HowToChooseEsimContent } from "@/lib/content/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowUp, Compass } from "lucide-react";

type Props = {
  countryName: string;
  content: HowToChooseEsimContent;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export default function HowToChooseEsimSection({
  countryName,
  content,
}: Props) {
  const values = { countryName };
  const heading = fillTemplate(content.headingTemplate, values);
  const intro = fillTemplate(content.intro, values);

  const criteria = content.criteria.filter(
    (criterion) =>
      criterion.heading.trim().length > 0 &&
      criterion.paragraphs.some((p) => p.trim().length > 0),
  );

  if (criteria.length === 0) return null;

  const sectionNotice = content.notice?.trim()
    ? fillTemplate(content.notice, values)
    : null;

  const titleSuffix = ` ${countryName}`;
  const titleHasCountrySuffix = heading.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? heading.slice(0, -titleSuffix.length)
    : heading;

  return (
    <section
      id="how-to-choose"
      aria-labelledby="how-to-choose-heading"
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
              <Compass
                className="h-3.5 w-3.5"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              {content.eyebrow}
            </p>
          ) : null}

          <h2
            id="how-to-choose-heading"
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

        <ol className="flex w-full flex-col gap-3 sm:gap-3.5">
          {criteria.map((criterion, index) => {
            const paragraphs = criterion.paragraphs
              .map((p) => fillTemplate(p, values).trim())
              .filter(Boolean);
            const list = criterion.list
              ?.map((item) => fillTemplate(item, values).trim())
              .filter(Boolean);
            const notice = criterion.notice?.trim()
              ? fillTemplate(criterion.notice, values)
              : null;

            return (
              <li key={`${criterion.heading}-${index}`}>
                <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] duration-200 hover:border-sky-300 hover:shadow-sm sm:p-6 dark:border-slate-800 dark:bg-card dark:hover:border-sky-600">
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#FF5A22] via-sky-400 to-transparent opacity-80"
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EBF5FE] text-xs font-extrabold tracking-wide text-[#0284C7] ring-1 ring-sky-100 transition-colors group-hover:bg-[#FFF0E8] group-hover:text-[#FF5A22] group-hover:ring-orange-100 dark:bg-sky-950/50 dark:text-sky-400 dark:ring-sky-900/60 dark:group-hover:bg-[#FF5A22]/15 dark:group-hover:text-[#FF5A22] dark:group-hover:ring-[#FF5A22]/25 sm:h-10 sm:w-10"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="mb-2.5 text-base font-bold leading-snug text-[#0B1E48] sm:mb-3 sm:text-[17px] dark:text-white">
                        {criterion.heading}
                      </h3>

                      <div className="flex flex-col gap-2.5 sm:gap-3">
                        {paragraphs.map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] sm:leading-relaxed dark:text-slate-400"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {list && list.length > 0 ? (
                        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-slate-500 sm:text-[13.5px] dark:text-slate-400">
                          {list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}

                      {notice ? (
                        <Alert className="mt-4 border-orange-200/80 bg-[#FFF0E8]/70 dark:border-orange-900/50 dark:bg-[#FF5A22]/10">
                          <AlertDescription className="text-slate-600 dark:text-slate-300">
                            {notice}
                          </AlertDescription>
                        </Alert>
                      ) : null}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex justify-center sm:mt-12">
          <a
            href="#plans"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#BCD8F6] bg-white px-6 py-2.5 text-xs font-semibold text-[#0B1E48] shadow-2xs transition-all hover:border-sky-400 hover:text-[#0284C7] hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none sm:text-sm dark:border-sky-800 dark:bg-card dark:text-slate-200"
          >
            <ArrowUp
              className="h-4 w-4 text-[#0284C7] transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
              strokeWidth={2.4}
              aria-hidden="true"
            />
            Back to {countryName} plans
          </a>
        </div>
      </div>
    </section>
  );
}
