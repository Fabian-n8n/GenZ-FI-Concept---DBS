'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';

export default function DbsLoginPage() {
  const router = useRouter();

  function goNext() {
    router.push('/categorise/dbs-app/biometric');
  }

  return (
    <div className="screen dbs-login" style={{ padding: '0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'calc(env(safe-area-inset-top) + 10px)', width: '100%' }}>
        <button
          className="icon-btn"
          onClick={() => { setNextRouteDirection(-1); router.push('/categorise'); }}
          aria-label="Back"
          style={{ color: '#fff' }}
        >
          <ChevronLeft size={26} />
        </button>
        <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 38, height: 38, borderRadius: 10 }} />
        <div style={{ width: 44 }} />
      </div>

      <div style={{ width: '100%', maxWidth: 420, margin: '20px auto 0', display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
        <div style={{ paddingTop: 22 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>DBS digibank</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.8px', marginTop: 10, lineHeight: 1.05 }}>
            Sign in to continue
          </div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, marginTop: 12 }}>
            Access your account and review your transaction insights.
          </div>
        </div>

        <div className="dbs-login-card">
          <label style={{ display: 'block' }}>
            <div style={{ padding: '15px 16px 6px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              Username
            </div>
            <input
              className="dbs-login-input"
              defaultValue="fabian.wong"
              autoComplete="username"
              spellCheck={false}
            />
          </label>
          <label style={{ display: 'block' }}>
            <div style={{ padding: '14px 16px 6px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              Password
            </div>
            <input
              className="dbs-login-input"
              type="password"
              defaultValue="••••••••"
              autoComplete="current-password"
            />
          </label>
        </div>

        <button className="dbs-login-btn" onClick={goNext}>
          LOGIN
        </button>

        <button
          onClick={goNext}
          style={{
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 4,
            minHeight: 50,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Use Face ID instead
        </button>

        <div style={{ marginTop: 'auto', paddingBottom: 28, textAlign: 'center', fontSize: 12.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.45 }}>
          Prototype only · Sign-in is simulated for usability testing
        </div>
      </div>
    </div>
  );
}
