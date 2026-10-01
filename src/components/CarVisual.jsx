/**
 * Original top-down-agnostic side profile of a modern coupe, drawn as inline
 * SVG (no raster asset, no extra request, no layout shift). The nose points to
 * the right, and each wheel is wrapped in `.wheel` so GSAP can spin it.
 */
export default function CarVisual({ className = "" }) {
  return (
    <div className={`car ${className}`} aria-hidden="true">
      <div className="car-shadow" />

      <div className="car-inner relative z-10">
        <svg
          viewBox="0 0 640 250"
          className="block h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="carBody" x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%" stopColor="#474e58" />
              <stop offset="42%" stopColor="#2b3138" />
              <stop offset="100%" stopColor="#14181d" />
            </linearGradient>

            <linearGradient id="carGlass" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#3a4653" />
              <stop offset="45%" stopColor="#141b23" />
              <stop offset="100%" stopColor="#05080b" />
            </linearGradient>

            <linearGradient id="carGlassSheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="carRim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f2f4f7" />
              <stop offset="55%" stopColor="#c2c8d0" />
              <stop offset="100%" stopColor="#8b939e" />
            </linearGradient>

            <linearGradient id="carHeadlight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#bcd8ff" />
            </linearGradient>
          </defs>

          {/* wheel wells — drawn before the body so the arch reads as an opening */}
          <circle cx="150" cy="204" r="58" fill="#0a0c0f" />
          <circle cx="492" cy="204" r="58" fill="#0a0c0f" />

          {/* body */}
          <path
            d="M30 176C30 150 46 134 76 128L152 120C178 86 220 66 276 62L372 62C426 63 470 80 508 112L592 130C618 135 630 150 630 172C630 192 616 204 594 205L70 205C44 205 30 194 30 176Z"
            fill="url(#carBody)"
          />

          {/* shoulder highlight */}
          <path
            d="M62 130C160 120 260 116 372 116C462 116 542 124 602 138"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.13"
            strokeWidth="2"
          />

          {/* glasshouse */}
          <path
            d="M182 118C206 88 244 70 290 68L368 68C414 69 452 88 486 116L452 118C424 96 388 84 348 84L292 84C248 86 216 98 198 120Z"
            fill="url(#carGlass)"
          />
          <path
            d="M182 118C206 88 244 70 290 68L368 68C414 69 452 88 486 116L452 118C424 96 388 84 348 84L292 84C248 86 216 98 198 120Z"
            fill="url(#carGlassSheen)"
          />
          {/* B-pillar */}
          <rect x="330" y="68" width="9" height="50" rx="3" fill="#232830" />

          {/* arch highlights */}
          <path
            d="M92 204A58 58 0 0 1 208 204"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.08"
            strokeWidth="2"
          />
          <path
            d="M434 204A58 58 0 0 1 550 204"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.08"
            strokeWidth="2"
          />

          {/* rear wheel */}
          <g className="wheel">
            <circle cx="150" cy="204" r="52" fill="#0a0c0f" />
            <circle cx="150" cy="204" r="52" fill="none" stroke="#2a3037" strokeWidth="3" />
            <circle cx="150" cy="204" r="30" fill="url(#carRim)" />
            <g stroke="#aab1ba" strokeWidth="4" strokeLinecap="round">
              <line x1="150" y1="182" x2="150" y2="226" />
              <line x1="131" y1="193" x2="169" y2="215" />
              <line x1="131" y1="215" x2="169" y2="193" />
            </g>
            <circle cx="150" cy="204" r="7" fill="#eef1f4" />
          </g>

          {/* front wheel */}
          <g className="wheel">
            <circle cx="492" cy="204" r="52" fill="#0a0c0f" />
            <circle cx="492" cy="204" r="52" fill="none" stroke="#2a3037" strokeWidth="3" />
            <circle cx="492" cy="204" r="30" fill="url(#carRim)" />
            <g stroke="#aab1ba" strokeWidth="4" strokeLinecap="round">
              <line x1="492" y1="182" x2="492" y2="226" />
              <line x1="473" y1="193" x2="511" y2="215" />
              <line x1="473" y1="215" x2="511" y2="193" />
            </g>
            <circle cx="492" cy="204" r="7" fill="#eef1f4" />
          </g>

          {/* headlight */}
          <path
            d="M588 128C606 126 620 132 628 142C620 148 606 150 592 146Z"
            fill="url(#carHeadlight)"
          />

          {/* taillight */}
          <path d="M30 130C40 128 52 127 60 129L61 141C52 142 40 143 30 145Z" fill="#e0524f" />

          {/* side intake near the nose */}
          <path d="M548 150C562 151 574 155 582 161C572 163 560 162 550 159Z" fill="#0f1317" />

          {/* charge port on the front fender — lights up when plugged in */}
          <g className="car-port">
            <rect x="552" y="128" width="28" height="11" rx="5.5" fill="#0f1317" />
            <rect
              x="552"
              y="128"
              width="28"
              height="11"
              rx="5.5"
              fill="none"
              stroke="#9aa3ad"
              strokeWidth="1.4"
            />
            <path d="M566.6 130.4 562 136.4h3.2l-1.6 5.2L570 134.8h-3.4z" fill="#f2f4f7" />
          </g>

          {/* door line + handle */}
          <path
            d="M344 118C348 150 350 172 348 198"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.07"
            strokeWidth="2"
          />
          <rect x="298" y="128" width="34" height="8" rx="4" fill="#525a64" />
        </svg>
      </div>
    </div>
  );
}
