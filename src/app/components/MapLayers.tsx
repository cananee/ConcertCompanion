// Realistic SVG map backgrounds for each view mode

export function DefaultMapLayer() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 700" preserveAspectRatio="xMidYMid slice">
      {/* Base background — asphalt tone */}
      <rect width="390" height="700" fill="#1c1c1e" />

      {/* City blocks */}
      <rect x="10" y="80" width="110" height="70" rx="2" fill="#242428" />
      <rect x="130" y="80" width="70" height="70" rx="2" fill="#242428" />
      <rect x="210" y="80" width="90" height="70" rx="2" fill="#242428" />
      <rect x="310" y="80" width="70" height="70" rx="2" fill="#242428" />
      <rect x="10" y="200" width="80" height="90" rx="2" fill="#242428" />
      <rect x="100" y="200" width="100" height="90" rx="2" fill="#242428" />
      <rect x="210" y="200" width="60" height="90" rx="2" fill="#242428" />
      <rect x="280" y="200" width="100" height="90" rx="2" fill="#242428" />
      <rect x="10" y="340" width="130" height="80" rx="2" fill="#242428" />
      <rect x="150" y="340" width="90" height="80" rx="2" fill="#242428" />
      <rect x="250" y="340" width="130" height="80" rx="2" fill="#242428" />
      <rect x="10" y="470" width="100" height="100" rx="2" fill="#242428" />
      <rect x="120" y="470" width="80" height="100" rx="2" fill="#242428" />
      <rect x="210" y="470" width="170" height="100" rx="2" fill="#242428" />
      <rect x="10" y="590" width="150" height="100" rx="2" fill="#242428" />
      <rect x="170" y="590" width="110" height="100" rx="2" fill="#242428" />
      <rect x="290" y="590" width="100" height="100" rx="2" fill="#242428" />

      {/* Park / green space */}
      <rect x="200" y="430" width="55" height="35" rx="4" fill="#1a2e12" />
      <rect x="60" y="160" width="60" height="35" rx="4" fill="#1a2e12" />
      <rect x="290" y="460" width="40" height="30" rx="4" fill="#1a2e12" />

      {/* Water body */}
      <path d="M 0 530 Q 80 510 160 540 Q 240 570 320 530 Q 360 510 390 520 L390 560 Q 340 550 260 570 Q 190 590 100 565 Q 40 555 0 570 Z" fill="#0d2035" />

      {/* Major roads — wide */}
      <rect x="0" y="155" width="390" height="10" fill="#2d2d33" />
      <rect x="0" y="300" width="390" height="12" fill="#2d2d33" />
      <rect x="0" y="440" width="390" height="10" fill="#2d2d33" />
      <rect x="0" y="580" width="390" height="10" fill="#2d2d33" />

      {/* Vertical major roads */}
      <rect x="115" y="0" width="10" height="700" fill="#2d2d33" />
      <rect x="205" y="0" width="10" height="700" fill="#2d2d33" />
      <rect x="305" y="0" width="10" height="700" fill="#2d2d33" />

      {/* Minor streets */}
      <rect x="0" y="78" width="390" height="4" fill="#252529" />
      <rect x="0" y="195" width="390" height="4" fill="#252529" />
      <rect x="0" y="335" width="390" height="4" fill="#252529" />
      <rect x="0" y="465" width="390" height="4" fill="#252529" />

      <rect x="60" y="0" width="4" height="700" fill="#252529" />
      <rect x="175" y="0" width="4" height="700" fill="#252529" />
      <rect x="260" y="0" width="4" height="700" fill="#252529" />
      <rect x="350" y="0" width="4" height="700" fill="#252529" />

      {/* Street labels */}
      <text x="120" y="152" fill="#4a4a55" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Margit körút</text>
      <text x="120" y="297" fill="#4a4a55" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Andrássy út</text>
      <text x="120" y="437" fill="#4a4a55" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Váci út</text>
      <text x="113" y="90" fill="#4a4a55" fontSize="7" fontFamily="sans-serif" textAnchor="middle" transform="rotate(-90,113,90)">Nagy Lajos</text>
      <text x="207" y="90" fill="#4a4a55" fontSize="7" fontFamily="sans-serif" textAnchor="middle" transform="rotate(-90,207,90)">Dózsa György</text>

      {/* Roundabout */}
      <circle cx="115" cy="300" r="18" fill="none" stroke="#2d2d33" strokeWidth="8" />
      <circle cx="115" cy="300" r="12" fill="#1c1c1e" />
      <circle cx="205" cy="440" r="14" fill="none" stroke="#2d2d33" strokeWidth="6" />
      <circle cx="205" cy="440" r="9" fill="#1c1c1e" />

      {/* Subtle overlay vignette */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
      </radialGradient>
      <rect width="390" height="700" fill="url(#vignette)" />
    </svg>
  );
}

