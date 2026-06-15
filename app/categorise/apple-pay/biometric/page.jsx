'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StatusBar from '@/components/shell/StatusBar';

function BiometricContent() {
  const router = useRouter();
  const params = useSearchParams();
  const merchant = params.get('merchant') || 'known';

  useEffect(() => {
    const t = setTimeout(() => router.push('/categorise/apple-pay/hold?merchant=' + merchant), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="apple-pay-screen screen" style={{ gap: 0 }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        {/* Scan ring */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.12)" strokeWidth="4"/>
            <circle
              cx="50" cy="50" r="44"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="70 208"
              style={{ animation: 'scanSpin 1s linear infinite', transformOrigin: '50px 50px' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 13V9a6 6 0 016-6h4M35 13V9a6 6 0 00-6-6h-4M3 25v4a6 6 0 006 6h4M35 25v4a6 6 0 01-6 6h-4"/>
              <path d="M12 16v1M26 16v1M14 24s2 2.5 5 2.5 5-2.5 5-2.5M19 16v4h-2"/>
            </svg>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Authenticating…</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Biometric unlock in progress</div>
        </div>
      </div>
    </div>
  );
}

export default function ApplePayBiometricPage() {
  return (
    <Suspense fallback={<div className="screen" style={{ background: '#000' }} />}>
      <BiometricContent />
    </Suspense>
  );
}
