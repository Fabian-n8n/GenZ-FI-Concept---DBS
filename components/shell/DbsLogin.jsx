'use client';
// Shared DBS login screen — both payday and categorise flows.
// Matches real DBS iOS login: dark bg, glass card, warm glow, official logo.
import { X } from 'lucide-react';

export default function DbsLogin({ onClose, onLogin, topSlot }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100dvh',
      background: '#0A0E1A',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Warm orange-red radial glow — diffuse, bottom-center */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '60%',
        background: 'radial-gradient(circle at 50% 100%, rgba(255,100,50,0.15) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* ── Header: X · logo · spacer ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '52px 1fr 52px',
        alignItems: 'center',
        paddingTop: 'calc(env(safe-area-inset-top) + 14px)',
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
            color: 'rgba(255,255,255,0.45)',
            display: 'grid', placeItems: 'center',
            width: 44, height: 44,
          }}
        >
          <X size={22} />
        </button>

        {/* Official DBS lockup — real logomark + wordmark (vector) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/assets/logo/dbs-lockup-white.svg"
            alt="DBS"
            style={{ height: 30, width: 'auto', display: 'block' }}
          />
        </div>

        <span />
      </div>

      {/* ── Content ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '28px 22px 0',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {topSlot}

        {/* Glass credential card — matches real DBS login */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}>
          {/* User ID */}
          <div style={{ padding: '15px 18px 6px' }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.36)',
              marginBottom: 7,
            }}>
              User ID
            </div>
            <input
              defaultValue="fabianwong"
              autoComplete="username"
              spellCheck={false}
              style={{
                width: '100%', background: 'transparent',
                border: 'none', outline: 'none',
                color: '#fff', fontFamily: 'var(--font-sans)',
                fontSize: 16, fontWeight: 400,
                paddingBottom: 12,
              }}
            />
          </div>
          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
          {/* PIN */}
          <div style={{ padding: '15px 18px 6px' }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.36)',
              marginBottom: 7,
            }}>
              PIN
            </div>
            <input
              type="password"
              defaultValue="123456"
              autoComplete="current-password"
              style={{
                width: '100%', background: 'transparent',
                border: 'none', outline: 'none',
                color: '#fff', fontFamily: 'var(--font-sans)',
                fontSize: 16,
                paddingBottom: 12,
              }}
            />
          </div>
        </div>

        {/* Forgot */}
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.38)', marginTop: 15 }}>
          Forgot{' '}
          <span style={{ color: 'rgba(255,255,255,0.62)', textDecoration: 'underline', cursor: 'pointer' }}>User ID</span>
          {' '}or{' '}
          <span style={{ color: 'rgba(255,255,255,0.62)', textDecoration: 'underline', cursor: 'pointer' }}>PIN</span>
        </div>

        {/* LOG IN */}
        <button
          onClick={onLogin}
          style={{
            marginTop: 22,
            width: '100%', minHeight: 52,
            background: '#e80000',
            color: '#fff', border: 'none', borderRadius: 4,
            fontFamily: 'var(--font-sans)',
            fontSize: 16, fontWeight: 800, letterSpacing: '0.08em',
            cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(255,0,0,0.25)',
          }}
        >
          LOG IN
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.09)' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>New to digibank?</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.09)' }} />
        </div>

        {/* GET STARTED */}
        <button
          onClick={onLogin}
          style={{
            width: '100%', minHeight: 52,
            background: 'transparent',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 4,
            fontFamily: 'var(--font-sans)',
            fontSize: 15, fontWeight: 800, letterSpacing: '0.06em',
            cursor: 'pointer',
          }}
        >
          GET STARTED
        </button>

        <div style={{ marginTop: 'auto', paddingBottom: 34, paddingTop: 30, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.18)', lineHeight: 1.5 }}>
          Prototype only · Sign-in is simulated for usability testing
        </div>
      </div>
    </div>
  );
}