export function SatelliteMapLayer() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 700" preserveAspectRatio="xMidYMid slice">
      {/* Dark earth base */}
      <rect width="390" height="700" fill="#0f1a0f" />

      {/* Vegetation patches */}
      <ellipse cx="80" cy="130" rx="70" ry="50" fill="#162010" />
      <ellipse cx="310" cy="200" rx="60" ry="80" fill="#162010" />
      <ellipse cx="150" cy="500" rx="80" ry="60" fill="#162010" />
      <ellipse cx="340" cy="550" rx="50" ry="70" fill="#162010" />
      <ellipse cx="50" cy="600" rx="55" ry="60" fill="#162010" />

      {/* Bright vegetation patches */}
      <ellipse cx="80" cy="130" rx="45" ry="30" fill="#1d2e14" />
      <ellipse cx="310" cy="200" rx="35" ry="55" fill="#1d2e14" />
      <ellipse cx="150" cy="500" rx="50" ry="40" fill="#1d2e14" />

      {/* Urban / rooftop gray areas */}
      <rect x="120" y="60" width="80" height="60" rx="3" fill="#1e2020" />
      <rect x="220" y="60" width="100" height="55" rx="3" fill="#1e2020" />
      <rect x="130" y="280" width="120" height="90" rx="3" fill="#1e2020" />
      <rect x="260" y="300" width="100" height="80" rx="3" fill="#1e2020" />
      <rect x="10" y="360" width="110" height="70" rx="3" fill="#1e2020" />
      <rect x="130" y="420" width="80" height="60" rx="3" fill="#1e2020" />
      <rect x="280" y="430" width="100" height="90" rx="3" fill="#1e2020" />
      <rect x="50" y="550" width="100" height="80" rx="3" fill="#1e2020" />
      <rect x="200" y="600" width="130" height="90" rx="3" fill="#1e2020" />

      {/* Building rooftops detail */}
      <rect x="125" y="63" width="35" height="25" rx="1" fill="#252828" />
      <rect x="165" y="63" width="30" height="25" rx="1" fill="#222525" />
      <rect x="225" y="63" width="45" height="22" rx="1" fill="#252828" />
      <rect x="275" y="65" width="40" height="20" rx="1" fill="#222525" />

      {/* River / water */}
      <path d="M 0 400 Q 60 380 130 410 Q 200 440 270 400 Q 330 370 390 390 L390 440 Q 330 420 270 450 Q 195 480 130 455 Q 60 435 0 455 Z" fill="#0a1520" />
      <path d="M 0 408 Q 60 390 130 418 Q 200 448 270 408 Q 330 380 390 398" fill="none" stroke="#0d1c2a" strokeWidth="3" />

      {/* Roads — faint gray on satellite */}
      <rect x="0" y="158" width="390" height="6" fill="#1a1e1a" opacity="0.8" />
      <rect x="0" y="300" width="390" height="8" fill="#1a1e1a" opacity="0.8" />
      <rect x="0" y="470" width="390" height="6" fill="#1a1e1a" opacity="0.8" />
      <rect x="110" y="0" width="7" height="700" fill="#1a1e1a" opacity="0.8" />
      <rect x="205" y="0" width="7" height="700" fill="#1a1e1a" opacity="0.8" />
      <rect x="310" y="0" width="6" height="700" fill="#1a1e1a" opacity="0.8" />

      {/* Noise/texture overlay */}
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" mode="overlay" />
      </filter>
      <rect width="390" height="700" filter="url(#noise)" opacity="0.08" />

      {/* Vignette */}
      <radialGradient id="sat-vignette" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
      </radialGradient>
      <rect width="390" height="700" fill="url(#sat-vignette)" />
    </svg>
  );
}

