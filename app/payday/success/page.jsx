'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AppBar from '@/components/shell/AppBar';
import Illo from '@/components/primitives/Illo';
import { Check, Lock, History, Wallet, BarChart3 } from 'lucide-react';
import { fwById } from '@/lib/frameworks';

function SuccessContent() {
  const router = useRouter();
  const params = useSearchParams();
  const variant = params.get('variant') || 'locked';
  const fwId = params.get('fw') || 'warren';
  const pauseMode = params.get('pauseMode') || '';
  const pauseLabel = params.get('pauseLabel') || '';
  const fw = fwById(fwId);

  const pausedSub = pauseLabel ? `Unlocked for ${pauseLabel}` : 'Released back to your spending balance';
  const pausedBack = pauseLabel
    ? (pauseMode === 'duration'
        ? `Payday Lock switches back on automatically in ${pauseLabel}.`
        : `Payday Lock switches back on after ${pauseLabel}.`)
    : "We'll stop auto-locking your salary each payday.";

  const cfg = {
    locked: {
      illo: 'protect',
      over: 'Savings locked',
      amt: fw.lockAmount,
      amtSize: null,
      sub: 'Locked until your next payday',
      cta: 'Back to home',
      bullets: [
        ['faceid', "You'll need Face ID to access this amount."],
        ['wallet', 'Your spending balance is available as usual.'],
        ['history', 'Next payday, this framework runs again automatically.'],
      ],
      next: `/payday/home?fw=${fwId}&locked=1`,
    },
    updated: {
      illo: 'updated',
      over: 'Framework updated',
      amt: fw.name,
      amtSize: 30,
      sub: fw.split,
      cta: 'Done',
      bullets: [
        ['history', 'Your new split takes effect from your next payday.'],
        ['lock', 'Your current locked savings stay locked until then.'],
        ['chart', 'You can change your framework again anytime.'],
      ],
      next: `/payday/manage?fw=${fwId}&locked=1`,
    },
    off: {
      illo: 'unlock',
      over: pauseLabel ? 'Payday Lock paused' : 'Payday Lock turned off',
      amt: fw.lockAmount,
      amtSize: null,
      sub: pausedSub,
      cta: 'Done',
      bullets: [
        ['wallet', 'Your locked savings are available to spend now.'],
        ['history', pausedBack],
        ['faceid', 'No action needed — we can re-lock it later.'],
      ],
      next: `/payday/home?fw=${fwId}&locked=0`,
    },
  }[variant] || null;

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <AppBar title="Payday Lock" onBack={() => router.push(`/payday/manage?fw=${fwId}&locked=${variant === 'off' ? 0 : 1}`)} />

      <div className="success-hero" style={{ background: 'linear-gradient(160deg, #ff1a1a 0%, #a30000 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Illo name={cfg.illo} size={192} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.88, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{cfg.over}</div>
        <div className="success-amount" style={cfg.amtSize ? { fontSize: cfg.amtSize } : undefined}>{cfg.amt}</div>
        <div style={{ fontSize: 15, opacity: 0.9, marginTop: 4 }}>{cfg.sub}</div>
      </div>

      <div className="scroll" style={{ padding: '24px 20px' }}>
        <div className="overline" style={{ marginBottom: 8 }}>What this means</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {cfg.bullets.map(([icon, text]) => {
            const IconCmp = {
              faceid: Lock,
              wallet: Wallet,
              history: History,
              lock: Lock,
              chart: BarChart3,
            }[icon] || Check;

            return (
              <div key={text} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--dbs-red-50)', color: 'var(--color-brand)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <IconCmp size={14} />
                </span>
                <span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="screen-footer screen-footer--plain">
        <button className="btn-primary" onClick={() => router.push(cfg.next)}>
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
