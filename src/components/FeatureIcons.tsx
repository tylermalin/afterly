// Custom geometric feature icons — stroke-based, teal-accented

interface IconProps {
  className?: string;
  size?: number;
}

// ── Quantum Vault ─────────────────────────────────────────────────────────────
// Hexagonal vault door with inner crystalline facets + quantum orbit ring
export function QuantumVaultIcon({ className = "", size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      {/* Outer hex */}
      <polygon
        points="18,2 31,9.5 31,26.5 18,34 5,26.5 5,9.5"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
      {/* Inner hex */}
      <polygon
        points="18,8 26,12.5 26,23.5 18,28 10,23.5 10,12.5"
        stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" strokeOpacity="0.5"
      />
      {/* Facet diagonals */}
      <line x1="18" y1="2"  x2="18" y2="8"  stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4"/>
      <line x1="31" y1="9.5"  x2="26" y2="12.5" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4"/>
      <line x1="31" y1="26.5" x2="26" y2="23.5" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4"/>
      <line x1="18" y1="34" x2="18" y2="28" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4"/>
      <line x1="5"  y1="26.5" x2="10" y2="23.5" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4"/>
      <line x1="5"  y1="9.5"  x2="10" y2="12.5" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4"/>
      {/* Centre lock keyhole */}
      <circle cx="18" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="16.5" y="17.5" width="3" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

// ── Messages for the Future ───────────────────────────────────────────────────
// Clock merged with signal-wave / envelope — time + voice
export function MessagesFutureIcon({ className = "", size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      {/* Circle clock body */}
      <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.4"/>
      {/* Clock hands */}
      <line x1="18" y1="18" x2="18" y2="9"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="18" y1="18" x2="24" y2="21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      {/* Tick marks */}
      <line x1="18" y1="5"  x2="18" y2="7"  stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
      <line x1="18" y1="29" x2="18" y2="31" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
      <line x1="5"  y1="18" x2="7"  y2="18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
      <line x1="29" y1="18" x2="31" y2="18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
      {/* Sound/signal waves outside the circle bottom-right */}
      <path d="M 26 26 Q 28 24 26 22" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.7"/>
      <path d="M 28.5 28.5 Q 32 25 28.5 21.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.4"/>
      {/* Centre dot */}
      <circle cx="18" cy="18" r="1.2" fill="currentColor"/>
    </svg>
  );
}

// ── Crisis-Proof Binder ───────────────────────────────────────────────────────
// Stacked page stack with a bold angular bolt / shield notch
export function CrisisBinderIcon({ className = "", size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      {/* Back page shadow */}
      <rect x="9" y="6" width="20" height="25" rx="2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 2"/>
      {/* Middle page */}
      <rect x="7" y="5" width="20" height="25" rx="2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
      {/* Front page */}
      <rect x="5" y="4" width="20" height="25" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      {/* Document lines */}
      <line x1="9"  y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.5"/>
      <line x1="9"  y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.5"/>
      <line x1="9"  y1="17" x2="16" y2="17" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.5"/>
      {/* Bold lightning bolt (crisis marker) */}
      <polyline
        points="18,20 21,24 19,24 22,29"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Digital Asset Will ────────────────────────────────────────────────────────
// Scroll/document with blockchain node chain running through it
export function DigitalWillIcon({ className = "", size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      {/* Document */}
      <path
        d="M8 6 H24 L28 10 V32 H8 V6 Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
      {/* Folded corner */}
      <polyline points="24,6 24,10 28,10" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" strokeOpacity="0.6"/>
      {/* Blockchain nodes — 3 circles connected by lines */}
      <circle cx="13" cy="17" r="2"   stroke="currentColor" strokeWidth="1.1"/>
      <circle cx="20" cy="21" r="2"   stroke="currentColor" strokeWidth="1.1"/>
      <circle cx="13" cy="25" r="2"   stroke="currentColor" strokeWidth="1.1"/>
      {/* Connecting lines */}
      <line x1="15" y1="17" x2="18" y2="21" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6"/>
      <line x1="18" y1="21" x2="15" y2="25" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6"/>
      {/* Heading line */}
      <line x1="12" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
    </svg>
  );
}

// ── LegacyScore™ ─────────────────────────────────────────────────────────────
// Gauge arc with segmented tick marks and a needle — readiness dial
export function LegacyScoreIcon({ className = "", size = 36 }: IconProps) {
  // Arc: 210° sweep from bottom-left to bottom-right (open at bottom)
  // Center: 18,20  r:13  start:-210° end:30° (in SVG coords)
  const cx = 18, cy = 20, r = 13;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const arcPt = (deg: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  });
  const start = arcPt(210); // bottom-left
  const end   = arcPt(330); // ~bottom-right  — 120° open arc at bottom

  // Needle at ~75% of the arc → roughly 210 + 0.75*300 = 435° → 435-360=75° → but our arc is 210→(210-300)=-90=270°
  // Arc goes clockwise from 210° to -90° (= 270°), spanning 300°
  // 75% → 210 - 0.75*300 = 210 - 225 = -15° = 345°
  const needle = arcPt(-15);

  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      {/* Background arc (track) */}
      <path
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`}
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.2"
      />
      {/* Filled arc ~75% */}
      <path
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${needle.x} ${needle.y}`}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"
      />
      {/* Tick marks — 6 evenly spaced */}
      {[0,1,2,3,4,5].map(i => {
        const deg = 210 - i * 60;
        const inner = { x: cx + (r-3) * Math.cos(toRad(deg)), y: cy + (r-3) * Math.sin(toRad(deg)) };
        const outer = { x: cx + (r)   * Math.cos(toRad(deg)), y: cy + (r)   * Math.sin(toRad(deg)) };
        return <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
          stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>;
      })}
      {/* Needle */}
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y}
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      {/* Pivot */}
      <circle cx={cx} cy={cy} r="1.8" fill="currentColor"/>
      {/* Score label */}
      <text x={cx} y={cy + 10} textAnchor="middle"
        fontSize="5.5" fontFamily="monospace" fill="currentColor" opacity="0.7">
        SCORE
      </text>
    </svg>
  );
}
// ── Quantum-Resistant Encryption ──────────────────────────────────────────
// Atom-like structure with hexagonal nucleus and orbital paths
export function QuantumEncryptionIcon({ className = "", size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="18" cy="18" rx="14" ry="5" transform="rotate(45 18 18)" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <ellipse cx="18" cy="18" rx="14" ry="5" transform="rotate(-45 18 18)" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <ellipse cx="18" cy="18" rx="14" ry="5" transform="rotate(90 18 18)" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
      <path d="M12 12L14 14M22 22L24 24M12 24L14 22M22 14L24 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ── Zero Trust Architecture ──────────────────────────────────────────────────
// Shield with an inner geometric lock and authentication rings
export function ZeroTrustIcon({ className = "", size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      <path d="M18 4L30 9V18C30 25 25 30 18 32C11 30 6 25 6 18V9L18 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 15V13M18 23V21M15 18H13M23 18H21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.5" />
    </svg>
  );
}

// ── Global Compliance ───────────────────────────────────────────────────────
// Grid-based globe with document checkmark overlay
export function GlobalComplianceIcon({ className = "", size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 18H32M18 4V32" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <ellipse cx="18" cy="18" rx="6" ry="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M22 10L26 14L32 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="20" y="6" width="14" height="12" rx="2" fill="#04080f" fillOpacity="0.8" />
      <path d="M22 12L25 15L31 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