// Sziget Island (Óbudai-sziget) festival map — elongated island in the Danube
export function FestivalMapLayer() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 700" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="water-grad" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#0c2340" />
          <stop offset="100%" stopColor="#071525" />
        </radialGradient>
        <radialGradient id="fest-vignette2" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.65" />
        </radialGradient>
        <filter id="isle-blur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        {/* Shimmer on water */}
        <linearGradient id="water-shimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0c2340" />
          <stop offset="45%" stopColor="#0f2e50" />
          <stop offset="55%" stopColor="#112d4e" />
          <stop offset="100%" stopColor="#0c2340" />
        </linearGradient>
      </defs>

      {/* ── Danube river base ── */}
      <rect width="390" height="700" fill="url(#water-grad)" />

      {/* Water texture lines */}
      {[80, 140, 200, 260, 320, 390, 450, 510, 570, 620].map((y, i) => (
        <path
          key={i}
          d={`M 0 ${y} Q ${60 + i * 15} ${y - 6} ${130 + i * 8} ${y} Q ${220} ${y + 5} ${280 + i * 4} ${y} Q ${340} ${y - 4} 390 ${y}`}
          stroke="#0f2e50"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
      ))}

      {/* ── Óbudai-sziget island shape ── */}
      {/* Shadow / glow edge */}
      <ellipse cx="195" cy="345" rx="162" ry="298" fill="#1a3a14" filter="url(#isle-blur)" opacity="0.5" />
      {/* Island body */}
      <path
        d="M 195 48 C 250 48 340 90 355 160 C 368 220 362 290 355 360 C 348 430 340 510 320 570 C 300 630 260 660 195 662 C 130 660 90 630 70 570 C 50 510 42 430 35 360 C 28 290 22 220 35 160 C 50 90 140 48 195 48 Z"
        fill="#142e0e"
      />
      {/* Inner grass */}
      <path
        d="M 195 68 C 244 68 326 106 340 170 C 352 226 347 294 340 362 C 333 432 325 506 306 562 C 288 616 252 644 195 646 C 138 644 102 616 84 562 C 65 506 57 432 50 362 C 43 294 38 226 50 170 C 64 106 146 68 195 68 Z"
        fill="#172f0f"
      />
      {/* Lighter grass zones */}
      <ellipse cx="195" cy="170" rx="110" ry="70" fill="#1a3510" opacity="0.7" />
      <ellipse cx="120" cy="380" rx="75" ry="80" fill="#1a3510" opacity="0.6" />
      <ellipse cx="270" cy="390" rx="70" ry="75" fill="#1a3510" opacity="0.6" />
      <ellipse cx="195" cy="570" rx="80" ry="55" fill="#19300f" opacity="0.7" />

      {/* ── Tree clusters ── */}
      {[
        [75, 200], [85, 250], [68, 295],
        [310, 195], [322, 245], [308, 295],
        [100, 480], [80, 520],
        [295, 480], [310, 520],
        [155, 120], [195, 108], [235, 120],
        [140, 600], [195, 615], [250, 600],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="10" fill="#1e4012" opacity="0.8" />
      ))}
      {[
        [78, 202], [88, 252], [71, 297],
        [312, 197], [325, 247], [311, 297],
        [102, 482], [83, 522],
        [297, 482], [312, 522],
        [157, 122], [197, 110], [237, 122],
        [142, 602], [197, 617], [252, 602],
      ].map(([cx, cy], i) => (
        <circle key={`t2-${i}`} cx={cx} cy={cy} r="6" fill="#245014" opacity="0.9" />
      ))}

      {/* ── Internal paths / walkways ── */}
      {/* Main spine path */}
      <path d="M 195 155 L 195 620" stroke="#1e2e14" strokeWidth="14" strokeLinecap="round" opacity="0.9" />
      {/* Cross path top */}
      <path d="M 115 300 Q 155 295 195 300 Q 235 305 278 300" stroke="#1e2e14" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
      {/* Cross path bottom */}
      <path d="M 115 460 Q 155 455 195 460 Q 235 465 278 460" stroke="#1e2e14" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
      {/* Branch to Main Stage */}
      <path d="M 195 155 Q 195 140 195 125" stroke="#1e2e14" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
      {/* Branch to Heineken left */}
      <path d="M 115 300 Q 98 340 96 378" stroke="#1e2e14" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
      {/* Branch to Volt right */}
      <path d="M 278 300 Q 292 340 284 378" stroke="#1e2e14" strokeWidth="9" strokeLinecap="round" opacity="0.9" />

      {/* ── Perimeter fence ── */}
      <path
        d="M 195 55 C 246 55 332 96 347 162 C 360 220 354 290 347 360 C 340 432 332 508 313 566 C 294 622 256 651 195 653 C 134 651 96 622 77 566 C 58 508 50 432 43 360 C 36 290 30 220 43 162 C 58 96 144 55 195 55 Z"
        fill="none"
        stroke="#2d4a20"
        strokeWidth="2.5"
        strokeDasharray="10 5"
        opacity="0.7"
      />

      {/* ── MAIN STAGE (top center, y≈22% → y≈154) ── */}
      <rect x="148" y="80" width="94" height="72" rx="6" fill="#3b1f7a" />
      <rect x="152" y="84" width="86" height="64" rx="4" fill="#4c1d95" />
      {/* Stage arch detail */}
      <path d="M 158 130 Q 195 108 232 130" fill="none" stroke="#7c3aed" strokeWidth="3" />
      <rect x="180" y="108" width="30" height="20" rx="2" fill="#6d28d9" />
      <text x="195" y="120" fill="#c4b5fd" fontSize="7" fontFamily="sans-serif" textAnchor="middle">STAGE</text>
      <text x="195" y="138" fill="white" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">MAIN STAGE</text>
      <text x="195" y="150" fill="#a78bfa" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">Cap. 70,000</text>

      {/* ── HEINEKEN MUSIC HALL (left, y≈54% → y≈378) ── */}
      <rect x="46" y="354" width="100" height="72" rx="6" fill="#14532d" />
      <rect x="50" y="358" width="92" height="64" rx="4" fill="#166534" />
      {/* Tent roof line */}
      <path d="M 54 382 L 96 364 L 138 382" fill="none" stroke="#16a34a" strokeWidth="2.5" />
      <rect x="80" y="364" width="32" height="14" rx="2" fill="#15803d" />
      <text x="96" y="374" fill="#86efac" fontSize="6" fontFamily="sans-serif" textAnchor="middle">MUSIC HALL</text>
      <text x="96" y="396" fill="white" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">HEINEKEN</text>
      <text x="96" y="410" fill="#86efac" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">MUSIC HALL</text>
      <text x="96" y="420" fill="#4ade80" fontSize="6" fontFamily="sans-serif" textAnchor="middle">Cap. 10,000</text>

      {/* ── VOLT STAGE (right, y≈54% → y≈378) ── */}
      <rect x="244" y="354" width="100" height="72" rx="6" fill="#78350f" />
      <rect x="248" y="358" width="92" height="64" rx="4" fill="#92400e" />
      {/* Lightning bolt detail */}
      <path d="M 288 368 L 300 384 L 292 384 L 304 400" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="294" y="416" fill="white" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">VOLT STAGE</text>
      <text x="294" y="426" fill="#fbbf24" fontSize="6" fontFamily="sans-serif" textAnchor="middle">Cap. 12,000</text>

      {/* ── Supporting zones ── */}
      {/* A38 boat stage hint near bottom of island */}
      <ellipse cx="195" cy="590" rx="55" ry="22" fill="#0e2a1e" stroke="#1a4a30" strokeWidth="1.5" />
      <text x="195" y="593" fill="#34d399" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">A38 Stage</text>

      {/* Food & market zone */}
      <rect x="155" y="475" width="80" height="28" rx="5" fill="#1c1f0e" stroke="#3a4020" strokeWidth="1.5" opacity="0.85" />
      <text x="195" y="492" fill="#84cc16" fontSize="7" fontFamily="sans-serif" textAnchor="middle">🍕 Food Village</text>

      {/* ── Entry / North bridge ── */}
      <rect x="178" y="38" width="34" height="18" rx="3" fill="#0e2035" stroke="#84cc16" strokeWidth="1.5" />
      <text x="195" y="51" fill="#84cc16" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">ENTRY</text>

      {/* Bridge across river to island — north */}
      <rect x="186" y="20" width="18" height="22" rx="1" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="1" />
      {/* Bridge across river to island — south */}
      <rect x="186" y="652" width="18" height="22" rx="1" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="1" />

      {/* ── Sziget wordmark watermark ── */}
      <text x="195" y="340" fill="#ffffff" fontSize="28" fontFamily="sans-serif" textAnchor="middle" fontWeight="900" opacity="0.04" letterSpacing="3">SZIGET</text>

      {/* ── Vignette ── */}
      <rect width="390" height="700" fill="url(#fest-vignette2)" />
    </svg>
  );
}

