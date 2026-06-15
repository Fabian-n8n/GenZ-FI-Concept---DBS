'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { DBSCard } from '../page';

function HoldContent() {
  const router = useRouter();
  const params = useSearchParams();
  const merchant = params.get('merchant') || 'Hai Di Lao';

  useEffect(() => {
    const t = setTimeout(() => router.push('/categorise/apple-pay/done?merchant=' + encodeURIComponent(merchant)), 1600);
    return () => clearTimeout(t);
  }, [merchant, router]);

  return (
    <div className="apple-pay-screen screen" style={{ justifyContent: 'flex-start', gap: 0 }}>
      {/* DBS card at top — compact with padding */}
      <div style={{ padding: 'calc(env(safe-area-inset-top) + 20px) 20px 0' }}>
        <DBSCard compact />
      </div>

      {/* NFC + text centered below */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 28px' }}>
        {/* NFC concentric rings */}
        <div style={{ position: 'relative', width: 96, height: 96, display: 'grid', placeItems: 'center' }}>
          {[36, 60, 86].map((size, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: size, height: size,
              borderRadius: '50%',
              border: `${i === 2 ? 1.5 : 2}px solid rgba(255,255,255,${0.5 - i * 0.12})`,
              animation: `fadeIn 1.2s ease ${i * 0.28}s infinite`,
            }} />
          ))}
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fff', zIndex: 1 }} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Hold Near Reader</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 5 }}>Keep your phone close to the terminal</div>
        </div>
      </div>
    </div>
  );
}

export default function ApplePayHoldPage() {
  return (
    <Suspense fallback={<div className="screen" style={{ background: '#000' }} />}>
      <HoldContent />
    </Suspense>
  );
}
