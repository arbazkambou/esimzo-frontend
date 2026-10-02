import type { HowToChooseEsimContent } from "@/lib/content/countries";
import { fillCountryTemplate } from "@/lib/display-name";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowUp, Compass } from "lucide-react";

type Props = {
  countryName: string;
  content: HowToChooseEsimContent;
};

export default function HowToChooseEsimSection({
  countryName,
  content,
}: Props) {
  const heading = fillCountryTemplate(content.headingTemplate, countryName);
  const intro = fillCountryTemplate(content.intro, countryName);

  const criteria = content.criteria.filter(
    (criterion) =>
      criterion.heading.trim().length > 0 &&
      criterion.paragraphs.some((p) => p.trim().length > 0),
  );

  if (criteria.length === 0) return null;

  const sectionNotice = content.notice?.trim()
    ? fillCountryTemplate(content.notice, countryName)
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
      className="bg-background py-[var(--section-y-tight)]"
    >
      <div className="w-full">
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

        <ol className="flex w-full flex-col gap-3 sm:gap-3.5">
          {criteria.map((criterion, index) => {
            const paragraphs = criterion.paragraphs
              .map((p) => fillCountryTemplate(p, countryName).trim())
              .filter(Boolean);
            const list = criterion.list
              ?.map((item) => fillCountryTemplate(item, countryName).trim())
              .filter(Boolean);
            const notice = criterion.notice?.trim()
              ? fillCountryTemplate(criterion.notice, countryName)
              : null;

            return (
              <li key={`${criterion.heading}-${index}`}>
                <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:p-6 dark:border-slate-800 dark:bg-card">
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xs font-extrabold tracking-wide text-primary ring-1 ring-primary/15 dark:bg-primary/20 dark:text-primary dark:ring-primary/20 sm:h-10 sm:w-10"
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
                            className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {list && list.length > 0 ? (
                        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-text-secondary sm:text-[13.5px]">
                          {list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}

                      {notice ? (
                        <Alert className="mt-4 border-primary/20 bg-primary-soft/70 dark:border-primary/30 dark:bg-primary/10">
                          <AlertDescription className="text-text-secondary">
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
          <Button asChild variant="secondary" size="sm">
            <a href="#plans">
              <ArrowUp className="size-4" strokeWidth={2.4} aria-hidden />
              Back to {countryName} plans
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
