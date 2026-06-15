'use client';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/shell/StatusBar';

export default function DbsAppFaceUnlockPage() {
  const router = useRouter();

  return (
    <div className="unlock-screen screen">
      <StatusBar dark />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 32 }}>
        <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 40, height: 40, borderRadius: 10 }} />
        <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>digibank</span>
      </div>

      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 48 }}>Welcome back, Fabian</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        {/* Face ID circle */}
        <button
          onClick={() => router.push('/categorise/dbs-app/biometric')}
          style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--dbs-red-50)', border: '2px solid var(--dbs-red-200)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
        >
          <svg width="42" height="42" viewBox="0 0 38 38" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 13V9a6 6 0 016-6h4M35 13V9a6 6 0 00-6-6h-4M3 25v4a6 6 0 006 6h4M35 25v4a6 6 0 01-6 6h-4"/>
            <path d="M12 16v1M26 16v1M14 24s2 2.5 5 2.5 5-2.5 5-2.5M19 16v4h-2"/>
          </svg>
        </button>
        <div style={{ fontSize: 14.5, color: 'var(--text-tertiary)', fontWeight: 500 }}>Tap to log in securely</div>
      </div>

      <button
        onClick={() => router.push('/categorise/dbs-app/biometric')}
        style={{
          margin: '0 0 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: 'var(--color-brand)', color: '#fff',
          border: 'none', borderRadius: 4,
          padding: '14px 28px', fontSize: 16, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'var(--font-sans)',
          width: '100%',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 38 38" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 13V9a6 6 0 016-6h4M35 13V9a6 6 0 00-6-6h-4M3 25v4a6 6 0 006 6h4M35 25v4a6 6 0 01-6 6h-4"/>
          <path d="M12 16v1M26 16v1M14 24s2 2.5 5 2.5 5-2.5 5-2.5M19 16v4h-2"/>
        </svg>
        DBS Face Unlock
      </button>
    </div>
  );
}
