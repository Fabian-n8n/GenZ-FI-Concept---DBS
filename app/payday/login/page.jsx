'use client';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="screen dbs-login">
      {/* Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'calc(env(safe-area-inset-top) + 4px) 16px 16px' }}>
        <button className="icon-btn" style={{ color: '#fff' }} onClick={() => { setNextRouteDirection(-1); router.push('/payday'); }} aria-label="Close">
          <X size={24} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/assets/logo/dbs-mark-red.png" alt="" style={{ width: 28, height: 28, borderRadius: 6 }} />
          <span style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>DBS</span>
        </div>
        <div style={{ width: 44 }} />
      </div>

      <div style={{ padding: '8px 20px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 6 }}>digibank</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 28 }}>Singapore</div>

        {/* Input card */}
        <div className="dbs-login-card">
          <input className="dbs-login-input" placeholder="User ID" defaultValue="fabianwong" autoComplete="off" />
          <input className="dbs-login-input" type="password" placeholder="PIN" defaultValue="123456" autoComplete="off" />
        </div>

        <button
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', fontSize: 14, marginTop: 14, textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
        >
          Forgot <u>User ID</u> or <u>PIN</u>
        </button>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="dbs-login-btn" onClick={() => router.push('/payday/faceid')}>
            LOG IN
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>New to digibank?</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />
          </div>

          <button style={{
            width: '100%', minHeight: 50,
            background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: 'var(--radius-tile)',
            color: '#fff',
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.05em',
            cursor: 'pointer',
          }}>
            GET STARTED
          </button>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 24, display: 'flex', justifyContent: 'center', gap: 20 }}>
          {['Terms of Use', 'Privacy Policy', 'Security'].map(t => (
            <span key={t} style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', textDecoration: 'underline' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
