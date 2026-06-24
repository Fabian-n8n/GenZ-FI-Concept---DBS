'use client';
// Full DBS app open sequence used before any flow's authenticated home:
//   loader splash → pre-login homepage → login screen → biometric loading screen.
// Reused by Flow 1 (/payday) and Flow 2B (/categorise/dbs-app).
import { useState, useEffect } from 'react';
import DbsLogin from './DbsLogin';
import { KeyLoadingOverlay } from './KeyLoader';
import FaceIdIsland from './FaceIdIsland';
import {
  Bell, MessageSquare, Eye, ChevronLeft, ChevronRight, LogIn, Smartphone,
  Send, Globe, QrCode, LayoutGrid,
} from 'lucide-react';

export default function DbsLoginFlow({ onComplete, onExit }) {
  const [stage, setStage] = useState('loader'); // loader | prelogin | login | loading

  useEffect(() => {
    if (stage !== 'loader') return;
    const t = setTimeout(() => setStage('prelogin'), 1500);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'loading') return;
    const t = setTimeout(onComplete, 1650);
    return () => clearTimeout(t);
  }, [onComplete, stage]);

  if (stage === 'loader')   return <Loader />;
  if (stage === 'prelogin') return <PreLogin onLogin={() => setStage('login')} onExit={onExit} />;
  if (stage === 'login') return <LoginStage onLogin={() => setStage('loading')} onBack={() => setStage('prelogin')} />;
  return <LoadingStage />;
}

/* ── Stage 1: loader / splash — DBS master-brand logo, small & centered ── */
function Loader() {
  return (
    <div style={{
      width: '100%', height: '100dvh', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      <img src="/assets/logo/dbs-master-logo.png" alt="DBS — Live more, Bank less"
        style={{ width: 230, height: 'auto', display: 'block' }} />
      {/* Dimmed overlay with the centered key loader, over the brand splash */}
      <KeyLoadingOverlay />
    </div>
  );
}

/* ── Stage 2: pre-login homepage ── */
const QUICK = [
  { Icon: LogIn,      label: 'Log In',   primary: true },
  { Icon: Smartphone, label: 'Digital\nToken' },
  { Icon: Send,       label: 'PayNow' },
  { Icon: Globe,      label: 'Overseas\nTransfer' },
  { Icon: QrCode,     label: 'Scan & Pay' },
  { Icon: LayoutGrid, label: 'Apply & More\nServices' },
];

function PreLogin({ onLogin }) {
  return (
    <div style={{
      width: '100%', height: '100dvh', background: '#f4f5f7',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Hero fills all space above the ad; content is vertically centered */}
      <div style={{
        flex: 1, position: 'relative',
        backgroundImage: 'url(/assets/images/prelogin-hero.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column',
        paddingTop: 'calc(env(safe-area-inset-top) + 50px)',
      }}>
        {/* Scrim for legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />

        {/* Top bar */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px' }}>
          <div style={{ position: 'relative' }}>
            <Bell size={22} color="#fff" />
            <span style={{ position: 'absolute', top: -5, right: -6, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8, background: '#FF3333', color: '#fff', fontSize: 9.5, fontWeight: 800, display: 'grid', placeItems: 'center' }}>7</span>
          </div>
          <MessageSquare size={22} color="#fff" />
        </div>

        {/* Security alert banner */}
        <div style={{ position: 'relative', margin: '14px 14px 0', background: 'rgba(0,0,0,0.5)', borderRadius: 6, padding: '12px 14px' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.95)', lineHeight: 1.5 }}>
            Stay vigilant this travel season. Watch out for phishing scams and avoid clicking on suspicious social media links. Only download apps from official app stores.
          </div>
        </div>

        {/* Centered content: peek balance + quick actions */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 34, padding: '0 8px' }}>
          {/* Peek balance */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <ChevronLeft size={20} color="rgba(255,255,255,0.7)" />
            <div style={{ textAlign: 'center', lineHeight: 1.3 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#fff' }}>Tap and hold to</div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>PEEK BALANCE</div>
            </div>
            <ChevronRight size={20} color="rgba(255,255,255,0.7)" />
          </div>

          {/* Quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 26 }}>
            {QUICK.map(({ Icon, label, primary }) => (
              <button
                key={label}
                onClick={primary ? onLogin : undefined}
                style={{ background: 'none', border: 'none', cursor: primary ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, padding: 0, WebkitTapHighlightColor: 'transparent' }}
              >
                <Icon size={27} color="#fff" strokeWidth={1.6} />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#fff', textAlign: 'center', lineHeight: 1.25, whiteSpace: 'pre-line' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ad banner pinned to the bottom */}
      <div style={{ background: '#f4f5f7', padding: 14, flexShrink: 0 }}>
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ position: 'relative', height: 150, background: 'linear-gradient(135deg, #0a3a6b 0%, #1576c9 55%, #4aa3e0 100%)', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '0.3px' }}>digibank</span>
            <img
              src="/assets/images/digibank-promo.jpg"
              alt="DBS digibanking"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <div style={{ padding: '13px 16px' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1f24' }}>This is DBS digibanking</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3, lineHeight: 1.45 }}>Branchless, paperless, effortless. And waitless.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stage 3: login screen with a centered lock loader over a dark overlay ── */
function LoginStage({ onLogin, onBack }) {
  return (
    <DbsLogin onClose={onBack} onLogin={onLogin} />
  );
}

/* ── Stage 4: logging-in loader — Face ID island (scan → green check) at the
   top, brand splash dimmed + centered key loader below ── */
function LoadingStage() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 780);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: '#fff', fontFamily: 'var(--font-sans)' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/assets/logo/dbs-master-logo.png" alt="DBS — Live more, Bank less"
          style={{ width: 230, height: 'auto', display: 'block' }} />
      </div>
      <KeyLoadingOverlay />
      {/* Face ID biometric island, above the dim, near the top */}
      <div style={{ position: 'absolute', top: 'calc(env(safe-area-inset-top) + 60px)', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 90 }}>
        <FaceIdIsland done={done} size={120} />
      </div>
    </div>
  );
}
