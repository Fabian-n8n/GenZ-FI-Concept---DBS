'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import FaceIdIsland from '@/components/shell/FaceIdIsland';

function BiometricContent() {
  const router = useRouter();
  const params = useSearchParams();
  const merchant = params.get('merchant') || 'FAIRPRICE SG';
  const [done, setDone] = useState(false);

  useEffect(() => {
    const qs = params.toString();
    // Online flows (Shopee) skip "Hold Near Reader" and go straight to the
    // merchant result via bioNext; in-store Apple Pay (no bioNext) keeps the hold step.
    const bioNext = params.get('bioNext');
    const dest = bioNext
      ? bioNext + (qs ? '?' + qs : '')
      : '/categorise/apple-pay/hold' + (qs ? '?' + qs : '?merchant=' + encodeURIComponent(merchant));
    const t1 = setTimeout(() => setDone(true), 1200);
    const t2 = setTimeout(() => router.push(dest), 2850);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [merchant, params, router]);

  return (
    <div className="apple-pay-screen screen" style={{ gap: 0, position: 'relative' }}>
      {/* Face ID — Dynamic Island at the top */}
      <div style={{ position: 'absolute', top: 'calc(env(safe-area-inset-top) + 8px)', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        <FaceIdIsland done={done} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 28px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.2px' }}>
          {done ? 'Face ID verified' : 'Confirm with Face ID'}
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
          {done ? 'Completing your payment…' : `Pay ${merchant}`}
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
