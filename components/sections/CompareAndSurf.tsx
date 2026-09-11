import Link from "next/link";

type Step = {
  title: string;
  description: string;
};

type Props = {
  heading?: string;
  steps?: Step[];
  ctaLabel?: string;
  ctaHref?: string;
};

const defaultSteps: Step[] = [
  {
    title: "Check your smartphone is eSIM compatible",
    description:
      "Most modern phones are eSIM compatible (e.g., since 2018, all iPhones support eSIMs). If you're in doubt, check your device settings or manufacturer website.",
  },
  {
    title: "Estimate how much data you need",
    description:
      "We recommend at least 2 GB for a weekend trip or 10 GB for a two-week trip. Consider your usage habits — streaming, maps, and social media use more data.",
  },
  {
    title: "Find the best eSIM package",
    description:
      "Use our comparison tool to compare thousands of packages from 120+ trusted providers and pick the one that's right for you.",
  },
  {
    title: "Install and activate your eSIM",
    description:
      "It differs from provider to provider, but normally you can activate your eSIM either directly through the eSIM app or by scanning a QR code.",
  },
  {
    title: "Surf the internet 🏄",
    description:
      "Your data will be ready to use as soon as you arrive at your destination.",
  },
];

export default function CompareAndSurf({
  heading = "How to surf the web abroad for cheap",
  steps = defaultSteps,
  ctaLabel = "Find the best eSIM now",
  ctaHref = "#plans",
}: Props) {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          {heading}
        </h2>

        {/* Steps */}
        <ol className="flex flex-col gap-0 md:max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-5 relative">
              {/* Number badge + connecting line */}
              <div className="flex flex-col items-center shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md shadow-primary/20 z-10">
                  {i + 1}
                </div>
                {/* Vertical connector — hidden on last item */}
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-8" />
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                <p className="text-base font-semibold text-foreground mb-1">
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="flex justify-center mt-4">
          <Link
            href={ctaHref}
            className="inline-flex items-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 active:scale-95"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
