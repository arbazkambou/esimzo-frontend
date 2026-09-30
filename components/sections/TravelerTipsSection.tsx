import type { TravelerTipsContent } from "@/lib/content/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

type Props = {
  countryName: string;
  content: TravelerTipsContent;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export default function TravelerTipsSection({
  countryName,
  content,
}: Props) {
  const values = { countryName };
  const heading = fillTemplate(content.headingTemplate, values);
  const intro = content.intro?.trim()
    ? fillTemplate(content.intro, values)
    : null;
  const notice = content.notice?.trim()
    ? fillTemplate(content.notice, values)
    : null;

  const tips = content.tips.filter(
    (tip) =>
      tip.title.trim().length > 0 &&
      tip.paragraphs.some((p) => p.trim().length > 0),
  );

  if (tips.length === 0) return null;

  const titleSuffix = ` ${countryName}`;
  const titleHasCountrySuffix = heading.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? heading.slice(0, -titleSuffix.length)
    : heading;

  return (
    <section
      id="traveler-tips"
      aria-labelledby="traveler-tips-heading"
      className="relative overflow-hidden bg-background py-14 sm:py-20"
    >
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/5 bottom-0 h-96 w-96 translate-x-1/3 rounded-full bg-primary-soft/35 blur-3xl dark:bg-primary/25"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        <header className="mb-10 text-center sm:mb-12">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-primary-soft px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-primary/15">
              <Lightbulb
                className="h-3.5 w-3.5"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              {content.eyebrow}
            </p>
          ) : null}

          <h2
            id="traveler-tips-heading"
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

          {intro ? (
            <p className="mx-auto max-w-3xl text-left text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] dark:text-slate-400">
              {intro}
            </p>
          ) : null}
        </header>

        {notice ? (
          <Alert className="mb-8 border-primary/20 bg-primary-soft/70 dark:border-primary/30 dark:bg-primary/30">
            <AlertDescription className="text-slate-600 dark:text-slate-300">
              {notice}
            </AlertDescription>
          </Alert>
        ) : null}

        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
          {tips.map((tip, index) => {
            const paragraphs = tip.paragraphs
              .map((p) => fillTemplate(p, values).trim())
              .filter(Boolean);

            return (
              <li key={`${tip.title}-${index}`}>
                <article className="flex h-full gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:gap-4 sm:p-5 dark:border-slate-800 dark:bg-card">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-[11px] font-extrabold text-primary ring-1 ring-primary/15 dark:bg-primary/20 dark:text-primary dark:ring-primary/20"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-2 text-sm font-bold leading-snug text-foreground sm:text-[15px] dark:text-white">
                      {tip.title}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {paragraphs.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] dark:text-slate-400"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
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
