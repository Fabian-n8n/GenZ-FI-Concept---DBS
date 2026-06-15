'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/shell/StatusBar';

export default function ApplePayFaceIdPage() {
  const router = useRouter();

  return (
    <div className="apple-pay-screen screen">
      <StatusBar />
      {/* Wallet-style card art at top */}
      <div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 280, height: 172, borderRadius: 16, background: 'linear-gradient(135deg,#1a1a2e,#16213e)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 22, border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 32, height: 32, borderRadius: 8 }} />
            <div style={{ width: 36, height: 24, borderRadius: 4, background: 'linear-gradient(135deg,#f59300,#ffd700)', opacity: 0.9 }} />
          </div>
          <div>
            <div style={{ fontSize: 20, letterSpacing: '3px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>•••• •••• •••• 4829</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: '0.06em' }}>FABIAN WONG · 09/28</div>
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 32px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Pay with Apple Pay</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Tap to authenticate with Face ID</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%' }}>
          {/* Face ID icon */}
          <button
            onClick={() => router.push('/categorise/apple-pay/biometric')}
            style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.3)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(12px)' }}
          >
            <svg width="36" height="36" viewBox="0 0 38 38" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 13V9a6 6 0 016-6h4M35 13V9a6 6 0 00-6-6h-4M3 25v4a6 6 0 006 6h4M35 25v4a6 6 0 01-6 6h-4"/>
              <path d="M12 16v1M26 16v1M14 24s2 2.5 5 2.5 5-2.5 5-2.5M19 16v4h-2"/>
            </svg>
          </button>
          <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)' }}>Double-click to pay</div>
        </div>

        {/* Merchant + amount */}
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 20px', width: '100%', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: '#fff' }}>Hai Di Lao</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums' }}>S$31.50</div>
        </div>
      </div>
    </div>
  );
}
