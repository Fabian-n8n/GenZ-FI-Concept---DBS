'use client';
// Lock-style loading indicator (POSB/DBS biometric style): a dark squircle
// tile holding a padlock, hugged by a sweeping red progress ring.
// Replaces plain circular spinners across the app.
import { Lock } from 'lucide-react';

export default function LockLoader({ size = 72, done = false }) {
  const ring = size + 26;
  const r = ring / 2 - 3;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{ position: 'relative', width: ring, height: ring, display: 'grid', placeItems: 'center' }}>
      <svg width={ring} height={ring} viewBox={`0 0 ${ring} ${ring}`} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={ring / 2} cy={ring / 2} r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="3" />
        <circle
          cx={ring / 2} cy={ring / 2} r={r}
          fill="none" stroke="#FF3333" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={done ? `${circ} ${circ}` : `${circ * 0.28} ${circ}`}
          style={{
            animation: done ? 'none' : 'scanSpin 1.05s linear infinite',
            transformOrigin: `${ring / 2}px ${ring / 2}px`,
            transition: 'stroke-dasharray 250ms ease',
          }}
        />
      </svg>
      <div style={{
        width: size, height: size, borderRadius: size * 0.28,
        background: '#15151d', display: 'grid', placeItems: 'center',
        boxShadow: '0 8px 22px rgba(0,0,0,0.4)',
      }}>
        <Lock size={size * 0.42} color="#fff" strokeWidth={1.8} />
      </div>
    </div>
  );
}
