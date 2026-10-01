import { STATS } from "../data/content";

/**
 * Four impact figures. `dl > div > dt + dd` keeps the semantics correct while
 * the flex column is reversed so the number reads above its label.
 */
export default function Stats({ className = "" }) {
  return (
    <dl
      className={`grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-0 sm:gap-y-7 ${className}`}
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={[
            "stat-item flex flex-col-reverse gap-1.5 px-1 sm:gap-2 sm:px-7",
            i > 0 ? "sm:border-l sm:border-line" : "",
            i >= 2 ? "border-t border-line pt-5 sm:border-t-0 sm:pt-0" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <dt className="text-[0.75rem] leading-snug text-muted sm:text-sm">{stat.label}</dt>
          <dd className="font-display text-[2.6rem] leading-none font-extrabold tracking-tight text-ink tabular-nums sm:text-[clamp(1.9rem,min(3.4vw,5.4svh),3.4rem)]">
            {stat.value}
            <span className="text-ink-2/70">{stat.suffix}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
