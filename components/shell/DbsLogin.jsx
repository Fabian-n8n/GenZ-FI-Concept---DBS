'use client';
// Shared DBS login screen — used by both payday and categorise flows.
// Matches Claude Design reference: dark near-black bg, glass card, compact layout.

import { X } from 'lucide-react';

// DBS 4-pointed concave star (brand X-mark)
function XMark({ size = 28, color = '#FF0000' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M12 1 Q13.5 10.5 23 12 Q13.5 13.5 12 23 Q10.5 13.5 1 12 Q10.5 10.5 12 1 Z" fill={color} />
    </svg>
  );
}

export default function DbsLogin({ onClose, onLogin }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100dvh',
      background: '#0d1117',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle radial glow behind content */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 360, height: 360,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Header bar: X · logo+name · spacer ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '52px 1fr 52px',
        alignItems: 'center',
        paddingTop: 'calc(env(safe-area-inset-top) + 12px)',
        paddingLeft: 4,
        paddingRight: 4,
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)',
            display: 'grid', placeItems: 'center',
            width: 44, height: 44,
            borderRadius: '50%',
            transition: 'color 150ms',
          }}
        >
          <X size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
          <XMark size={28} color="#FF0000" />
          <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>DBS</span>
        </div>

        <span />
      </div>

      {/* ── Main content ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 24px 0',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Glass credential card */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 14,
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}>
          {/* User ID field */}
          <div style={{ padding: '16px 18px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 6 }}>
              User ID
            </div>
            <input
              defaultValue="fabianwong"
              autoComplete="username"
              spellCheck={false}
              style={{
                width: '100%', background: 'transparent', border: 'none', outline: 'none',
                color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500,
                paddingBottom: 14,
              }}
            />
          </div>
          {/* Separator */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 18px' }} />
          {/* PIN field */}
          <div style={{ padding: '16px 18px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 6 }}>
              PIN
            </div>
            <input
              type="password"
              defaultValue="123456"
              autoComplete="current-password"
              style={{
                width: '100%', background: 'transparent', border: 'none', outline: 'none',
                color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 16,
                paddingBottom: 14,
              }}
            />
          </div>
        </div>

        {/* Forgot */}
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>
          Forgot{' '}
          <span style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'underline', cursor: 'pointer' }}>User ID</span>
          {' '}or{' '}
          <span style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'underline', cursor: 'pointer' }}>PIN</span>
        </div>

        {/* LOG IN */}
        <button
          onClick={onLogin}
          style={{
            marginTop: 24,
            width: '100%', minHeight: 52,
            background: '#FF0000',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontFamily: 'var(--font-sans)',
            fontSize: 16, fontWeight: 800,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'background 120ms, transform 100ms',
          }}
        >
          LOG IN
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '22px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', whiteSpace: 'nowrap' }}>New to digibank?</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* GET STARTED */}
        <button
          onClick={onLogin}
          style={{
            width: '100%', minHeight: 52,
            background: 'transparent',
            color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.2)',
            borderRadius: 4,
            fontFamily: 'var(--font-sans)',
            fontSize: 15, fontWeight: 800,
            letterSpacing: '0.06em',
            cursor: 'pointer',
            transition: 'border-color 150ms',
          }}
        >
          GET STARTED
        </button>

        {/* Footer disclaimer */}
        <div style={{ marginTop: 'auto', paddingBottom: 36, paddingTop: 32, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.2)', lineHeight: 1.5 }}>
          Prototype only · Sign-in is simulated for usability testing
        </div>
      </div>
    </div>
  );
}
