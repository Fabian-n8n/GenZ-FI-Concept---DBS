'use client';
import Link from 'next/link';

export default function LockScreen() {
  return (
    <div className="screen lock-screen" style={{ justifyContent: 'space-between' }}>
      {/* Wallpaper blobs */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #1c1c28 0%, #2a1c2a 100%)',
      }} />
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: 280, height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(120,40,160,0.35) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '-10%',
        width: 240, height: 240,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,20,60,0.25) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Time + date */}
        <div style={{ textAlign: 'center', padding: 'calc(env(safe-area-inset-top) + 24px) 24px 0', color: '#fff' }}>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ marginBottom: 12, opacity: 0.85 }}>
            <path d="M3.2 8V5.6a4.8 4.8 0 0 1 9.6 0V8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            <rect x="1.5" y="8" width="13" height="10.5" rx="3" fill="white"/>
          </svg>
          <div style={{ fontSize: 16, fontWeight: 500, opacity: 0.9, marginBottom: 4 }}>Friday, 27 June</div>
          <div style={{ fontSize: 96, fontWeight: 200, letterSpacing: '-4px', lineHeight: 1 }}>9:27</div>
        </div>

        {/* Notification */}
        <div style={{ padding: '0 16px', marginTop: 'auto', paddingBottom: 24 }}>
          <Link href="/payday/login" style={{ textDecoration: 'none' }}>
            <div className="lock-notif">
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src="/assets/logo/dbs-mark-red.png" alt="DBS"
                  style={{ width: 38, height: 38, borderRadius: 8 }} />
                <span style={{
                  position: 'absolute', left: '50%', bottom: -3,
                  transform: 'translateX(-50%)',
                  padding: '0 4px', height: 15, minWidth: 15,
                  borderRadius: 8,
                  background: '#3a3d45', color: '#fff',
                  fontSize: 8, fontWeight: 700,
                  display: 'grid', placeItems: 'center',
                  border: '1.5px solid rgba(40,40,46,0.95)',
                }}>SG</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>DBS digibank</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>now</span>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.4 }}>
                  Your salary of <strong>S$4,200</strong> has been credited. Tap to set up your payday plan.
                </div>
              </div>
            </div>
          </Link>

          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 16, fontWeight: 500 }}>
            Tap the notification to begin →
          </div>
        </div>
      </div>
    </div>
  );
}
