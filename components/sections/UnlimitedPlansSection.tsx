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
        <header className="mb-8 text-center sm:mb-10">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-[#FFF0E8] px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#FF5A22] select-none dark:bg-[#FF5A22]/15">
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

          {introParagraphs.length > 0 ? (
            <div className="mx-auto flex max-w-3xl flex-col gap-3">
              {introParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] dark:text-slate-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </header>

        {notice ? (
          <Alert className="mb-8 border-sky-200/80 bg-sky-50/70 dark:border-sky-900 dark:bg-sky-950/30">
            <AlertDescription className="text-slate-600 dark:text-slate-300">
              {notice}
            </AlertDescription>
          </Alert>
        ) : null}

        {checklist.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-card">
            <div className="flex items-start gap-3 border-b border-slate-100 bg-[#F8FBFE] px-5 py-4 sm:items-center sm:px-6 sm:py-5 dark:border-slate-800 dark:bg-slate-900/40">
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0284C7] shadow-2xs ring-1 ring-sky-100 dark:bg-card dark:text-sky-400 dark:ring-sky-900/60 sm:mt-0"
                aria-hidden="true"
              >
                <CheckCircle2 className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              <p className="text-sm font-extrabold leading-snug tracking-tight text-[#0B1E48] sm:text-base dark:text-white">
                {checklistIntro}
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-3.5 sm:p-5">
              {checklist.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#F8FBFE]/70 p-4 dark:border-slate-800 dark:bg-slate-900/30"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[11px] font-extrabold text-[#0284C7] ring-1 ring-sky-100 dark:bg-card dark:text-sky-400 dark:ring-sky-900/60"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-xs leading-relaxed font-semibold text-[#0B1E48] sm:text-[13.5px] dark:text-white">
                    {item}
                  </p>
                </li>
              ))}
            </ol>

            {closing ? (
              <div className="flex flex-col gap-4 border-t border-orange-100 bg-[#FFF0E8]/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-[#FF5A22]/20 dark:bg-[#FF5A22]/10">
                <p className="text-xs leading-relaxed font-semibold text-[#E04A1A] sm:max-w-xl sm:text-[13.5px] dark:text-[#FF5A22]">
                  {closing}
                </p>
                <a
                  href="#plans"
                  className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#FF5A22]/30 bg-white px-4 py-2 text-xs font-bold text-[#FF5A22] transition-colors hover:bg-[#FF5A22] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-card"
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
          <p className="text-center text-xs leading-relaxed font-semibold text-[#E04A1A] sm:text-[13.5px] dark:text-[#FF5A22]">
            {closing}
          </p>
        ) : null}
      </div>
    </section>
  );
}
