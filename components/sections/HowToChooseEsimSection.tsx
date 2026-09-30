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
        className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary-soft/35 blur-3xl dark:bg-primary/25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/5 bottom-0 h-96 w-96 translate-x-1/3 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        <header className="mb-10 text-center sm:mb-12">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-primary-soft px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-primary/15">
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
            className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl dark:text-white"
          >
            {titleHasCountrySuffix ? (
              <>
                {titlePrefix}{" "}
                <span className="text-primary">{countryName}</span>
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
          <Alert className="mb-8 border-primary/20 bg-primary-soft/70 dark:border-primary/30 dark:bg-primary/30">
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
                <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-sm sm:p-6 dark:border-slate-800 dark:bg-card dark:hover:border-primary">
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-primary/70 to-transparent opacity-80"
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xs font-extrabold tracking-wide text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary-soft group-hover:text-primary group-hover:ring-primary/15 dark:bg-primary/20 dark:text-primary dark:ring-primary/20 dark:group-hover:bg-primary/15 dark:group-hover:text-primary dark:group-hover:ring-primary/25 sm:h-10 sm:w-10"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="mb-2.5 text-base font-bold leading-snug text-foreground sm:mb-3 sm:text-[17px] dark:text-white">
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
                        <Alert className="mt-4 border-primary/20 bg-primary-soft/70 dark:border-primary/30 dark:bg-primary/10">
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
            className="group inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-white px-6 py-2.5 text-xs font-semibold text-foreground shadow-2xs transition-all hover:border-primary hover:text-primary hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none sm:text-sm dark:border-primary/30 dark:bg-card dark:text-slate-200"
          >
            <ArrowUp
              className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
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
