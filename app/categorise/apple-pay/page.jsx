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

// DBS Multi-Currency Visa Platinum card.
// compact=false → start screen: margins applied by parent, 1.586 aspect ratio, chip + number
// compact=true  → hold/done: taller padded card, no chip/number (those screens are locked)
export function DBSCard({ compact = false }) {
  if (!compact) {
    // ── Start-screen variant: proper credit-card proportions ──
    return (
      <div style={{
        width: '100%',
        aspectRatio: '1.586',
        borderRadius: 16,
        background: 'linear-gradient(160deg, #2a2a2a 0%, #1c1c1c 50%, #111111 100%)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 16px 18px',
        boxSizing: 'border-box',
      }}>
        {/* Diamond watermark — small, right-centre, contained */}
        <div style={{
          position: 'absolute',
          right: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}>
          <XMark size={110} color="rgba(255,255,255,0.28)" />
        </div>

        {/* Top row: ✦ DBS · VISA Platinum */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <XMark size={20} color="#fff" />
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.2px' }}>DBS</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#fff', fontWeight: 900, fontSize: 15, letterSpacing: '0.05em' }}>VISA</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Platinum</div>
          </div>
        </div>

        {/* MULTI-CURRENCY */}
        <div style={{
          color: 'rgba(255,255,255,0.38)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.16em',
          marginTop: 6,
          position: 'relative', zIndex: 1,
        }}>
          MULTI-CURRENCY
        </div>

        {/* Push chip + number to bottom */}
        <div style={{ flex: 1 }} />

        {/* Chip */}
        <div style={{
          width: 40, height: 28,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f5a623 0%, #ffd270 55%, #f5a623 100%)',
          marginBottom: 10,
          position: 'relative', zIndex: 1,
          boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
        }} />

        {/* Card number */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 }}>
          <span style={{ color: 'rgba(255,255,255,0.42)', fontSize: 13, letterSpacing: '0.12em' }}>●●●●</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 15, letterSpacing: '0.06em' }}>1833</span>
        </div>
      </div>
    );
  }

  // ── Hold/done compact variant (unchanged) ──
  return (
    <div style={{
      width: '100%',
      borderRadius: 18,
      background: 'linear-gradient(160deg, #2a2a2a 0%, #1c1c1c 45%, #111111 100%)',
      padding: '22px 22px 26px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 48px rgba(0,0,0,0.7)',
    }}>
      <div style={{
        position: 'absolute',
        right: -30,
        top: '52%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }}>
        <XMark size={170} color="rgba(255,255,255,0.82)" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <XMark size={22} color="#fff" />
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.2px' }}>DBS</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#fff', fontWeight: 900, fontSize: 15, letterSpacing: '0.05em' }}>VISA</div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>Platinum</div>
        </div>
      </div>

      <div style={{
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.16em',
        marginTop: 6,
        position: 'relative', zIndex: 1,
      }}>
        MULTI-CURRENCY
      </div>

      <div style={{ height: 90 }} />
    </div>
  );
}

function ApplePayStartContent() {
  const router = useRouter();
  const params = useSearchParams();
  const merchant = params.get('merchant') || 'SCARLETT STORE';

  return (
    <div className="apple-pay-screen screen" style={{ justifyContent: 'flex-start', gap: 0 }}>
      {/* DBS card — stretch to full width, credit-card aspect ratio */}
      <div style={{
        alignSelf: 'stretch',
        padding: 'calc(env(safe-area-inset-top) + 20px) 18px 0',
        flexShrink: 0,
      }}>
        <DBSCard />
      </div>

      {/* Centred: merchant name + Face ID button */}
      <div style={{
        flex: 1,
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        padding: '0 22px calc(env(safe-area-inset-bottom) + 24px)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 23, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>{merchant}</div>
        </div>

        <button
          onClick={() => router.push('/categorise/apple-pay/biometric?merchant=' + encodeURIComponent(merchant))}
          style={{
            width: 76, height: 76, borderRadius: '50%',
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
