'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import LockLoader from '@/components/shell/LockLoader';

function FaceIdContent() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const t = setTimeout(() => {
      const next = params.get('next');

      if (next === 'success') {
        // Pause/turn-off flow from manage page
        const variant    = params.get('variant')    || 'off';
        const fw         = params.get('fw')         || 'warren';
        const pauseMode  = params.get('pauseMode')  || '';
        const pauseLabel = params.get('pauseLabel') || '';
        router.push(`/payday/success?variant=${variant}&fw=${fw}&pauseMode=${pauseMode}&pauseLabel=${encodeURIComponent(pauseLabel)}`);

      } else if (next === 'frameworks') {
        // Change-framework flow triggered from manage page
        const mode    = params.get('mode')    || 'change';
        const current = params.get('current') || 'warren';
        router.push(`/payday/frameworks?mode=${mode}&current=${current}`);

      } else {
        // Default: initial login after payday notification
        router.push('/payday/home?setup=1');
      }
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen" style={{ background: 'var(--dbs-navy-900)', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      <div style={{ position: 'absolute', top: 'calc(env(safe-area-inset-top) + 44px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 40, height: 40, borderRadius: 10 }} />
        <span style={{ color: '#fff', fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px' }}>digibank</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginTop: 40 }}>
        <LockLoader size={84} />

        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px' }}>Verifying it's you</div>
          <div style={{ fontSize: 14, opacity: 0.7, marginTop: 6 }}>Securely logging you in…</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Tap anywhere to continue</div>
      </div>
    </div>
  );
}

export default function FaceIdPage() {
  return (
    <Suspense fallback={<div className="screen" style={{ background: 'var(--dbs-navy-900)' }} />}>
      <FaceIdContent />
    </Suspense>
  );
}
