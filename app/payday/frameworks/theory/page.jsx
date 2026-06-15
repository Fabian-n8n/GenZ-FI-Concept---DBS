'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StatusBar from '@/components/shell/StatusBar';
import AppBar from '@/components/shell/AppBar';
import Donut from '@/components/primitives/Donut';
import { fwById, FRAMEWORKS } from '@/lib/frameworks';

function TheoryContent() {
  const router = useRouter();
  const params = useSearchParams();
  const fwId = params.get('fw') || 'warren';
  const mode = params.get('mode') || 'setup';
  const fw = fwById(fwId);

  return (
    <div className="screen screen--white">
      <StatusBar dark />
      <AppBar title={fw.tag} onBack={() => router.back()} />

      <div className="scroll" style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)', marginTop: 16, marginBottom: 4 }}>
          The {fw.name} rule
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 24 }}>Updated 27 June 2026 · 3 min read</div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 28px' }}>
          <Donut segments={fw.segments} size={168} label={fw.segments[0].pct + '%'} sublabel="to savings" />
        </div>

        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 20 }}>
          {fw.blurb}
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>How the split works</h3>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16 }}>
          The moment your salary lands, <strong>{fw.segments[0].pct}%</strong> moves straight into a locked savings pocket. <strong>{fw.segments[1].pct}%</strong> stays available for everyday spending — food, transport, the fun stuff. The final <strong>{fw.segments[2].pct}%</strong> is set aside to invest for growth.
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>Why locking matters</h3>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 8 }}>
          Money you can see is money you'll spend. By moving savings out of reach until your next payday, you remove the daily temptation and let consistency do the compounding.
        </p>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          It's not about earning more — it's about keeping more of what you already earn.
        </p>
      </div>

      <div className="screen-footer screen-footer--plain" style={{ padding: '12px 20px calc(12px + env(safe-area-inset-bottom))' }}>
        <button className="btn-primary"
          onClick={() => router.push(`/payday/frameworks/preview?fw=${fwId}&mode=${mode}`)}>
          {mode === 'change' ? `Switch to ${fw.name}` : `Select ${fw.name} framework`}
        </button>
      </div>
    </div>
  );
}

export default function TheoryPage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <TheoryContent />
    </Suspense>
  );
}
