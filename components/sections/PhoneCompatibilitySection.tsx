import type { PhoneCompatibilityContent } from "@/lib/content/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone } from "lucide-react";

type Props = {
  countryName: string;
  content: PhoneCompatibilityContent;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export default function PhoneCompatibilitySection({
  countryName,
  content,
}: Props) {
  const values = { countryName };
  const heading = fillTemplate(content.headingTemplate, values);

  const paragraphs = content.paragraphs
    .map((p) => fillTemplate(p, values).trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  const notice = content.notice?.trim()
    ? fillTemplate(content.notice, values)
    : null;

  const showCta =
    Boolean(content.ctaHref?.trim()) && Boolean(content.ctaLabel?.trim());

  const titleSuffix = ` ${countryName}?`;
  const titleHasCountrySuffix = heading.endsWith(titleSuffix);
  const titlePrefix = titleHasCountrySuffix
    ? heading.slice(0, -titleSuffix.length)
    : heading;

  return (
    <section
      id="phone-compatibility"
      aria-labelledby="phone-compatibility-heading"
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
              <Smartphone
                className="h-3.5 w-3.5"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              {content.eyebrow}
            </p>
          ) : null}

          <h2
            id="phone-compatibility-heading"
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
        </header>

        {notice ? (
          <Alert className="mb-8 border-sky-200/80 bg-sky-50/70 dark:border-sky-900 dark:bg-sky-950/30">
            <AlertDescription className="text-slate-600 dark:text-slate-300">
              {notice}
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-card">
          <div className="flex gap-4 p-5 sm:gap-5 sm:p-6">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF5FE] text-[#0284C7] dark:bg-sky-950/50 dark:text-sky-400"
              aria-hidden="true"
            >
              <Smartphone className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-3.5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-left text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] dark:text-slate-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {showCta ? (
            <div className="border-t border-slate-100 px-5 py-4 sm:px-6 dark:border-slate-800">
              <a
                href={content.ctaHref}
                className="inline-flex items-center gap-2 rounded-full border border-[#BCD8F6] bg-white px-4 py-2 text-xs font-bold text-[#0284C7] transition-colors hover:border-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-sky-800 dark:bg-card dark:text-sky-400"
              >
                {content.ctaLabel}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
