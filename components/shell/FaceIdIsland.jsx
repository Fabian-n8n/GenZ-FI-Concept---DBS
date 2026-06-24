'use client';
// iOS-style Dynamic Island Face ID. Inside a pitch-black rounded tile the
// animation runs in three smooth phases, mirroring the real iOS sequence:
//   scan glyph (breathing) → green spheres rotating (verifying) → green check.
// The success check is not a static image — it springs in and the tick strokes
// itself on (stroke-dashoffset draw), which is the satisfying detail iOS nails.
// Driven by the `done` prop.
import { useState, useEffect } from 'react';

export default function FaceIdIsland({ done = false, size = 132 }) {
  const [phase, setPhase] = useState('scan'); // scan | rings | check

  useEffect(() => {
    if (!done) { setPhase('scan'); return; }
    setPhase('rings');
    const t = setTimeout(() => setPhase('check'), 820); // spin, then settle
    return () => clearTimeout(t);
  }, [done]);

  // Match the black tile geometry baked into the scan SVG so every phase shares
  // the exact same box (the contents crossfade, the box itself stays put).
  const box = size * 0.617;
  const radius = size * 0.169;
  const shadow = `0 ${size * 0.077}px ${size * 0.096}px rgba(0,0,0,0.22)`;
  const inner = box * 0.94;

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

      {/* Verifying + success share one black tile, so the box never jumps */}
      <div
        style={{
          position: 'absolute', width: box, height: box, borderRadius: radius,
          background: '#000', boxShadow: shadow, display: 'grid', placeItems: 'center',
          opacity: phase === 'scan' ? 0 : 1,
          transition: 'opacity 280ms ease',
        }}
      >
        {/* Green spheres rotating (verifying) */}
        <svg
          width={inner} height={inner} viewBox="0 0 100 100" fill="none" aria-hidden="true"
          style={{ position: 'absolute', opacity: phase === 'rings' ? 1 : 0, transition: 'opacity 260ms ease' }}
        >
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

        {/* Success — ring + tick spring in, tick strokes itself on (mounted only
            when we reach the check phase so the draw keyframes fire fresh) */}
        {phase === 'check' && (
          <svg
            className="fid-success" width={inner} height={inner} viewBox="0 0 100 100" fill="none" aria-hidden="true"
            style={{ position: 'absolute' }}
          >
            <g filter="url(#fidGlow)" stroke="#30D158" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="50" r="33" strokeWidth="4" />
              <path className="fid-tick" d="M35 51 L45.5 61.5 L66 40" strokeWidth="5" pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
            </g>
          </svg>
        )}
      </div>

      <style>{`
        @keyframes fidBreathe { 0%, 100% { transform: scale(0.985); } 50% { transform: scale(1.015); } }
        @keyframes fidSpin  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes fidSpinR { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
        .fid-ring { transform-origin: 50% 50%; transform-box: fill-box; }
        .fid-r1 { animation: fidSpin 2.4s linear infinite; }
        .fid-r2 { animation: fidSpinR 1.9s linear infinite; }
        .fid-r3 { animation: fidSpin 2.1s linear infinite; }
        .fid-r4 { animation: fidSpinR 3s linear infinite; }

        .fid-success { transform-origin: 50% 50%; animation: fidPop 460ms cubic-bezier(0.34, 1.5, 0.55, 1) both; }
        @keyframes fidPop { 0% { transform: scale(0.6); opacity: 0; } 45% { opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .fid-tick { animation: fidDraw 340ms cubic-bezier(0.65, 0, 0.35, 1) 170ms both; }
        @keyframes fidDraw { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}
