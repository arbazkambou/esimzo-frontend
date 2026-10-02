import type {
  CountryVsRegionalContent,
  CountryVsRegionalOption,
} from "@/lib/content/countries";
import { fillCountryTemplate } from "@/lib/display-name";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Flag, Globe2, Info } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  countryName: string;
  content: CountryVsRegionalContent;
};

function OptionPanel({
  option,
  countryName,
  icon,
  accent,
}: {
  option: CountryVsRegionalOption;
  countryName: string;
  icon: ReactNode;
  accent: "orange" | "sky";
}) {
  const title = fillCountryTemplate(option.titleTemplate, countryName);
  const paragraphs = option.paragraphs
    .map((p) => fillCountryTemplate(p, countryName).trim())
    .filter(Boolean);
  const destinations =
    option.destinations?.map((d) => d.trim()).filter(Boolean) ?? [];

  if (paragraphs.length === 0) return null;

  const iconWrap =
    accent === "orange"
      ? "bg-primary-soft text-primary dark:bg-primary/15"
      : "bg-primary-soft text-primary dark:bg-primary/20 dark:text-primary";

  const chip =
    accent === "orange"
      ? "border-primary/20 bg-primary-soft text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary"
      : "border-primary/15 bg-muted text-foreground dark:border-primary/20 dark:bg-primary/20 dark:text-white";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:p-6 dark:border-slate-800 dark:bg-card">
      <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconWrap}`}
          aria-hidden="true"
        >
          {icon}
        </span>
        <h3 className="text-base font-extrabold leading-snug text-foreground sm:text-lg dark:text-white">
          {title}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {destinations.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {destinations.map((destination) => (
            <li key={destination}>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold sm:text-xs ${chip}`}
              >
                {destination}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default function CountryVsRegionalSection({
  countryName,
  content,
}: Props) {
  const heading = fillCountryTemplate(content.headingTemplate, countryName);
  const notice = content.notice?.trim()
    ? fillCountryTemplate(content.notice, countryName)
    : null;

  const countryParagraphs = content.countryOption.paragraphs
    .map((p) => fillCountryTemplate(p, countryName).trim())
    .filter(Boolean);
  const regionalParagraphs = content.regionalOption.paragraphs
    .map((p) => fillCountryTemplate(p, countryName).trim())
    .filter(Boolean);

  if (countryParagraphs.length === 0 && regionalParagraphs.length === 0) {
    return null;
  }

  const countryIndex = heading.indexOf(countryName);
  const canHighlightCountry = countryIndex >= 0;

  return (
    <section
      id="country-vs-regional"
      aria-labelledby="country-vs-regional-heading"
      className="bg-background py-[var(--section-y-tight)]"
    >
      <div className="w-full">
        <header className="mb-10 text-center sm:mb-12">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-primary-soft px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-primary/15 dark:text-primary">
              <Globe2
                className="h-3.5 w-3.5"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              {content.eyebrow}
            </p>
          ) : null}

          <h2
            id="country-vs-regional-heading"
            className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl dark:text-white"
          >
            {canHighlightCountry ? (
              <>
                {heading.slice(0, countryIndex)}
                <span className="text-primary">{countryName}</span>
                {heading.slice(countryIndex + countryName.length)}
              </>
            ) : (
              heading
            )}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {countryParagraphs.length > 0 ? (
            <OptionPanel
              option={content.countryOption}
              countryName={countryName}
              accent="orange"
              icon={<Flag className="h-5 w-5" strokeWidth={2.2} />}
            />
          ) : null}
          {regionalParagraphs.length > 0 ? (
            <OptionPanel
              option={content.regionalOption}
              countryName={countryName}
              accent="sky"
              icon={<Globe2 className="h-5 w-5" strokeWidth={2.2} />}
            />
          ) : null}
        </div>

        {notice ? (
          <aside className="mt-6 sm:mt-8">
            <Alert className="rounded-2xl border-primary/20 bg-primary-soft/70 px-5 py-4 dark:border-primary/30 dark:bg-primary/10 sm:px-6 sm:py-5">
              <Info className="text-primary" aria-hidden="true" />
              <AlertDescription className="text-xs leading-relaxed text-text-secondary sm:text-[13.5px]">
                {notice}
              </AlertDescription>
            </Alert>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
