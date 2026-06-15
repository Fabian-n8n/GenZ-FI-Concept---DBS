'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StatusBar from '@/components/shell/StatusBar';
import { Lock, Check, Unlock } from 'lucide-react';
import { fwById } from '@/lib/frameworks';

const VARIANTS = {
  locked: {
    icon: Lock,
    over: 'Savings locked',
    sub: 'Locked until your next payday',
    cta: 'Back to home',
    bullets: [
      { icon: '🔐', text: "You'll need Face ID to access this amount." },
      { icon: '💳', text: 'Your spending balance is available as usual.' },
      { icon: '🔄', text: 'Next payday, this framework runs again automatically.' },
    ],
  },
  updated: {
    icon: Check,
    over: 'Framework updated',
    sub: null,
    cta: 'Done',
    bullets: [
      { icon: '📅', text: 'Your new split takes effect from your next payday.' },
      { icon: '🔒', text: 'Your current locked savings stay locked until then.' },
      { icon: '🔧', text: 'You can change your framework again anytime.' },
    ],
  },
  off: {
    icon: Unlock,
    over: 'Payday Lock turned off',
    sub: 'Released back to your spending balance',
    cta: 'Back to home',
    bullets: [
      { icon: '💰', text: 'Your savings are now available to spend.' },
      { icon: '🔕', text: "We'll stop auto-locking your salary each payday." },
      { icon: '🔁', text: 'You can switch Payday Lock back on anytime.' },
    ],
  },
};

function SuccessContent() {
  const router = useRouter();
  const params = useSearchParams();
  const variant = params.get('variant') || 'locked';
  const fwId = params.get('fw') || 'warren';
  const fw = fwById(fwId);
  const cfg = VARIANTS[variant] || VARIANTS.locked;
  const IconCmp = cfg.icon;

  const amt = variant === 'updated' ? fw.name : fw.lockAmount;

  return (
    <div className="screen screen--white">
      <StatusBar />

      <div className="success-hero">
        <div className="success-badge">
          <IconCmp size={38} color="#fff" />
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.8, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{cfg.over}</div>
        <div className="success-amount" style={variant === 'updated' ? { fontSize: 28 } : {}}>
          {amt}
        </div>
        {cfg.sub && <div style={{ fontSize: 15, opacity: 0.9, marginTop: 4 }}>{cfg.sub}</div>}
      </div>

      <div className="scroll" style={{ padding: '24px 20px' }}>
        <div className="overline" style={{ marginBottom: 8 }}>What this means</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {cfg.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{b.icon}</span>
              <span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="screen-footer screen-footer--plain">
        <button className="btn-primary" onClick={() => {
          if (variant === 'locked') router.push(`/payday/home?fw=${fwId}&locked=1`);
          else if (variant === 'updated') router.push(`/payday/manage?fw=${fwId}&locked=1`);
          else router.push('/payday/home');
        }}>
          {cfg.cta}
        </button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <SuccessContent />
    </Suspense>
  );
}
