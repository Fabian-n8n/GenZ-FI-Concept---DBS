'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StatusBar from '@/components/shell/StatusBar';
import AppBar from '@/components/shell/AppBar';
import Donut from '@/components/primitives/Donut';
import { ChevronRight } from 'lucide-react';
import { FRAMEWORKS } from '@/lib/frameworks';

function FrameworksContent() {
  const router = useRouter();
  const params = useSearchParams();
  const mode = params.get('mode') || 'setup'; // setup | change
  const currentFw = params.get('current') || 'warren';

  const isChange = mode === 'change';

  return (
    <div className="screen screen--white">
      <StatusBar dark />
      <AppBar
        title={isChange ? 'Change framework' : 'Framework selection'}
        onBack={() => router.back()}
      />
      <div className="scroll" style={{ padding: '0 20px 24px' }}>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: '14px 0 20px', lineHeight: 1.55 }}>
          {isChange
            ? 'Switch to a different split. Your change applies from your next payday.'
            : 'Choose how your S$4,200 gets split each payday. You can change this anytime.'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FRAMEWORKS.map(fw => {
            const isCurrent = isChange && fw.id === currentFw;
            return (
              <div key={fw.id} className="fw-card">
                <div className="fw-card__body">
                  <Donut segments={fw.segments} size={64} thickness={11} gap={4} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span className="fw-card__name">{fw.name}</span>
                      {isCurrent && <span className="chip chip--ok" style={{ fontSize: 11, padding: '3px 8px' }}>Current</span>}
                    </div>
                    <div className="fw-card__by">{fw.by}</div>
                    <div className="fw-card__split">{fw.split}</div>
                  </div>
                </div>
                <div className="fw-card__footer">
                  <button
                    className="fw-card__select"
                    disabled={isCurrent}
                    onClick={() => !isCurrent && router.push(`/payday/frameworks/preview?fw=${fw.id}&mode=${mode}`)}
                  >
                    {isCurrent ? 'Selected' : isChange ? 'Switch to this' : 'Select framework'}
                  </button>
                  <button
                    className="fw-card__more"
                    onClick={() => router.push(`/payday/frameworks/theory?fw=${fw.id}&mode=${mode}`)}
                  >
                    Read more <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function FrameworksPage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <FrameworksContent />
    </Suspense>
  );
}
