'use client';
// iOS-style Dynamic Island Face ID. Inside a pitch-black rounded tile the
// animation runs in three smooth phases:
//   scan glyph (breathing) → green spheres rotating (verifying) → green check.
// Driven by the `done` prop: while false it scans; once true it spins the green
// orbit rings briefly, then settles into the success check.
import { useState, useEffect } from 'react';

export default function FaceIdIsland({ done = false, size = 132 }) {
  const [phase, setPhase] = useState('scan'); // scan | rings | check

  useEffect(() => {
    if (!done) { setPhase('scan'); return; }
    setPhase('rings');
    const t = setTimeout(() => setPhase('check'), 820); // spin, then settle
    return () => clearTimeout(t);
  }, [done]);

  // Match the black tile geometry baked into the scan/check SVGs so all three
  // phases share the exact same box (the contents crossfade, the box stays put).
  const box = size * 0.617;
  const radius = size * 0.169;
  const shadow = `0 ${size * 0.077}px ${size * 0.096}px rgba(0,0,0,0.22)`;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center' }}>
      {/* Scanning */}
      <img
        src="/assets/logo/faceid-scanning.svg"
        alt="Face ID"
        style={{
          position: 'absolute', width: size, height: 'auto', display: 'block',
          opacity: phase === 'scan' ? 1 : 0,
          transition: 'opacity 280ms ease',
          animation: phase === 'scan' ? 'fidBreathe 1.9s ease-in-out infinite' : 'none',
        }}
      />

      {/* Verifying — green spheres rotating */}
      <div
        style={{
          position: 'absolute', width: box, height: box, borderRadius: radius,
          background: '#000', boxShadow: shadow, display: 'grid', placeItems: 'center',
          opacity: phase === 'rings' ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      >
        <svg width={box * 0.94} height={box * 0.94} viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="fidGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8CF2B4" />
              <stop offset="0.5" stopColor="#30D158" />
              <stop offset="1" stopColor="#15A046" />
            </linearGradient>
            <filter id="fidGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.7" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#fidGlow)" stroke="url(#fidGrad)" fill="none" strokeLinecap="round">
            <ellipse className="fid-ring fid-r1" cx="50" cy="50" rx="34" ry="34" strokeWidth="3.2" strokeDasharray="150 70" />
            <ellipse className="fid-ring fid-r2" cx="50" cy="50" rx="34" ry="24" strokeWidth="2.8" strokeDasharray="120 95" />
            <ellipse className="fid-ring fid-r3" cx="50" cy="50" rx="24" ry="34" strokeWidth="2.8" strokeDasharray="120 95" />
            <ellipse className="fid-ring fid-r4" cx="50" cy="50" rx="33" ry="30" strokeWidth="2.4" strokeDasharray="100 125" />
          </g>
        </svg>
      </div>

      {/* Success check */}
      <img
        src="/assets/logo/faceid-checked.svg"
        alt="Face ID verified"
        style={{
          position: 'absolute', width: size, height: 'auto', display: 'block',
          opacity: phase === 'check' ? 1 : 0,
          transform: phase === 'check' ? 'scale(1)' : 'scale(0.9)',
          transition: 'opacity 300ms ease, transform 360ms cubic-bezier(0.34, 1.4, 0.64, 1)',
        }}
      />

      <style>{`
        @keyframes fidBreathe { 0%, 100% { transform: scale(0.985); } 50% { transform: scale(1.015); } }
        @keyframes fidSpin  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes fidSpinR { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
        .fid-ring { transform-origin: 50% 50%; transform-box: fill-box; }
        .fid-r1 { animation: fidSpin 2.4s linear infinite; }
        .fid-r2 { animation: fidSpinR 1.9s linear infinite; }
        .fid-r3 { animation: fidSpin 2.1s linear infinite; }
        .fid-r4 { animation: fidSpinR 3s linear infinite; }
      `}</style>
    </div>
  );
}
