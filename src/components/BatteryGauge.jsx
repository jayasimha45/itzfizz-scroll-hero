/**
 * Charge gauge, pinned to the bottom-left of the stage. Purely presentational —
 * the fill and the percentage are driven imperatively by the hero's scrubbed
 * timeline, so the numbers stay in lockstep with the car's position.
 */
export default function BatteryGauge() {
  return (
    <div className="charge-gauge">
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="7" width="16" height="10" rx="2.5" />
        <path d="M21 10.5v3" />
        {/* lightning bolt inside the cell */}
        <path d="M11.4 8.6 8 12.4h2.4L9.6 15.6 13 11.8h-2.4z" strokeWidth="1.4" />
      </svg>

      <span>Charge</span>

      <div className="charge-gauge-shell">
        <div className="charge-gauge-fill" />
      </div>

      <span className="charge-gauge-value">100%</span>
    </div>
  );
}
