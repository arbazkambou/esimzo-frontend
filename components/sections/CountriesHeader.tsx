import { capitalize } from "@/lib/constants";
import { Wifi } from "lucide-react";

type Props = {
  slug: string;
};

export default function CountriesHeader({ slug }: Props) {
  const countryName = capitalize(slug.replace(/-/g, " "));

  return (
    <section className="relative min-h-[400px] overflow-hidden bg-gradient-to-b from-secondary/40 via-secondary/40 to-background flex items-center">
      {/* Dynamic Keyframes */}
      <style>{`
        @keyframes flyToSky {
          0% {
            transform: translate3d(-10vw, 30vh, 0) rotate(-20deg) scale(0.6);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translate3d(110vw, -40vh, 0) rotate(-25deg) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes jetStream {
          from { stroke-dashoffset: 50; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes heatHaze {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.2); }
        }
      `}</style>

      {/* Animated Background Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid for depth */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* The Airplane */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-10%",
            animation: "flyToSky 7s linear infinite",
            willChange: "transform",
          }}
        >
          <svg
            width="300"
            height="120"
            viewBox="0 0 300 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            <defs>
              <linearGradient
                id="fuselageGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="40%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop
                  offset="100%"
                  stopColor="currentColor"
                  stopOpacity="0.5"
                />
              </linearGradient>
            </defs>
            {/* Realistic Contrail (Exhaust) */}
            <path
              d="M20,60 L-800,60"
              stroke="url(#trailGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="30 15"
              className="text-primary/20"
              style={{ animation: "jetStream 1.5s linear infinite" }}
            />
            {/* Heat Haze Effect */}
            <rect
              x="10"
              y="55"
              width="40"
              height="10"
              fill="currentColor"
              className="text-primary/10 blur-md"
              style={{ animation: "heatHaze 0.1s infinite" }}
            />
            {/* Rear Tail Fins */}
            <path d="M50,60 L15,35 L25,60 Z" fill="url(#wingGrad)" />{" "}
            {/* Vertical */}
            <path d="M55,60 L30,68 L55,75 Z" fill="#475569" />{" "}
            {/* Horizontal bottom */}
            {/* Main Fuselage */}
            <path
              d="M50,60 C80,60 220,50 260,60 C280,65 270,75 240,78 C180,82 80,80 50,75 Z"
              fill="url(#fuselageGrad)"
            />
            {/* Windows */}
            <path
              d="M230,58 C245,58 255,62 250,65 L230,65 Z"
              fill="#1e293b"
              opacity="0.7"
            />
            <rect
              x="100"
              y="63"
              width="4"
              height="3"
              rx="1"
              fill="#1e293b"
              opacity="0.4"
            />
            <rect
              x="110"
              y="63"
              width="4"
              height="3"
              rx="1"
              fill="#1e293b"
              opacity="0.4"
            />
            <rect
              x="120"
              y="63"
              width="4"
              height="3"
              rx="1"
              fill="#1e293b"
              opacity="0.4"
            />
            {/* Swept-back Wings */}
            {/* Top Wing (Far side) */}
            <path
              d="M140,55 L110,20 L150,20 L180,55 Z"
              fill="url(#wingGrad)"
              opacity="0.8"
            />
            {/* Bottom Wing (Near side) */}
            <path
              d="M120,65 L80,110 L130,110 L170,65 Z"
              fill="url(#wingGrad)"
            />
            {/* Engine Pod */}
            <rect x="105" y="90" width="35" height="12" rx="6" fill="#334155" />
            <circle cx="135" cy="96" r="4" fill="#0f172a" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary shadow-xl backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Compare Plans
          </div>

          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-5xl">
              Find the best eSIM for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">
                  {countryName}
                </span>
              </span>
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg sm:text-xl">
              Forget physical SIM cards. Get connected the moment you land with
              our premium eSIM plans.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              <span>5G Speed</span>
            </div>
            <div className="h-4 w-[1px] bg-border" />
            <span>Global Coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
}
