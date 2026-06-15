'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

// DBS 4-pointed concave star (brand X-mark)
function XMark({ size = 26, color = '#FF0000' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <path d="M12 1 Q13.5 10.5 23 12 Q13.5 13.5 12 23 Q10.5 13.5 1 12 Q10.5 10.5 12 1 Z" fill={color} />
    </svg>
  );
}

export default function DbsLoginPage() {
  const router = useRouter();

  function goNext() {
    router.push('/categorise/dbs-app/biometric');
  }

  return (
    <div className="screen dbs-login" style={{ justifyContent: 'flex-start' }}>
      {/* Header bar: X left · DBS logo+name center · spacer right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr 44px',
        alignItems: 'center',
        paddingTop: 'calc(env(safe-area-inset-top) + 10px)',
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        flexShrink: 0,
      }}>
        <button
          onClick={() => router.push('/categorise')}
          aria-label="Close"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', display: 'grid', placeItems: 'center', width: 44, height: 44 }}
        >
          <X size={24} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <XMark size={26} color="#FF0000" />
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.2px' }}>DBS</span>
        </div>
        <span />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 20px 0', overflowY: 'auto' }}>
        {/* Fields card */}
        <div className="dbs-login-card" style={{ borderRadius: 12 }}>
          <label style={{ display: 'block' }}>
            <div style={{ padding: '12px 16px 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              User ID
            </div>
            <input
              className="dbs-login-input"
              defaultValue="fabianwong"
              autoComplete="username"
              spellCheck={false}
              style={{ fontSize: 15, padding: '8px 16px 14px' }}
            />
          </label>
          <label style={{ display: 'block' }}>
            <div style={{ padding: '12px 16px 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              PIN
            </div>
            <input
              className="dbs-login-input"
              type="password"
              defaultValue="123456"
              autoComplete="current-password"
              style={{ fontSize: 15, padding: '8px 16px 14px' }}
            />
          </label>
        </div>

        {/* Forgot link */}
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.45)', marginTop: 14, textAlign: 'left' }}>
          Forgot{' '}
          <span style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline', cursor: 'pointer' }}>User ID</span>
          {' '}or{' '}
          <span style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline', cursor: 'pointer' }}>PIN</span>
        </div>

        {/* LOG IN */}
        <button
          className="dbs-login-btn"
          onClick={goNext}
          style={{ marginTop: 22, letterSpacing: '0.08em' }}
        >
          LOG IN
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', whiteSpace: 'nowrap' }}>New to digibank?</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
        </div>

        {/* GET STARTED */}
        <button
          onClick={goNext}
          style={{
            background: 'transparent',
            color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.28)',
            borderRadius: 4,
            minHeight: 50,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: '0.06em',
            cursor: 'pointer',
          }}
        >
          GET STARTED
        </button>

        <div style={{ marginTop: 'auto', paddingBottom: 32, paddingTop: 28, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.5 }}>
          Prototype only · Sign-in is simulated for usability testing
        </div>
      </div>
    </div>
  );
}
