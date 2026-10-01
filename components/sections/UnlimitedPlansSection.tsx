import type { UnlimitedPlansContent } from "@/lib/content/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowUp,
  CheckCircle2,
  Infinity as InfinityIcon,
} from "lucide-react";

type Props = {
  countryName: string;
  content: UnlimitedPlansContent;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export default function UnlimitedPlansSection({
  countryName,
  content,
}: Props) {
  const values = { countryName };
  const heading = fillTemplate(content.headingTemplate, values);

  const introParagraphs = content.introParagraphs
    .map((p) => fillTemplate(p, values).trim())
    .filter(Boolean);
  const checklistIntro = fillTemplate(content.checklistIntro, values).trim();
  const checklist = content.checklist.map((item) => item.trim()).filter(Boolean);
  const closing = fillTemplate(content.closing, values).trim();
  const notice = content.notice?.trim()
    ? fillTemplate(content.notice, values)
    : null;

  if (introParagraphs.length === 0 && checklist.length === 0 && !closing) {
    return null;
  }

  const titleSuffix = ` ${countryName}?`;
  const titleHasCountrySuffix = heading.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? heading.slice(0, -titleSuffix.length)
    : heading;

  return (
    <section
      id="unlimited-plans"
      aria-labelledby="unlimited-plans-heading"
      className="bg-background py-[var(--section-y-tight)]"
    >
      <div className="w-full">
        <header className="mb-8 text-center sm:mb-10">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-primary-soft px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-primary/15">
              <InfinityIcon
                className="h-3.5 w-3.5"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              {content.eyebrow}
            </p>
          ) : null}

          <h2
            id="unlimited-plans-heading"
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

          {introParagraphs.length > 0 ? (
            <div className="mx-auto flex max-w-3xl flex-col gap-3">
              {introParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </header>

        {notice ? (
          <Alert className="mb-8 border-primary/20 bg-primary-soft/70 dark:border-primary/30 dark:bg-primary/30">
            <AlertDescription className="text-text-secondary">
              {notice}
            </AlertDescription>
          </Alert>
        ) : null}

        {checklist.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-card">
            <div className="flex items-start gap-3 border-b border-slate-100 bg-muted px-5 py-4 sm:items-center sm:px-6 sm:py-5 dark:border-slate-800 dark:bg-slate-900/40">
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-2xs ring-1 ring-primary/15 dark:bg-card dark:text-primary dark:ring-primary/20 sm:mt-0"
                aria-hidden="true"
              >
                <CheckCircle2 className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              <p className="text-sm font-extrabold leading-snug tracking-tight text-foreground sm:text-base dark:text-white">
                {checklistIntro}
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-3.5 sm:p-5">
              {checklist.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-muted/70 p-4 dark:border-slate-800 dark:bg-slate-900/30"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[11px] font-extrabold text-primary ring-1 ring-primary/15 dark:bg-card dark:text-primary dark:ring-primary/20"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-xs leading-relaxed font-semibold text-foreground sm:text-[13.5px] dark:text-white">
                    {item}
                  </p>
                </li>
              ))}
            </ol>

            {closing ? (
              <div className="flex flex-col gap-4 border-t border-primary/15 bg-primary-soft/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-primary/20 dark:bg-primary/10">
                <p className="text-xs leading-relaxed font-semibold text-primary sm:max-w-xl sm:text-[13.5px] dark:text-primary">
                  {closing}
                </p>
                <a
                  href="#plans"
                  className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-primary/30 bg-white px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-card"
                >
                  <ArrowUp
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  Compare {countryName} plans
                </a>
              </div>
            ) : null}
          </div>
        ) : closing ? (
          <p className="text-center text-xs leading-relaxed font-semibold text-primary sm:text-[13.5px] dark:text-primary">
            {closing}
          </p>
        ) : null}
      </div>
    </section>
  );
}
