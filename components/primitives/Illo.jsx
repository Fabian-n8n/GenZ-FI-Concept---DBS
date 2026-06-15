// Two-colour DBS illustrations — ink line work (#1a1f24) + DBS red accent.
// Ported directly from Claude Design handoff (illustrations.jsx).
const INK    = '#1a1f24';
const RED    = '#FF0000';
const RED_DK = '#C20000';
const RED_50 = '#FFF1F1';
const RED_100 = '#FFE0E0';

// Person sheltering behind a red shield with a lock (savings protected).
function IlloProtect({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 240" fill="none"
      stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block' }}>
      {/* backdrop */}
      <circle cx="130" cy="116" r="96" fill={RED_50} stroke="none" />
      <ellipse cx="130" cy="214" rx="66" ry="9" fill={RED_100} stroke="none" />
      {/* sparkles */}
      <path d="M40 70l0 12M34 76l12 0" stroke={RED} strokeWidth="2.4" />
      <circle cx="220" cy="92" r="3.4" fill={RED} stroke="none" />
      <circle cx="206" cy="58" r="2.4" fill={RED} stroke="none" />
      {/* legs + feet */}
      <path d="M116 176v28M144 176v28" />
      <path d="M108 204h12M136 204h12" />
      {/* head */}
      <circle cx="130" cy="56" r="20" fill="#fff" />
      <path d="M114 50c3-9 13-13 21-9" stroke={INK} strokeWidth="2.4" />
      {/* shield (red) */}
      <path d="M82 86c0-3 2-5 5-5h86c3 0 5 2 5 5v34c0 38-48 56-48 56s-48-18-48-56z" fill={RED} stroke={INK} />
      {/* lock on shield (white) */}
      <rect x="116" y="116" width="28" height="22" rx="4" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <path d="M122 116v-5a8 8 0 0116 0v5" fill="none" stroke="#fff" strokeWidth="2.6" />
      <path d="M122 116v-5a8 8 0 0116 0v5" fill="none" stroke={INK} strokeWidth="2.2" />
      <circle cx="130" cy="126" r="2.6" fill={RED} stroke="none" />
      <path d="M130 128v4" stroke={RED} strokeWidth="2.2" />
      {/* arms gripping shield rim */}
      <path d="M112 78c-9 1-18 5-24 11M148 78c9 1 18 5 24 11" />
      <circle cx="86" cy="92" r="7" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <circle cx="174" cy="92" r="7" fill="#fff" stroke={INK} strokeWidth="2.2" />
    </svg>
  );
}

// Refreshed allocation chart with sync arrows + green check badge (plan changed).
function IlloUpdated({ size = 200 }) {
  const cx = 130, cy = 112, r = 50, th = 18;
  const circ = 2 * Math.PI * r;
  const segs = [
    { pct: 50, color: '#22C9A3' },
    { pct: 30, color: '#FF7A5C' },
    { pct: 20, color: '#8A8FF0' },
  ];
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox="0 0 260 240" fill="none"
      stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block' }}>
      <circle cx="130" cy="116" r="96" fill={RED_50} stroke="none" />
      <ellipse cx="130" cy="206" rx="60" ry="8" fill={RED_100} stroke="none" />
      {/* donut segments */}
      <g transform="rotate(-90 130 112)">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fff" strokeWidth={th} />
        {segs.map((s, i) => {
          const len = (s.pct / 100) * circ;
          const dash = Math.max(len - th - 10, 0.5);
          const start = acc + 5 + th / 2;
          acc += len;
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={s.color} strokeWidth={th} strokeLinecap="round"
              strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-start} />
          );
        })}
      </g>
      <circle cx={cx} cy={cy} r="24" fill="#fff" stroke={INK} strokeWidth="2.2" />
      {/* sync arrows */}
      <path d="M64 92a52 52 0 0194-18" fill="none" />
      <path d="M150 70l9 6-3 10" fill="none" />
      <path d="M196 132a52 52 0 01-94 18" fill="none" />
      <path d="M110 154l-9-6 3-10" fill="none" />
      {/* check badge */}
      <circle cx="176" cy="156" r="18" fill={RED} stroke={INK} strokeWidth="2.2" />
      <path d="M168 156l5 5 9-10" stroke="#fff" strokeWidth="2.8" />
      <circle cx="64" cy="60" r="3" fill={RED} stroke="none" />
      <path d="M214 88l0 11M208.5 93.5l11 0" stroke={RED} strokeWidth="2.4" />
    </svg>
  );
}

// Open padlock with clock (savings temporarily unlocked).
function IlloUnlock({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 240" fill="none"
      stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block' }}>
      <circle cx="130" cy="116" r="96" fill={RED_50} stroke="none" />
      <ellipse cx="130" cy="208" rx="62" ry="8" fill={RED_100} stroke="none" />
      {/* padlock body (red) */}
      <rect x="92" y="118" width="76" height="60" rx="12" fill={RED} stroke={INK} />
      {/* open shackle — swung to the left */}
      <path d="M104 118v-12a22 22 0 0136-17" fill="none" stroke={INK} strokeWidth="2.8" />
      {/* keyhole */}
      <circle cx="130" cy="142" r="6.5" fill="#fff" stroke="none" />
      <path d="M130 148v12" stroke="#fff" strokeWidth="3.4" />
      {/* clock accent */}
      <circle cx="182" cy="78" r="22" fill="#fff" stroke={INK} strokeWidth="2.4" />
      <path d="M182 66v12l8 5" stroke={INK} strokeWidth="2.4" />
      {/* sparkles */}
      <path d="M62 86l0 12M56 92l12 0" stroke={RED} strokeWidth="2.4" />
      <circle cx="72" cy="150" r="3" fill={RED} stroke="none" />
    </svg>
  );
}

const ILLOS = { protect: IlloProtect, updated: IlloUpdated, unlock: IlloUnlock };

export default function Illo({ name, size = 200 }) {
  const C = ILLOS[name];
  return C ? <C size={size} /> : null;
}
