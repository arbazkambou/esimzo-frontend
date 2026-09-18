import React from "react";

export default function AnimatedAirplane() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes flyToSkyHero {
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

        @keyframes jetStreamHero {
          from { stroke-dashoffset: 50; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes heatHazeHero {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.2); }
        }
      `}</style>

      {/* Subtle background grid for atmospheric depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Moving Airplane */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "-10%",
          animation: "flyToSkyHero 8s linear infinite",
          willChange: "transform",
        }}
      >
        <svg
          width="280"
          height="110"
          viewBox="0 0 300 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="fuselageGradHero" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="40%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="wingGradHero" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="trailGradHero" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Realistic Contrail (Exhaust Jet Stream) */}
          <path
            d="M20,60 L-800,60"
            stroke="url(#trailGradHero)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="30 15"
            className="text-primary/20"
            style={{ animation: "jetStreamHero 1.5s linear infinite" }}
          />

          {/* Heat Haze Effect */}
          <rect
            x="10"
            y="55"
            width="40"
            height="10"
            fill="currentColor"
            className="text-primary/10 blur-md"
            style={{ animation: "heatHazeHero 0.1s infinite" }}
          />

          {/* Rear Tail Fins */}
          <path d="M50,60 L15,35 L25,60 Z" fill="url(#wingGradHero)" />
          <path d="M55,60 L30,68 L55,75 Z" fill="#475569" />

          {/* Main Fuselage */}
          <path
            d="M50,60 C80,60 220,50 260,60 C280,65 270,75 240,78 C180,82 80,80 50,75 Z"
            fill="url(#fuselageGradHero)"
          />

          {/* Cockpit & Cabin Windows */}
          <path
            d="M230,58 C245,58 255,62 250,65 L230,65 Z"
            fill="#1e293b"
            opacity="0.7"
          />
          <rect x="100" y="63" width="4" height="3" rx="1" fill="#1e293b" opacity="0.4" />
          <rect x="110" y="63" width="4" height="3" rx="1" fill="#1e293b" opacity="0.4" />
          <rect x="120" y="63" width="4" height="3" rx="1" fill="#1e293b" opacity="0.4" />

          {/* Swept-back Wings */}
          <path
            d="M140,55 L110,20 L150,20 L180,55 Z"
            fill="url(#wingGradHero)"
            opacity="0.8"
          />
          <path
            d="M120,65 L80,110 L130,110 L170,65 Z"
            fill="url(#wingGradHero)"
          />

          {/* Engine Pod */}
          <rect x="105" y="90" width="35" height="12" rx="6" fill="#334155" />
          <circle cx="135" cy="96" r="4" fill="#0f172a" />
        </svg>
      </div>
    </div>
  );
}