export function CompassMapLayer() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 700" preserveAspectRatio="xMidYMid slice">
      {/* Same street base as default but tilted slightly — heading north */}
      <rect width="390" height="700" fill="#1c1c1e" />

      {/* Rotated street grid to give compass feel */}
      <g transform="rotate(-15, 195, 350)">
        <rect x="-50" y="155" width="500" height="10" fill="#2d2d33" />
        <rect x="-50" y="300" width="500" height="12" fill="#2d2d33" />
        <rect x="-50" y="445" width="500" height="10" fill="#2d2d33" />
        <rect x="-50" y="590" width="500" height="10" fill="#2d2d33" />
        <rect x="115" y="-50" width="10" height="800" fill="#2d2d33" />
        <rect x="205" y="-50" width="10" height="800" fill="#2d2d33" />
        <rect x="305" y="-50" width="10" height="800" fill="#2d2d33" />

        {/* Blocks */}
        <rect x="10" y="80" width="100" height="70" rx="2" fill="#242428" />
        <rect x="130" y="80" width="70" height="70" rx="2" fill="#242428" />
        <rect x="220" y="80" width="80" height="70" rx="2" fill="#242428" />
        <rect x="10" y="200" width="100" height="90" rx="2" fill="#242428" />
        <rect x="220" y="200" width="80" height="90" rx="2" fill="#242428" />
        <rect x="10" y="340" width="100" height="80" rx="2" fill="#242428" />
        <rect x="220" y="340" width="80" height="80" rx="2" fill="#242428" />

        {/* Park */}
        <rect x="50" y="160" width="60" height="35" rx="4" fill="#1a2e12" />
      </g>

      {/* Compass heading cone — user's forward direction */}
      <defs>
        <radialGradient id="cone-grad" cx="50%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M 195 350 L 115 60 L 275 60 Z" fill="url(#cone-grad)" />

      {/* North label */}
      <text x="195" y="50" fill="#84cc16" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">N</text>

      {/* Compass rose — small, top-right */}
      <g transform="translate(340, 120)">
        <circle cx="0" cy="0" r="28" fill="#1a1a1e" stroke="#3a3a44" strokeWidth="1.5" />
        <polygon points="0,-22 5,-8 0,-12 -5,-8" fill="#e74c3c" />
        <polygon points="0,22 5,8 0,12 -5,8" fill="#666" />
        <polygon points="-22,0 -8,5 -12,0 -8,-5" fill="#aaa" />
        <polygon points="22,0 8,5 12,0 8,-5" fill="#aaa" />
        <text x="0" y="-15" fill="#e74c3c" fontSize="8" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">N</text>
        <text x="0" y="21" fill="#888" fontSize="7" textAnchor="middle" fontFamily="sans-serif">S</text>
        <text x="-15" y="3" fill="#888" fontSize="7" textAnchor="middle" fontFamily="sans-serif">W</text>
        <text x="15" y="3" fill="#888" fontSize="7" textAnchor="middle" fontFamily="sans-serif">E</text>
        <circle cx="0" cy="0" r="3" fill="#84cc16" />
      </g>

      {/* Vignette */}
      <radialGradient id="comp-vignette" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
      </radialGradient>
      <rect width="390" height="700" fill="url(#comp-vignette)" />
    </svg>
  );
}
