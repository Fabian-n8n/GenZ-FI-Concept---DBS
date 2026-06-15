'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FaceIdPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push('/payday/home?setup=1'), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen" style={{ background: 'var(--dbs-navy-900)', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      <div style={{ position: 'absolute', top: 'calc(env(safe-area-inset-top) + 44px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 40, height: 40, borderRadius: 10 }} />
        <span style={{ color: '#fff', fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px' }}>digibank</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, marginTop: 40 }}>
        {/* Scanning ring */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.12)" strokeWidth="4"/>
            <circle
              cx="50" cy="50" r="44"
              stroke="#ff0000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="70 208"
              style={{ animation: 'scanSpin 1.2s linear infinite', transformOrigin: '50px 50px' }}
            />
          </svg>
          {/* Face ID icon */}
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 13V9a6 6 0 016-6h4M35 13V9a6 6 0 00-6-6h-4M3 25v4a6 6 0 006 6h4M35 25v4a6 6 0 01-6 6h-4"/>
              <path d="M12 16v1M26 16v1M14 24s2 2.5 5 2.5 5-2.5 5-2.5"/>
              <path d="M19 16v4h-2"/>
            </svg>
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px' }}>Verifying it's you</div>
          <div style={{ fontSize: 14, opacity: 0.7, marginTop: 6 }}>Authenticating with Face ID…</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Tap anywhere to continue</div>
      </div>
    </div>
  );
}
