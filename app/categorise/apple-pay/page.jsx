'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ApplePayStartContent() {
  const router = useRouter();
  const params = useSearchParams();
  const merchant = params.get('merchant') || 'Hai Di Lao';
  const amount = params.get('amount') || 'S$31.50';

  return (
    <div className="apple-pay-screen screen">
      <div style={{ position: 'absolute', top: 'calc(env(safe-area-inset-top) + 34px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, alignSelf: 'flex-start' }}>
          <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>Apple Pay</div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)' }}>Ready to authenticate</div>
          </div>
        </div>

        <div style={{
          width: '100%',
          maxWidth: 320,
          borderRadius: 18,
          background: 'linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 18px 50px rgba(0,0,0,0.45)',
          padding: 18,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)' }}>
              Tap to pay
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', opacity: 0.85 }}>DBS Card</div>
          </div>
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>•••• •••• •••• 4829</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.52)', marginTop: 6, letterSpacing: '0.06em' }}>FABIAN WONG · 09/28</div>
            </div>
            <div style={{ width: 44, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#f59300,#ffd700)', opacity: 0.95, flexShrink: 0 }} />
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 28px calc(30px + env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>{merchant}</div>
          <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.58)', marginTop: 5 }}>Double-click the side button to pay</div>
        </div>

        <button
          onClick={() => router.push('/categorise/apple-pay/biometric?merchant=' + encodeURIComponent(merchant))}
          style={{
            width: 78,
            height: 78,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.28)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
          }}
          aria-label="Authenticate with Face ID"
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 13V9a6 6 0 016-6h4M35 13V9a6 6 0 00-6-6h-4M3 25v4a6 6 0 006 6h4M35 25v4a6 6 0 01-6 6h-4"/>
            <path d="M12 16v1M26 16v1M14 24s2 2.5 5 2.5 5-2.5 5-2.5M19 16v4h-2"/>
          </svg>
        </button>

        <div style={{
          width: '100%',
          maxWidth: 320,
          borderRadius: 14,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Amount</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.6px', fontVariantNumeric: 'tabular-nums' }}>{amount}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Method</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Apple Pay</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApplePayStartPage() {
  return (
    <Suspense fallback={<div className="screen" style={{ background: '#000' }} />}>
      <ApplePayStartContent />
    </Suspense>
  );
}
