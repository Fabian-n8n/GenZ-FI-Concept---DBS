'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StatusBar from '@/components/shell/StatusBar';

function HoldContent() {
  const router = useRouter();
  const params = useSearchParams();
  const merchant = params.get('merchant') || 'known';

  useEffect(() => {
    const t = setTimeout(() => router.push('/categorise/apple-pay/done?merchant=' + merchant), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="apple-pay-screen screen" style={{ gap: 0 }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        {/* NFC wave */}
        <div style={{ position: 'relative', width: 100, height: 100, display: 'grid', placeItems: 'center' }}>
          {[40, 62, 86].map((size, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.4)',
              animation: `fadeIn 1s ease ${i * 0.3}s infinite`,
            }} />
          ))}
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', zIndex: 1 }} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Hold Near Reader</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Keep your phone close to the terminal</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 20px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Hai Di Lao</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums' }}>S$31.50</div>
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
