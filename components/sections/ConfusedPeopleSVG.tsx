/* ─────────────────────────────────────────────────────────────
   Hero SVG — Big phone with eSIM comparison + two animated humans
   • No background (transparent, blends with page)
   • All colours use var(--primary) and var(--secondary) CSS vars
   • Animations use SVG <animateTransform> (no CSS conflict)
───────────────────────────────────────────────────────────── */
export default function ConfusedPeopleSVG() {
  /* shorthand so JSX stays readable */
  const P = "var(--primary)";
  const P2 = "var(--primary-foreground)";
  const S = "var(--secondary)";

  return (
    <svg
      viewBox="0 0 520 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Two people comparing eSIM plans on a large phone"
    >
      {/* Define gradients for depth and realism */}
      <defs>
        <linearGradient id="skinGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FCC9A3", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#F5B89B", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="skinGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#F5D4B0", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#E8C5A8", stopOpacity: 1 }}
          />
        </linearGradient>
        <radialGradient id="skinShadow1" cx="30%" cy="30%">
          <stop
            offset="0%"
            style={{ stopColor: "#FFFFFF", stopOpacity: 0.3 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#A0643D", stopOpacity: 0.1 }}
          />
        </radialGradient>
        <radialGradient id="hairShadow1" cx="40%" cy="40%">
          <stop
            offset="0%"
            style={{ stopColor: "#B8540F", stopOpacity: 0.4 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#5F2C0C", stopOpacity: 0.8 }}
          />
        </radialGradient>
      </defs>
      {/* ══════════════════════════════════════
          WOMAN — left side, leaning toward phone
      ══════════════════════════════════════ */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-7; 0,0"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />

        {/* ── Legs ── */}
        <defs>
          <linearGradient id="legGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#B0C4DE", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#9FBAD9", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <rect
          x="48"
          y="460"
          width="13"
          height="55"
          rx="6"
          fill="url(#legGrad)"
        />
        <rect
          x="68"
          y="460"
          width="13"
          height="55"
          rx="6"
          fill="url(#legGrad)"
        />
        {/* Shoes */}
        <ellipse cx="54" cy="517" rx="14" ry="7" fill="#1A1F2E" />
        <ellipse cx="74" cy="517" rx="14" ry="7" fill="#1A1F2E" />
        <ellipse cx="54" cy="516" rx="12" ry="5" fill="#2D3748" />

        {/* ── Body ── */}
        <rect
          x="38"
          y="400"
          width="48"
          height="65"
          rx="14"
          style={{ fill: P }}
        />
        {/* collar */}
        <path
          d="M52,400 Q62,410 72,400"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Left arm (holding mini phone) ── */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 44 415; -12 44 415; 0 44 415"
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.3s"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          />
          <path
            d="M44,415 C22,425 18,448 22,462"
            stroke="#FBBF7A"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="22" cy="464" r="7" fill="#FBBF7A" />
          {/* Mini phone in hand */}
          <rect x="8" y="440" width="16" height="26" rx="4" fill="#334155" />
          <rect
            x="10"
            y="443"
            width="12"
            height="20"
            rx="3"
            style={{ fill: S, opacity: 0.3 }}
          >
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
          <text
            x="16"
            y="457"
            textAnchor="middle"
            fontFamily="system-ui,sans-serif"
            fontSize="10"
            fontWeight="800"
            fill="white"
          >
            ?
          </text>
        </g>

        {/* ── Right arm (gesturing toward big phone) ── */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 80 415; 10 80 415; 0 80 415"
            dur="3.2s"
            repeatCount="indefinite"
            begin="0.8s"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          />
          <path
            d="M80,415 C105,410 120,395 130,380"
            stroke="#FBBF7A"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="132" cy="377" r="7" fill="#FBBF7A" />
        </g>

        {/* ── Neck ── */}
        <rect x="54" y="382" width="16" height="22" rx="7" fill="#FBBF7A" />

        {/* ── Head ── */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 62 360; 8 62 360; 8 62 360; 0 62 360"
            keyTimes="0;0.4;0.6;1"
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.3s"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0 0 1 1;0.4 0 0.6 1"
          />
          {/* Hair base with gradient */}
          <ellipse cx="62" cy="340" rx="28" ry="16" fill="url(#hairShadow1)" />
          <ellipse cx="62" cy="340" rx="26" ry="15" fill="#9D4E0B" />
          <ellipse cx="40" cy="354" rx="10" ry="24" fill="#7A3D08" />
          <ellipse cx="84" cy="353" rx="9" ry="22" fill="#7A3D08" />
          {/* Hair highlight */}
          <ellipse
            cx="68"
            cy="336"
            rx="8"
            ry="6"
            fill="#B8540F"
            opacity="0.6"
          />

          {/* Face with gradient */}
          <circle cx="62" cy="358" r="26" fill="url(#skinGradient1)" />
          <circle cx="62" cy="358" r="26" fill="url(#skinShadow1)" />

          {/* Nose definition */}
          <ellipse
            cx="62"
            cy="362"
            rx="3"
            ry="5"
            fill="#E8A89C"
            opacity="0.6"
          />

          {/* Eyes - confused/uncertain expression */}
          <ellipse cx="52" cy="352" rx="5.5" ry="6.5" fill="white">
            <animate
              attributeName="ry"
              values="6.5;6.5;0.5;6.5;6.5"
              keyTimes="0;0.85;0.92;0.97;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </ellipse>
          {/* Eye iris looking down and uncertain */}
          <circle cx="50" cy="354" r="3.5" fill="#6B4423" />
          <circle cx="50" cy="355" r="2" fill="#1E293B" />
          <circle cx="50.5" cy="353" r="0.9" fill="white" />

          <ellipse cx="72" cy="352" rx="5.5" ry="6.5" fill="white">
            <animate
              attributeName="ry"
              values="6.5;6.5;0.5;6.5;6.5"
              keyTimes="0;0.85;0.92;0.97;1"
              dur="4s"
              repeatCount="indefinite"
              begin="0.05s"
            />
          </ellipse>
          <circle cx="70" cy="354" r="3.5" fill="#6B4423" />
          <circle cx="70" cy="355" r="2" fill="#1E293B" />
          <circle cx="70.5" cy="353" r="0.9" fill="white" />

          {/* Confused eyebrows - raised and angled inward */}
          <path
            d="M44,341 Q50,337 56,343"
            stroke="#6B4423"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M68,341 Q74,337 80,343"
            stroke="#6B4423"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Confused mouth - open slightly with uncertain expression */}
          <path
            d="M54,370 Q62,373 70,370"
            stroke="#C2855A"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M58,371 Q62,374 66,371"
            stroke="#D89876"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        </g>
      </g>

      {/* ══════════════════════════════════════
          MAN — right side
      ══════════════════════════════════════ */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-6; 0,0"
          dur="4.4s"
          repeatCount="indefinite"
          begin="0.8s"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />

        {/* Legs */}
        <defs>
          <linearGradient id="legGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#A8B8D8", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#96A8CC", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <rect
          x="398"
          y="460"
          width="13"
          height="55"
          rx="6"
          fill="url(#legGrad2)"
        />
        <rect
          x="418"
          y="460"
          width="13"
          height="55"
          rx="6"
          fill="url(#legGrad2)"
        />
        <ellipse cx="404" cy="517" rx="14" ry="7" fill="#1A1F2E" />
        <ellipse cx="424" cy="517" rx="14" ry="7" fill="#1A1F2E" />
        <ellipse cx="404" cy="516" rx="12" ry="5" fill="#2D3748" />

        {/* Body */}
        <rect
          x="388"
          y="400"
          width="48"
          height="65"
          rx="14"
          style={{ fill: P }}
          opacity="0.85"
        />
        <path
          d="M402,400 Q412,410 422,400"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left arm (pointing at phone) */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 394 415; -10 394 415; 0 394 415"
            dur="3.6s"
            repeatCount="indefinite"
            begin="0.6s"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          />
          <path
            d="M394,415 C368,408 352,393 342,378"
            stroke="#F5C5A3"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="340" cy="375" r="7" fill="#F5C5A3" />
        </g>

        {/* Right arm (scratching head) */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 430 415; 8 430 415; 0 430 415"
            dur="3.3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          />
          <path
            d="M430,415 C455,410 468,380 445,348"
            stroke="#F5C5A3"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="444" cy="345" r="7" fill="#F5C5A3" />
        </g>

        {/* Neck */}
        <rect x="404" y="382" width="16" height="22" rx="7" fill="#F5C5A3" />

        {/* Head */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 412 360; -8 412 360; -8 412 360; 0 412 360"
            keyTimes="0;0.4;0.6;1"
            dur="3.8s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0 0 1 1;0.4 0 0.6 1"
          />
          {/* Hair with gradient */}
          <ellipse cx="412" cy="340" rx="26" ry="14" fill="url(#hairShadow1)" />
          <ellipse cx="412" cy="340" rx="24" ry="13" fill="#7D3F08" />
          <ellipse cx="392" cy="349" rx="10" ry="18" fill="#5F2C0C" />
          <ellipse cx="432" cy="349" rx="10" ry="18" fill="#5F2C0C" />
          {/* Hair highlight */}
          <ellipse
            cx="420"
            cy="336"
            rx="7"
            ry="5"
            fill="#A0540F"
            opacity="0.5"
          />

          {/* Face with gradient */}
          <circle cx="412" cy="358" r="26" fill="url(#skinGradient2)" />
          <circle cx="412" cy="358" r="26" fill="url(#skinShadow1)" />

          {/* Nose definition */}
          <ellipse
            cx="412"
            cy="362"
            rx="3.5"
            ry="5.5"
            fill="#D99B88"
            opacity="0.5"
          />

          {/* Eyes - very confused and uncertain */}
          <ellipse cx="402" cy="350" rx="6" ry="7" fill="white">
            <animate
              attributeName="ry"
              values="7;7;0.5;7;7"
              keyTimes="0;0.80;0.88;0.94;1"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </ellipse>
          {/* Eye iris - looking up confused */}
          <circle cx="401" cy="348" r="3.8" fill="#5B3A2B" />
          <circle cx="401" cy="348" r="2.2" fill="#1E293B" />
          <circle cx="401.6" cy="347" r="1" fill="white" />

          <ellipse cx="422" cy="350" rx="6" ry="7" fill="white">
            <animate
              attributeName="ry"
              values="7;7;0.5;7;7"
              keyTimes="0;0.80;0.88;0.94;1"
              dur="4.5s"
              repeatCount="indefinite"
              begin="0.05s"
            />
          </ellipse>
          <circle cx="423" cy="348" r="3.8" fill="#5B3A2B" />
          <circle cx="423" cy="348" r="2.2" fill="#1E293B" />
          <circle cx="423.6" cy="347" r="1" fill="white" />

          {/* Confused/skeptical eyebrows - inner raised, outer lower */}
          <path
            d="M394,339 Q402,334 410,342"
            stroke="#5B3A2B"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M414,342 Q422,334 430,339"
            stroke="#5B3A2B"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Confused/uncertain mouth - tilted, slightly open */}
          <path
            d="M406,369 Q412,366 418,369"
            stroke="#C8947A"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lower lip line */}
          <path
            d="M406,372 Q412,375 418,372"
            stroke="#D9A594"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>
      </g>

      {/* ══════════════════════════════════════
          BIG PHONE — centre, dominant element
      ══════════════════════════════════════ */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-8; 0,0"
          dur="5s"
          repeatCount="indefinite"
          begin="0.4s"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />

        {/* Phone outer frame */}
        <rect
          x="160"
          y="36"
          width="200"
          height="390"
          rx="28"
          style={{ fill: P }}
        />

        {/* Screen */}
        <rect x="170" y="50" width="180" height="362" rx="20" fill="white" />

        {/* Notch */}
        <rect
          x="230"
          y="50"
          width="60"
          height="16"
          rx="8"
          style={{ fill: P }}
        />
        <circle cx="270" cy="58" r="4" style={{ fill: P }} opacity="0.7" />

        {/* Status bar */}
        <text
          x="182"
          y="76"
          fontFamily="system-ui,sans-serif"
          fontSize="8"
          fill="#64748B"
        >
          9:41
        </text>
        <rect
          x="326"
          y="66"
          width="16"
          height="8"
          rx="2"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="0.8"
        />
        <rect x="327" y="67" width="11" height="6" rx="1.5" fill="#22C55E" />

        {/* ── App header ── */}
        <rect
          x="170"
          y="82"
          width="180"
          height="40"
          rx="0"
          style={{ fill: P }}
        />
        <text
          x="260"
          y="107"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="16"
          fontWeight="800"
          fill="white"
        >
          esim
          <tspan style={{ fill: S }} opacity="0.6">
            zo
          </tspan>
        </text>

        {/* ── Search bar ── */}
        <rect
          x="182"
          y="132"
          width="156"
          height="24"
          rx="12"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <circle
          cx="196"
          cy="144"
          r="4.5"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1.2"
        />
        <line
          x1="199"
          y1="147"
          x2="202"
          y2="150"
          stroke="#94A3B8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <text
          x="210"
          y="148"
          fontFamily="system-ui,sans-serif"
          fontSize="8"
          fill="#94A3B8"
        >
          Search country…
        </text>

        {/* ── Filter chips ── */}
        <rect
          x="182"
          y="164"
          width="40"
          height="15"
          rx="7.5"
          style={{ fill: S, opacity: 0.15 }}
        />
        <text
          x="202"
          y="175"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fontWeight="600"
          style={{ fill: P }}
        >
          1 GB
        </text>
        <rect
          x="226"
          y="164"
          width="50"
          height="15"
          rx="7.5"
          style={{ fill: S, opacity: 0.15 }}
        />
        <text
          x="251"
          y="175"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fontWeight="600"
          style={{ fill: P }}
        >
          30 days
        </text>
        <rect
          x="280"
          y="164"
          width="38"
          height="15"
          rx="7.5"
          style={{ fill: S, opacity: 0.15 }}
        />
        <text
          x="299"
          y="175"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fontWeight="600"
          style={{ fill: P }}
        >
          Sort ↓
        </text>

        {/* ══ PLAN ROW 1 — Best Deal (animated highlight) ══ */}
        <rect
          x="182"
          y="188"
          width="156"
          height="52"
          rx="12"
          style={{ fill: S, opacity: 0.1 }}
        >
          <animate
            attributeName="opacity"
            values="0.1;0.2;0.1"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="182"
          y="188"
          width="156"
          height="52"
          rx="12"
          fill="none"
          style={{ stroke: P }}
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* Provider icon */}
        <circle
          cx="200"
          cy="214"
          r="12"
          style={{ fill: P }}
          fillOpacity="0.12"
        />
        <text
          x="200"
          y="218"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="10"
          fontWeight="700"
          style={{ fill: P }}
        >
          A
        </text>
        {/* Provider text */}
        <text
          x="218"
          y="209"
          fontFamily="system-ui,sans-serif"
          fontSize="9"
          fontWeight="600"
          fill="#1E293B"
        >
          Airalo
        </text>
        <text
          x="218"
          y="222"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fill="#64748B"
        >
          1 GB · 30 days
        </text>
        {/* Price */}
        <text
          x="335"
          y="210"
          textAnchor="end"
          fontFamily="system-ui,sans-serif"
          fontSize="14"
          fontWeight="800"
          style={{ fill: P }}
        >
          $2.50
        </text>
        <text
          x="335"
          y="224"
          textAnchor="end"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fill="#94A3B8"
        >
          per GB
        </text>

        {/* ══ PLAN ROW 2 ══ */}
        <rect
          x="182"
          y="248"
          width="156"
          height="48"
          rx="12"
          fill="white"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="272"
          r="12"
          style={{ fill: S }}
          fillOpacity="0.15"
        />
        <text
          x="200"
          y="276"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="10"
          fontWeight="700"
          style={{ fill: P }}
          opacity="0.7"
        >
          H
        </text>
        <text
          x="218"
          y="267"
          fontFamily="system-ui,sans-serif"
          fontSize="9"
          fontWeight="600"
          fill="#1E293B"
        >
          Holafly
        </text>
        <text
          x="218"
          y="280"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fill="#64748B"
        >
          Unlimited · 15 days
        </text>
        <text
          x="335"
          y="268"
          textAnchor="end"
          fontFamily="system-ui,sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#1E293B"
        >
          $19
        </text>
        <text
          x="335"
          y="282"
          textAnchor="end"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fill="#94A3B8"
        >
          flat
        </text>

        {/* ══ PLAN ROW 3 ══ */}
        <rect
          x="182"
          y="304"
          width="156"
          height="48"
          rx="12"
          fill="white"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <circle cx="200" cy="328" r="12" fill="#F59E0B" fillOpacity="0.12" />
        <text
          x="200"
          y="332"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#F59E0B"
        >
          E
        </text>
        <text
          x="218"
          y="323"
          fontFamily="system-ui,sans-serif"
          fontSize="9"
          fontWeight="600"
          fill="#1E293B"
        >
          Esim2go
        </text>
        <text
          x="218"
          y="336"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fill="#64748B"
        >
          2 GB · 7 days
        </text>
        <text
          x="335"
          y="324"
          textAnchor="end"
          fontFamily="system-ui,sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#1E293B"
        >
          $4.00
        </text>
        <text
          x="335"
          y="338"
          textAnchor="end"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fill="#94A3B8"
        >
          per GB
        </text>

        {/* ── CTA Button ── */}
        <rect
          x="182"
          y="360"
          width="156"
          height="26"
          rx="13"
          style={{ fill: P }}
        />
        <text
          x="260"
          y="377"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="white"
        >
          Get Best Deal →
        </text>

        {/* Scan line (CSS animation is safe here — no SVG transform on this element) */}
        <rect
          x="170"
          y="82"
          width="180"
          height="3"
          rx="1.5"
          fill="white"
          opacity="0"
        >
          <animate
            attributeName="y"
            values="82;400;82"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;0;0.4"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Home bar */}
        <rect x="240" y="400" width="40" height="4" rx="2" fill="#CBD5E1" />
      </g>

      {/* ══════════════════════════════════════
          FLOATING QUESTION MARKS
      ══════════════════════════════════════ */}
      {/* Woman's ?s */}
      <text
        x="95"
        y="310"
        fontFamily="system-ui,sans-serif"
        fontSize="18"
        fontWeight="800"
        style={{ fill: P }}
        opacity="0.6"
      >
        ?
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-40"
          dur="2.2s"
          repeatCount="indefinite"
          additive="sum"
        />
        <animate
          attributeName="opacity"
          values="0.6;0"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </text>
      <text
        x="110"
        y="295"
        fontFamily="system-ui,sans-serif"
        fontSize="12"
        fontWeight="700"
        style={{ fill: P }}
        opacity="0.4"
      >
        ?
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-36"
          dur="2.4s"
          repeatCount="indefinite"
          begin="0.7s"
          additive="sum"
        />
        <animate
          attributeName="opacity"
          values="0.4;0"
          dur="2.4s"
          repeatCount="indefinite"
          begin="0.7s"
        />
      </text>

      {/* Man's ?s */}
      <text
        x="430"
        y="310"
        fontFamily="system-ui,sans-serif"
        fontSize="18"
        fontWeight="800"
        style={{ fill: P }}
        opacity="0.5"
      >
        ?
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-40"
          dur="2.3s"
          repeatCount="indefinite"
          begin="0.5s"
          additive="sum"
        />
        <animate
          attributeName="opacity"
          values="0.5;0"
          dur="2.3s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </text>
      <text
        x="415"
        y="295"
        fontFamily="system-ui,sans-serif"
        fontSize="12"
        fontWeight="700"
        style={{ fill: P }}
        opacity="0.35"
      >
        ?
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-36"
          dur="2.5s"
          repeatCount="indefinite"
          begin="1.2s"
          additive="sum"
        />
        <animate
          attributeName="opacity"
          values="0.35;0"
          dur="2.5s"
          repeatCount="indefinite"
          begin="1.2s"
        />
      </text>

      {/* ══════════════════════════════════════
          WIFI SIGNAL ARCS  — above the phone
      ══════════════════════════════════════ */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-8; 0,0"
          dur="5s"
          repeatCount="indefinite"
          begin="0.4s"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />
        <path
          d="M248,28 Q260,16 272,28"
          style={{ stroke: P }}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.6;0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M242,20 Q260,4 278,20"
          style={{ stroke: P }}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.4;0"
            dur="2s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </path>
        <path
          d="M236,12 Q260,-8 284,12"
          style={{ stroke: P }}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.25;0"
            dur="2s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </path>
        <circle cx="260" cy="34" r="3" style={{ fill: P }} opacity="0.7" />
      </g>

      {/* ── Decorative dots ── */}
      <circle cx="30" cy="290" r="4" style={{ fill: P }} opacity="0.08" />
      <circle cx="18" cy="320" r="2.5" style={{ fill: P }} opacity="0.06" />
      <circle cx="490" cy="300" r="3.5" style={{ fill: P }} opacity="0.08" />
      <circle cx="502" cy="330" r="2" style={{ fill: P }} opacity="0.05" />
      <circle cx="260" cy="540" r="3" style={{ fill: P }} opacity="0.06" />
    </svg>
  );
}
