'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DbsBiometricPage() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.push('/categorise/dbs-app/home'), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="unlock-screen screen">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'calc(env(safe-area-inset-top) + 16px)' }}>
        <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 40, height: 40, borderRadius: 10 }} />
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px' }}>digibank</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="var(--dbs-red-100)" strokeWidth="4"/>
            <circle cx="50" cy="50" r="44" stroke="var(--color-brand)" strokeWidth="4" strokeLinecap="round"
              strokeDasharray="55 165"
              style={{ animation: 'scanSpin 1.2s linear infinite', transformOrigin: '50px 50px' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 13V9a6 6 0 016-6h4M35 13V9a6 6 0 00-6-6h-4M3 25v4a6 6 0 006 6h4M35 25v4a6 6 0 01-6 6h-4"/>
              <path d="M12 16v1M26 16v1M14 24s2 2.5 5 2.5 5-2.5 5-2.5M19 16v4h-2"/>
            </svg>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>Authenticating…</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6 }}>Biometric unlock in progress</div>
        </div>
      </div>
    </div>
  );
}
