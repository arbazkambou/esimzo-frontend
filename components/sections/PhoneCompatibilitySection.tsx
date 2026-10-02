import type { PhoneCompatibilityContent } from "@/lib/content/countries";
import { fillCountryTemplate } from "@/lib/display-name";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone } from "lucide-react";

type Props = {
  countryName: string;
  content: PhoneCompatibilityContent;
};

export default function PhoneCompatibilitySection({
  countryName,
  content,
}: Props) {
  const heading = fillCountryTemplate(content.headingTemplate, countryName);

  const paragraphs = content.paragraphs
    .map((p) => fillCountryTemplate(p, countryName).trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  const notice = content.notice?.trim()
    ? fillCountryTemplate(content.notice, countryName)
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
      className="bg-background py-[var(--section-y-tight)]"
    >
      <div className="w-full">
        <header className="mb-10 text-center sm:mb-12">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-primary-soft px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-primary/15">
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
        </header>

        {notice ? (
          <Alert className="mb-8 border-primary/20 bg-primary-soft/70 dark:border-primary/30 dark:bg-primary/30">
            <AlertDescription className="text-text-secondary">
              {notice}
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-card">
          <div className="flex gap-4 p-5 sm:gap-5 sm:p-6">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary dark:bg-primary/20 dark:text-primary"
              aria-hidden="true"
            >
              <Smartphone className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-3.5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-left text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]"
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
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-bold text-primary transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-primary/30 dark:bg-card dark:text-primary"
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
