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

// DBS Multi-Currency Visa Platinum — full-bleed, prominent
export function DBSCard({ compact = false }) {
  return (
    <div style={{
      width: '100%',
      borderRadius: compact ? 14 : 0,
      background: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 60%, #1e1e1e 100%)',
      padding: compact ? '20px 22px 24px' : '28px 28px 32px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: compact ? '0 16px 40px rgba(0,0,0,0.55)' : 'none',
    }}>
      {/* Large star watermark — anchored to right edge */}
      <div style={{
        position: 'absolute',
        right: compact ? -24 : -28,
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        opacity: 0.95,
      }}>
        <XMark size={compact ? 130 : 180} color="rgba(255,255,255,0.93)" />
      </div>

      {/* Top row: DBS logo left · VISA Platinum right */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <XMark size={compact ? 24 : 30} color="#fff" />
          <span style={{ color: '#fff', fontWeight: 800, fontSize: compact ? 18 : 22, letterSpacing: '-0.3px' }}>DBS</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: compact ? 12 : 14, letterSpacing: '0.04em' }}>VISA</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: compact ? 10 : 12 }}>Platinum</div>
        </div>
      </div>

      {/* Card type */}
      <div style={{
        color: 'rgba(255,255,255,0.5)',
        fontSize: compact ? 10 : 12,
        fontWeight: 700,
        letterSpacing: '0.14em',
        marginTop: 8,
        position: 'relative',
      }}>
        MULTI-CURRENCY
      </div>

      {/* Chip */}
      <div style={{
        width: compact ? 38 : 48,
        height: compact ? 26 : 34,
        borderRadius: 5,
        background: 'linear-gradient(135deg, #f5a623 0%, #ffd270 60%, #f5a623 100%)',
        marginTop: compact ? 18 : 24,
        position: 'relative',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
      }} />

      {/* Card number */}
      <div style={{
        marginTop: compact ? 16 : 20,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        position: 'relative',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: compact ? 12 : 14, letterSpacing: '0.1em' }}>●●●●</span>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: compact ? 14 : 17, letterSpacing: '0.04em' }}>1833</span>
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
      {/* Apple Pay header — with horizontal padding */}
      <div style={{
        padding: 'calc(env(safe-area-inset-top) + 18px) 22px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: '#000',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'grid', placeItems: 'center', flexShrink: 0,
        }}>
          <XMark size={22} color="#FF0000" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Apple Pay</div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)' }}>Ready to authenticate</div>
        </div>
      </div>

      {/* DBS black card — full bleed, no side padding */}
      <DBSCard />

      {/* Bottom: merchant + face ID + amount */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 22px calc(36px + env(safe-area-inset-bottom))',
        gap: 20,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 23, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>{merchant}</div>
          <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Double-click the side button to pay</div>
        </div>

        {/* Face ID circle button */}
        <button
          onClick={() => router.push('/categorise/apple-pay/biometric?merchant=' + encodeURIComponent(merchant))}
          style={{
            width: 74, height: 74, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.22)',
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          aria-label="Authenticate with Face ID"
        >
          <svg width="36" height="36" viewBox="0 0 38 38" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 13V9a6 6 0 016-6h4M35 13V9a6 6 0 00-6-6h-4M3 25v4a6 6 0 006 6h4M35 25v4a6 6 0 01-6 6h-4"/>
            <path d="M12 16v1M26 16v1M14 24s2 2.5 5 2.5 5-2.5 5-2.5M19 16v4h-2"/>
          </svg>
        </button>

        {/* Amount + method */}
        <div style={{
          width: '100%', borderRadius: 14,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Amount</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.6px', fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{amount}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Method</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginTop: 2 }}>Apple Pay</div>
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
