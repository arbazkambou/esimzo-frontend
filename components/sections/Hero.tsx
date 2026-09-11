import Link from "next/link";
import ConfusedPeopleSVG from "./ConfusedPeopleSVG";
import SearchList from "@/components/search/SearchList";

const popularDestinations = [
  { flag: "🇫🇷", name: "France", link: "/france/" },
  { flag: "🇪🇸", name: "Spain", link: "/spain/" },
  { flag: "🇺🇸", name: "USA", link: "/united-states/" },
  { flag: "🇯🇵", name: "Japan", link: "/japan/" },
  { flag: "🇬🇧", name: "UK", link: "/united-kingdom/" },
  { flag: "🇦🇪", name: "UAE", link: "/united-arab-emirates/" },
  { flag: "🇹🇷", name: "Turkey", link: "/turkey/" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-secondary/80 via-secondary/60 to-background py-10"
    >
      <div className="container relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* ── Left: copy + CTA ── */}
          <div className="flex flex-col items-start gap-6">
            {/* Heading */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Compare & find the{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">best eSIM</span>
                <span className="absolute inset-x-0 bottom-1 -z-10 h-3 rounded-sm bg-accent" />
              </span>{" "}
              plan for any country
            </h1>

            {/* Subtext */}
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Stop scrolling through dozens of providers. We instantly compare{" "}
              <span className="font-semibold text-foreground">
                200,000+ data plans
              </span>{" "}
              so you always get the best deal — without overpaying.
            </p>

            {/* Search bar */}
            <div className="w-full max-w-xl">
              <SearchList variant="bar" />

              {/* Popular tags */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Popular:</span>
                {popularDestinations.map((d) => (
                  <Link
                    key={d.name}
                    href={d.link}
                    className="flex items-center gap-1 rounded-full border border-border bg-card px-4 py-1 text-xs font-medium text-card-foreground transition-all hover:bg-secondary/40 hover:text-primary"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: SVG illustration ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Soft glow behind illustration */}
            <div className="absolute inset-0 m-auto h-[360px] w-[360px] rounded-full bg-linear-to-br from-accent to-secondary opacity-40 blur-3xl" />
            <div className="relative z-10 w-full max-w-lg">
              <ConfusedPeopleSVG />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
