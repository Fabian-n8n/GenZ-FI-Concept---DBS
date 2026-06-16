'use client';
// Shared DBS login screen — both payday and categorise flows.
// Matches real DBS iOS login: dark bg, glass card, warm glow, official logo.
import { X } from 'lucide-react';

export default function DbsLogin({ onClose, onLogin }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100dvh',
      background: '#0a0e14',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Warm red-orange glow at bottom — matches real DBS app */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '45%',
        background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(200,60,0,0.22) 0%, transparent 70%)',
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

        {/* Official DBS mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
          <img
            src="/assets/logo/dbs-mark-red.png"
            alt="DBS"
            style={{ width: 30, height: 30, display: 'block', objectFit: 'contain' }}
          />
          <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>DBS</span>
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
        {/* Glass credential card — matches real DBS login */}
        <div style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.11)',
          borderRadius: 13,
          overflow: 'hidden',
          backdropFilter: 'blur(16px) saturate(140%)',
          WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
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
            boxShadow: '0 4px 16px rgba(232,0,0,0.35)',
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
