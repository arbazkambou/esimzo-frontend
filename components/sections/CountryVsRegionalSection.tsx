import type {
  CountryVsRegionalContent,
  CountryVsRegionalOption,
} from "@/lib/content/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Flag, Globe2, Info } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  countryName: string;
  content: CountryVsRegionalContent;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

function OptionPanel({
  option,
  values,
  icon,
  accent,
}: {
  option: CountryVsRegionalOption;
  values: Record<string, string>;
  icon: ReactNode;
  accent: "orange" | "sky";
}) {
  const title = fillTemplate(option.titleTemplate, values);
  const paragraphs = option.paragraphs
    .map((p) => fillTemplate(p, values).trim())
    .filter(Boolean);
  const destinations =
    option.destinations?.map((d) => d.trim()).filter(Boolean) ?? [];

  if (paragraphs.length === 0) return null;

  const iconWrap =
    accent === "orange"
      ? "bg-[#FFF0E8] text-[#FF5A22] dark:bg-[#FF5A22]/15"
      : "bg-[#EBF5FE] text-[#0284C7] dark:bg-sky-950/50 dark:text-sky-400";

  const chip =
    accent === "orange"
      ? "border-orange-200/90 bg-[#FFF0E8] text-[#E04A1A] dark:border-[#FF5A22]/30 dark:bg-[#FF5A22]/15 dark:text-[#FF5A22]"
      : "border-sky-100 bg-[#F8FBFE] text-[#0B1E48] dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-white";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:p-6 dark:border-slate-800 dark:bg-card">
      <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconWrap}`}
          aria-hidden="true"
        >
          {icon}
        </span>
        <h3 className="text-base font-extrabold leading-snug text-[#0B1E48] sm:text-lg dark:text-white">
          {title}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-xs leading-relaxed font-normal text-slate-500 sm:text-[13.5px] dark:text-slate-400"
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
  const values = { countryName };
  const heading = fillTemplate(content.headingTemplate, values);
  const notice = content.notice?.trim()
    ? fillTemplate(content.notice, values)
    : null;

  const countryParagraphs = content.countryOption.paragraphs
    .map((p) => fillTemplate(p, values).trim())
    .filter(Boolean);
  const regionalParagraphs = content.regionalOption.paragraphs
    .map((p) => fillTemplate(p, values).trim())
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
        <header className="mb-10 text-center sm:mb-12">
          {content.eyebrow ? (
            <p className="mb-3.5 inline-flex items-center justify-center gap-2 rounded-full bg-[#EBF5FE] px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0284C7] select-none dark:bg-[#0EA5E9]/15 dark:text-[#38BDF8]">
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
            className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-[#0B1E48] sm:text-3xl lg:text-4xl dark:text-white"
          >
            {canHighlightCountry ? (
              <>
                {heading.slice(0, countryIndex)}
                <span className="text-[#FF5A22]">{countryName}</span>
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
              values={values}
              accent="orange"
              icon={<Flag className="h-5 w-5" strokeWidth={2.2} />}
            />
          ) : null}
          {regionalParagraphs.length > 0 ? (
            <OptionPanel
              option={content.regionalOption}
              values={values}
              accent="sky"
              icon={<Globe2 className="h-5 w-5" strokeWidth={2.2} />}
            />
          ) : null}
        </div>

        {notice ? (
          <aside className="mt-6 sm:mt-8">
            <Alert className="rounded-2xl border-orange-200/80 bg-[#FFF0E8]/70 px-5 py-4 dark:border-orange-900/50 dark:bg-[#FF5A22]/10 sm:px-6 sm:py-5">
              <Info className="text-[#FF5A22]" aria-hidden="true" />
              <AlertDescription className="text-xs leading-relaxed text-slate-600 sm:text-[13.5px] dark:text-slate-300">
                {notice}
              </AlertDescription>
            </Alert>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
