'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// DBS 4-pointed concave star
function XMark({ size = 26, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M12 1 Q13.5 10.5 23 12 Q13.5 13.5 12 23 Q10.5 13.5 1 12 Q10.5 10.5 12 1 Z" fill={color} />
    </svg>
  );
}

// DBS Multi-Currency Visa Platinum black card — from Claude Design handoff
export function DBSCard({ small = false }) {
  const p = small ? { pad: '14px 16px', logo: 20, visa: 10, type: 9, chip: [28, 18], num: 11 }
                  : { pad: '18px 20px', logo: 25, visa: 13, type: 11, chip: [36, 24], num: 14 };
  return (
    <div style={{
      width: '100%',
      borderRadius: 14,
      background: 'linear-gradient(135deg, #1c1c1c 0%, #2e2e2e 100%)',
      padding: p.pad,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
    }}>
      {/* Big star watermark */}
      <div style={{ position: 'absolute', right: -22, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <XMark size={small ? 110 : 134} color="rgba(255,255,255,0.92)" />
      </div>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <XMark size={p.logo} color="#fff" />
          <span style={{ color: '#fff', fontWeight: 800, fontSize: p.logo - 2, letterSpacing: '-0.2px' }}>DBS</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: p.visa }}>VISA</div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: p.visa - 2 }}>Platinum</div>
        </div>
      </div>
      {/* Type label */}
      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: p.type, fontWeight: 700, letterSpacing: '0.12em', marginTop: 6, position: 'relative' }}>
        MULTI-CURRENCY
      </div>
      {/* Chip */}
      <div style={{ width: p.chip[0], height: p.chip[1], borderRadius: 4, background: 'linear-gradient(135deg,#f5a623,#ffd270)', marginTop: small ? 10 : 16, position: 'relative' }} />
      {/* Number */}
      <div style={{ marginTop: small ? 10 : 14, display: 'flex', alignItems: 'center', gap: 6, position: 'relative' }}>
        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: p.num - 2, letterSpacing: '0.08em' }}>●●●●</span>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: p.num }}>1833</span>
      </div>
    </div>
  );
}

function ApplePayStartContent() {
  const router = useRouter();
  const params = useSearchParams();
  const merchant = params.get('merchant') || 'Hai Di Lao';
  const amount = params.get('amount') || 'S$31.50';

  return (
    <div className="apple-pay-screen screen" style={{ justifyContent: 'flex-start', gap: 0 }}>
      {/* Top: header + card */}
      <div style={{ padding: 'calc(env(safe-area-inset-top) + 20px) 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Apple Pay header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: '#000', border: '1px solid rgba(255,255,255,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <XMark size={20} color="#FF0000" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Apple Pay</div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)' }}>Ready to authenticate</div>
          </div>
        </div>
        {/* DBS black card */}
        <DBSCard />
      </div>

      {/* Bottom: merchant + face ID + amount */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px calc(36px + env(safe-area-inset-bottom))', gap: 18 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>{merchant}</div>
          <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>Double-click the side button to pay</div>
        </div>

        {/* Face ID button */}
        <button
          onClick={() => router.push('/categorise/apple-pay/biometric?merchant=' + encodeURIComponent(merchant))}
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.25)',
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            backdropFilter: 'blur(12px)',
          }}
          aria-label="Authenticate with Face ID"
        >
          <svg width="36" height="36" viewBox="0 0 38 38" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 13V9a6 6 0 016-6h4M35 13V9a6 6 0 00-6-6h-4M3 25v4a6 6 0 006 6h4M35 25v4a6 6 0 01-6 6h-4"/>
            <path d="M12 16v1M26 16v1M14 24s2 2.5 5 2.5 5-2.5 5-2.5M19 16v4h-2"/>
          </svg>
        </button>

        {/* Amount row */}
        <div style={{
          width: '100%', borderRadius: 14,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Amount</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.6px', fontVariantNumeric: 'tabular-nums' }}>{amount}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Method</div>
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
