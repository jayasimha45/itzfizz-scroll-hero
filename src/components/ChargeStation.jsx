/**
 * The charger the car parks in front of at the end of the drive: a slim bollard
 * standing on the road line, with a bolt on its face and a halo that pulses once
 * the car is plugged in.
 *
 * Sized in `car` units (`--car-w` / `--car-h`) so it stays in proportion with
 * the vehicle at every breakpoint, and anchored to the stage's right edge where
 * the car's nose comes to rest.
 */
export default function ChargeStation() {
  return (
    <div className="charge-station" aria-hidden="true">
      <svg viewBox="0 0 200 240" className="block h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chargerBody" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#4b525c" />
            <stop offset="45%" stopColor="#2b3138" />
            <stop offset="100%" stopColor="#14181d" />
          </linearGradient>
        </defs>

        {/* halo, behind the bollard so it reads as a glow not a disc */}
        <circle className="charge-station-halo" cx="173" cy="68" r="42" fill="none" stroke="#0b0b0c" strokeWidth="1.5" />

        {/* base plate on the road */}
        <rect x="146" y="226" width="54" height="10" rx="5" fill="#d9d9d3" />
        <rect x="150" y="222" width="46" height="6" rx="3" fill="#0b0b0c" fillOpacity="0.08" />

        {/* post */}
        <rect x="163" y="74" width="20" height="150" rx="10" fill="url(#chargerBody)" />
        <rect x="167" y="86" width="3" height="126" rx="1.5" fill="#ffffff" fillOpacity="0.14" />

        {/* head + screen */}
        <rect x="153" y="42" width="40" height="54" rx="17" fill="url(#chargerBody)" />
        <rect x="161" y="53" width="24" height="22" rx="7" fill="#f2f4f7" />
        <path d="M175.4 56.4 169 66h4.2l-2 7.6L180 63.4h-4.4z" fill="#0b0b0c" />
        <rect x="168" y="82" width="10" height="3" rx="1.5" fill="#7fc8a0" />
      </svg>
    </div>
  );
}
