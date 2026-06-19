'use client';
// Simple client-side access gate for the prototype.
// Keeps casual visitors out — NOT real security (code ships to the browser).
// Access code: 0000. Unlock persists for the browser session.
import { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';

const CODE = '0000';
const KEY = 'genzfi-unlocked';

export default function PasswordGate({ children }) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // Read session unlock state once on mount (avoids SSR/client mismatch).
  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === '1') setUnlocked(true);
    } catch {}
    setReady(true);
  }, []);

  function press(d) {
    if (pin.length >= 4) return;
    setError(false);
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      if (next === CODE) {
        try { sessionStorage.setItem(KEY, '1'); } catch {}
        setTimeout(() => setUnlocked(true), 150);
      } else {
        setTimeout(() => { setError(true); setPin(''); }, 200);
      }
    }
  }

  function back() {
    setError(false);
    setPin(p => p.slice(0, -1));
  }

  // Avoid flashing the gate before we know the session state.
  if (!ready) return null;
  if (unlocked) return children;

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: '100%', minHeight: '100dvh',
      background: '#0A0E1A', color: '#fff',
      fontFamily: 'var(--font-sans)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Warm glow — matches login screen */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
        background: 'radial-gradient(circle at 50% 100%, rgba(255,100,50,0.15) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        width: '100%', maxWidth: 360, padding: '0 28px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 36 }}>
          <img
            src="/assets/logo/dbs-mark-red.png"
            alt="DBS"
            style={{ width: 32, height: 32, display: 'block', objectFit: 'contain' }}
          />
          <span style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '0.5px', fontFamily: "Georgia, 'Times New Roman', 'Noto Serif', serif" }}>DBS</span>
        </div>

        <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>Enter access code</div>
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.4)', marginBottom: 32, textAlign: 'center', lineHeight: 1.5 }}>
          This prototype is private. Enter the code to continue.
        </div>

        {/* PIN dots */}
        <div
          className={error ? 'pin-shake' : undefined}
          style={{ display: 'flex', gap: 18, marginBottom: 12 }}
        >
          {[0, 1, 2, 3].map(i => (
            <span key={i} style={{
              width: 14, height: 14, borderRadius: '50%',
              background: pin.length > i ? (error ? '#ff4d4d' : '#e80000') : 'transparent',
              border: `1.5px solid ${error ? 'rgba(255,77,77,0.7)' : pin.length > i ? '#e80000' : 'rgba(255,255,255,0.28)'}`,
              transition: 'background 120ms, border-color 120ms',
            }} />
          ))}
        </div>

        <div style={{ height: 18, fontSize: 13, color: '#ff6b6b', opacity: error ? 1 : 0, transition: 'opacity 120ms', marginBottom: 18 }}>
          Incorrect code. Try again.
        </div>

        {/* Keypad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, width: '100%', maxWidth: 260 }}>
          {keys.map((k, i) => {
            if (k === '') return <span key={i} />;
            if (k === 'del') {
              return (
                <button key={i} onClick={back} aria-label="Delete" style={keyBtnStyle(true)}>
                  <Delete size={22} color="rgba(255,255,255,0.7)" />
                </button>
              );
            }
            return (
              <button key={i} onClick={() => press(k)} style={keyBtnStyle(false)}>
                {k}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, paddingBottom: 34, fontSize: 12, color: 'rgba(255,255,255,0.18)' }}>
        Prototype only · Usability testing
      </div>

      <style>{`
        @keyframes pinShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .pin-shake { animation: pinShake 350ms ease; }
      `}</style>
    </div>
  );
}

function keyBtnStyle(isAction) {
  return {
    aspectRatio: '1 / 1',
    display: 'grid', placeItems: 'center',
    background: isAction ? 'transparent' : 'rgba(255,255,255,0.06)',
    border: isAction ? 'none' : '1px solid rgba(255,255,255,0.08)',
    borderRadius: '50%',
    color: '#fff', fontFamily: 'var(--font-sans)',
    fontSize: 24, fontWeight: 500,
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
  };
}
