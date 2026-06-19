'use client';

import { motion } from 'framer-motion';

export default function Donut({ segments = [], size = 120, thickness = 11, gap = 3, label, sublabel }) {
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const total = segments.reduce((sum, seg) => sum + (seg.pct || 0), 0) || 100;

  let offset = 0;
  const arcs = segments.map((seg, i) => {
    const pct = seg.pct / total;
    // Gap angle distributed equally — half removed from each end of the arc
    const gapAngle = segments.length > 1 ? (gap / circ) * 360 : 0;
    const halfGap = gapAngle / 2;
    const startAngle = (offset / 100) * 360 - 90 + halfGap;
    const sweep = pct * 360 - gapAngle;
    const endAngle = startAngle + sweep;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = sweep > 180 ? 1 : 0;
    const d = [`M ${x1} ${y1}`, `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`].join(' ');
    offset += seg.pct;

    return (
      <motion.path
        key={i}
        d={d}
        stroke={seg.color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="butt"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 }}
      />
    );
  });

  return (
    <motion.div
      style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs}
      </svg>
      {(label || sublabel) && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {label && <div style={{ fontSize: size * 0.18, fontWeight: 800, lineHeight: 1, color: 'var(--text-primary)' }}>{label}</div>}
          {sublabel && <div style={{ fontSize: size * 0.1, color: 'var(--text-secondary)', fontWeight: 500, marginTop: 2 }}>{sublabel}</div>}
        </div>
      )}
    </motion.div>
  );
}
