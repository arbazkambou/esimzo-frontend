import React from "react";

export default function FluffyAnimal() {
  return (
    <div className="relative z-10 w-full max-w-md">
      <svg
        viewBox="0 0 300 300"
        className="w-full drop-shadow-xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Shadow on ground ── */}
        <ellipse
          cx="150"
          cy="270"
          rx="70"
          ry="10"
          className="fill-foreground/5"
        />

        {/* ── Tail ── */}
        <g
          style={{
            animation: "wag 1.2s ease-in-out infinite",
            transformOrigin: "200px 200px",
          }}
        >
          <path
            d="M200,195 Q235,165 255,130 Q260,118 248,125 Q225,150 205,180"
            fill="#E8913A"
            stroke="#D07A28"
            strokeWidth="1"
          />
          {/* Tail fluff */}
          <circle cx="254" cy="128" r="10" fill="#F5A623" />
          <circle cx="258" cy="120" r="7" fill="#FFBE5C" />
          <circle cx="250" cy="135" r="6" fill="#E8913A" />
        </g>

        {/* ── Body (fluffy blob) ── */}
        <g
          style={{
            animation: "breathe 3s ease-in-out infinite",
            transformOrigin: "150px 190px",
          }}
        >
          {/* Main body */}
          <ellipse cx="150" cy="190" rx="80" ry="68" fill="#F5A623" />

          {/* Belly — lighter warm tone */}
          <ellipse
            cx="150"
            cy="200"
            rx="42"
            ry="35"
            fill="#FFCF80"
            opacity="0.6"
          />
        </g>

        {/* ── Head (fluffy) ── */}
        <g
          style={{
            animation: "sway 4s ease-in-out infinite",
            transformOrigin: "150px 125px",
          }}
        >
          {/* Head base */}
          <circle cx="150" cy="118" r="58" fill="#F5A623" />

          {/* Thick fluffy mane around head */}
          <circle cx="95" cy="100" r="20" fill="#E8913A" />
          <circle cx="205" cy="100" r="20" fill="#E8913A" />
          <circle cx="100" cy="80" r="16" fill="#E89A3A" />
          <circle cx="200" cy="80" r="16" fill="#E89A3A" />
          <circle cx="120" cy="65" r="15" fill="#E8913A" />
          <circle cx="180" cy="65" r="15" fill="#E8913A" />
          <circle cx="150" cy="60" r="16" fill="#F5A623" />

          {/* Top tuft/crest — gives a bold look */}
          <circle cx="140" cy="55" r="12" fill="#FFBE5C" />
          <circle cx="160" cy="55" r="12" fill="#FFBE5C" />
          <circle cx="150" cy="50" r="10" fill="#FFD080" />

          {/* Cheek fur puffs — wide and bold */}
          <circle cx="97" cy="120" r="18" fill="#E89A3A" />
          <circle cx="203" cy="120" r="18" fill="#E89A3A" />

          {/* ── Left Ear (rounded, bold) ── */}
          <g
            style={{
              animation: "earWiggle 3s ease-in-out infinite",
              transformOrigin: "112px 65px",
            }}
          >
            <ellipse
              cx="108"
              cy="55"
              rx="18"
              ry="26"
              transform="rotate(-12,108,55)"
              fill="#E8913A"
            />
            <ellipse
              cx="108"
              cy="55"
              rx="10"
              ry="16"
              transform="rotate(-12,108,55)"
              fill="#D07A28"
              opacity="0.5"
            />
          </g>

          {/* ── Right Ear (rounded, bold) ── */}
          <g
            style={{
              animation: "earWiggle 3s ease-in-out 0.5s infinite",
              transformOrigin: "188px 65px",
            }}
          >
            <ellipse
              cx="192"
              cy="55"
              rx="18"
              ry="26"
              transform="rotate(12,192,55)"
              fill="#E8913A"
            />
            <ellipse
              cx="192"
              cy="55"
              rx="10"
              ry="16"
              transform="rotate(12,192,55)"
              fill="#D07A28"
              opacity="0.5"
            />
          </g>

          {/* ── Eyes (bold, modern) ── */}
          <g
            style={{
              animation: "blink 4s ease-in-out infinite",
              transformOrigin: "150px 112px",
            }}
          >
            {/* Left eye — white sclera + dark iris */}
            <circle cx="130" cy="112" r="12" fill="white" />
            <circle cx="131" cy="113" r="8" className="fill-foreground" />
            <circle cx="133" cy="110" r="3" fill="white" />

            {/* Right eye */}
            <circle cx="170" cy="112" r="12" fill="white" />
            <circle cx="171" cy="113" r="8" className="fill-foreground" />
            <circle cx="173" cy="110" r="3" fill="white" />

            {/* Thick flat eyebrows — bold/masculine */}
            <rect
              x="118"
              y="94"
              width="24"
              height="4"
              rx="2"
              className="fill-foreground/80"
              transform="rotate(-6,130,96)"
            />
            <rect
              x="158"
              y="94"
              width="24"
              height="4"
              rx="2"
              className="fill-foreground/80"
              transform="rotate(6,170,96)"
            />
          </g>

          {/* ── Nose — dark rounded triangle ── */}
          <path
            d="M145,128 L150,134 L155,128 Z"
            className="fill-foreground/70"
            strokeLinejoin="round"
          />

          {/* ── Mouth — flat/neutral expression ── */}
          <path
            d="M140,142 Q150,137 160,142"
            className="stroke-foreground/50"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* ── Paws / feet — rounded bold ── */}
        <ellipse cx="120" cy="252" rx="18" ry="9" fill="#E8913A" />
        <ellipse cx="180" cy="252" rx="18" ry="9" fill="#E8913A" />
        {/* Toe pads */}
        <circle cx="113" cy="250" r="4" fill="#D07A28" opacity="0.4" />
        <circle cx="120" cy="248" r="4" fill="#D07A28" opacity="0.4" />
        <circle cx="127" cy="250" r="4" fill="#D07A28" opacity="0.4" />
        <circle cx="173" cy="250" r="4" fill="#D07A28" opacity="0.4" />
        <circle cx="180" cy="248" r="4" fill="#D07A28" opacity="0.4" />
        <circle cx="187" cy="250" r="4" fill="#D07A28" opacity="0.4" />

        {/* ── Floating question marks ── */}
        <g
          style={{
            animation: "floatQuestion 2.5s ease-in-out infinite",
          }}
        >
          <text
            x="220"
            y="65"
            fontSize="24"
            fontWeight="900"
            className="fill-primary"
            fontFamily="sans-serif"
          >
            ?
          </text>
        </g>
        <g
          style={{
            animation: "floatQuestion 3s ease-in-out 0.8s infinite",
          }}
        >
          <text
            x="240"
            y="90"
            fontSize="16"
            fontWeight="900"
            className="fill-primary/40"
            fontFamily="sans-serif"
          >
            ?
          </text>
        </g>
        <g
          style={{
            animation: "floatQuestion 2.8s ease-in-out 1.5s infinite",
          }}
        >
          <text
            x="55"
            y="75"
            fontSize="20"
            fontWeight="900"
            className="fill-muted-foreground/30"
            fontFamily="sans-serif"
          >
            ?
          </text>
        </g>

        {/* ── Sparkle / star accents ── */}
        <g className="animate-pulse" style={{ animationDuration: "2s" }}>
          <path
            d="M245,50 L248,44 L251,50 L248,56 Z"
            className="fill-primary/60"
          />
          <path d="M65,55 L67,51 L69,55 L67,59 Z" className="fill-primary/35" />
          <path
            d="M260,95 L262,91 L264,95 L262,99 Z"
            className="fill-primary/50"
          />
        </g>
      </svg>
    </div>
  );
}
