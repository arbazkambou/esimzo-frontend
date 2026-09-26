import type { HowToChooseEsimContent } from "@/lib/content/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Compass } from "lucide-react";

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

  return (
    <section
      id="how-to-choose"
      aria-labelledby="how-to-choose-heading"
      className="relative overflow-hidden bg-background py-14 sm:py-20"
    >
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-100/30 blur-3xl dark:bg-sky-950/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 translate-x-1/2 rounded-full bg-orange-100/20 blur-3xl dark:bg-orange-950/15"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
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
            {heading}
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed font-normal text-slate-500 sm:text-[15px] dark:text-slate-400">
            {intro}
          </p>
        </header>

        {sectionNotice ? (
          <Alert className="mb-8 border-sky-200/80 bg-sky-50/60 dark:border-sky-900 dark:bg-sky-950/30">
            <AlertDescription className="text-slate-600 dark:text-slate-300">
              {sectionNotice}
            </AlertDescription>
          </Alert>
        ) : null}

        <ol className="flex flex-col gap-0">
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
              <li
                key={`${criterion.heading}-${index}`}
                className="border-b border-slate-200/80 py-7 last:border-b-0 last:pb-0 first:pt-0 dark:border-slate-800"
              >
                <article className="flex gap-4 sm:gap-5">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-[#EBF5FE] text-xs font-extrabold text-[#0284C7] dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-400 sm:h-9 sm:w-9"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="mb-3 text-base font-bold leading-snug text-[#0B1E48] sm:text-lg dark:text-white">
                      {criterion.heading}
                    </h3>

                    <div className="flex flex-col gap-3">
                      {paragraphs.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-sm leading-relaxed font-normal text-slate-500 sm:text-[15px] sm:leading-7 dark:text-slate-400"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {list && list.length > 0 ? (
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-500 sm:text-[15px] dark:text-slate-400">
                        {list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}

                    {notice ? (
                      <Alert className="mt-4 border-orange-200/80 bg-[#FFF0E8]/60 dark:border-orange-900/50 dark:bg-[#FF5A22]/10">
                        <AlertDescription className="text-slate-600 dark:text-slate-300">
                          {notice}
                        </AlertDescription>
                      </Alert>
                    ) : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
