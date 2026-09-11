import SearchList from "@/components/search/SearchList";
import FluffyAnimal from "@/components/sections/FluffyAnimal";
import { ArrowLeft, Wifi } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background via-secondary/40 to-background py-20">
      {/* Inline keyframes for custom animations */}
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes wag {
          0%, 100% { transform: rotate(-10deg); }
          25% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes blink {
          0%, 42%, 44%, 100% { transform: scaleY(1); }
          43% { transform: scaleY(0.1); }
        }
        @keyframes floatQuestion {
          0%, 100% { transform: translateY(0) rotate(-5deg); opacity: 0.7; }
          50% { transform: translateY(-12px) rotate(5deg); opacity: 1; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes earWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
      `}</style>

      <div className="container relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* ── Left: Messaging ── */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Oops!</span>
                <span className="absolute inset-x-0 bottom-1 -z-10 h-3 rounded-sm bg-accent" />
              </span>{" "}
              Page Not Found
            </h1>

            {/* Description */}
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Looks like the page you're looking for doesn't exist anymore — or
              maybe it never did. But don’t worry, we’re here to keep you
              connected. Let’s get you back on track!
            </p>

            <SearchList variant="bar" />

            {/* CTA */}
            <Link
              href="/"
              id="no-packages-back-btn"
              className="group flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Explore Other Destinations
            </Link>
          </div>

          {/* ── Right: Fluffy Animated Character ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Soft glow */}
            <div className="absolute inset-0 m-auto h-[320px] w-[320px] rounded-full bg-linear-to-br from-accent to-secondary opacity-40 blur-3xl" />

            <FluffyAnimal />
          </div>
        </div>
      </div>
    </section>
  );
}
