'use client';
import Link from 'next/link';

export default function LockScreen() {
  return (
    <div className="screen lock-screen" style={{ justifyContent: 'space-between' }}>
      {/* Wallpaper — rich dark gradient with colour blobs */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #1a1225 0%, #1e1030 50%, #2a0a1e 100%)',
      }} />
      {/* Purple glow blobs */}
      <div style={{
        position: 'absolute', top: '8%', left: '5%',
        width: 320, height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(110,30,160,0.45) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      <div style={{
        position: 'absolute', top: '32%', right: '-15%',
        width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,20,60,0.3) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '20%',
        width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(80,10,120,0.3) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Lock icon + date + time */}
        <div style={{ textAlign: 'center', padding: 'calc(env(safe-area-inset-top) + 24px) 24px 0', color: '#fff' }}>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ marginBottom: 14, opacity: 0.8 }}>
            <path d="M3.2 8V5.6a4.8 4.8 0 0 1 9.6 0V8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            <rect x="1.5" y="8" width="13" height="10.5" rx="3" fill="white"/>
          </svg>
          <div style={{ fontSize: 17, fontWeight: 500, opacity: 0.88, marginBottom: 6 }}>Friday, 27 June</div>
          <div style={{ fontSize: 98, fontWeight: 200, letterSpacing: '-5px', lineHeight: 0.95 }}>9:27</div>
        </div>

        {/* iOS liquid-glass notification — sits just below the clock */}
        <div style={{ padding: '24px 14px 0' }}>
          <Link href="/payday/login" style={{ textDecoration: 'none' }}>
            <div style={{
              /* iOS frosted glass */
              background: 'rgba(38, 28, 52, 0.72)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 20,
              padding: '14px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}>
              {/* DBS app icon — black squircle with red X-mark + SG badge */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: 42, height: 42,
                  borderRadius: 11,
                  background: '#000',
                  display: 'grid', placeItems: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}>
                  <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 26, height: 26 }} />
                </div>
                <span style={{
                  position: 'absolute', left: '50%', bottom: -4,
                  transform: 'translateX(-50%)',
                  padding: '0 4px', height: 15, minWidth: 17,
                  borderRadius: 8,
                  background: '#3a3a40',
                  color: '#fff',
                  fontSize: 8, fontWeight: 800,
                  display: 'grid', placeItems: 'center',
                  border: '1.5px solid rgba(28,20,40,0.9)',
                  letterSpacing: '0.04em',
                }}>SG</span>
              </div>

              {/* Notification text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>DBS digibank</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginLeft: 8, flexShrink: 0 }}>now</span>
                </div>
                <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.45 }}>
                  Your salary of <strong style={{ color: '#fff' }}>S$4,200</strong> has been credited. Tap to set up your payday plan.
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
