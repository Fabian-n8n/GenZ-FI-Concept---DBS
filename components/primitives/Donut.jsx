'use client';

export default function Donut({ segments = [], size = 120, thickness = 16, gap = 3, label, sublabel }) {
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;

  const total = segments.reduce((s, seg) => s + (seg.pct || 0), 0) || 100;
  let offset = 0;

  const arcs = segments.map((seg, i) => {
    const pct = (seg.pct / total);
    const gapAngle = (gap / circ) * 360;
    const dashLen = circ * pct - (gap * (segments.length > 1 ? 1 : 0));
    const dashOffset = -offset * circ / 360 * (360 / 360) - circ * (offset / 360);

    const startAngle = (offset / 100) * 360 - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const sweep = pct * 360;
    const endAngle = startAngle + sweep - (segments.length > 1 ? gapAngle : 0);
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = sweep - gapAngle > 180 ? 1 : 0;

    const d = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
    ].join(' ');

    offset += seg.pct;

    return <path key={i} d={d} stroke={seg.color} strokeWidth={thickness} fill="none" strokeLinecap="round" />;
  });

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs}
      </svg>
      {(label || sublabel) && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          {label && <div style={{ fontSize: size * 0.18, fontWeight: 800, lineHeight: 1, color: 'var(--text-primary)' }}>{label}</div>}
          {sublabel && <div style={{ fontSize: size * 0.1, color: 'var(--text-secondary)', fontWeight: 500, marginTop: 2 }}>{sublabel}</div>}
        </div>
      )}
    </div>
  );
}
