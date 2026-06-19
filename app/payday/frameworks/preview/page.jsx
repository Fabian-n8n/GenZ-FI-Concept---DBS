'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AppBar from '@/components/shell/AppBar';
import Donut from '@/components/primitives/Donut';
import Drawer from '@/components/primitives/Drawer';
import { fwById, INCOME } from '@/lib/frameworks';

function PreviewContent() {
  const router = useRouter();
  const params = useSearchParams();
  const fwId = params.get('fw') || 'warren';
  const mode = params.get('mode') || 'setup';
  const fw = fwById(fwId);
  const [showLock, setShowLock] = useState(false);

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <AppBar title={fw.name} onBack={() => router.back()} />

      <div className="scroll" style={{ paddingBottom: 12 }}>
        <div style={{ textAlign: 'center', paddingTop: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-tertiary)' }}>Your monthly income</div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.6px', fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{INCOME}</div>
        </div>

        <div style={{ padding: '20px 0 22px', display: 'flex', justifyContent: 'center' }}>
          <Donut segments={fw.segments} size={188} />
        </div>

        <div style={{ padding: '0 20px' }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Your monthly split</div>
          {fw.rows.map(r => (
            <div key={r.name} className="alloc-row">
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: r.color, flexShrink: 0, marginTop: 3 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap', marginLeft: 8 }}>{r.pct}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{r.desc}</div>
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{r.amount}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="screen-footer">
        <button className="btn-primary" onClick={() => {
          if (mode === 'change') {
            router.push(`/payday/faceid?next=success&variant=updated&fw=${fwId}`);
          } else {
            setShowLock(true);
          }
        }}>
          {mode === 'change' ? 'Update my plan' : 'Continue'}
        </button>
      </div>

      {/* Lock prompt drawer */}
      {showLock && (
        <Drawer onClose={() => setShowLock(false)}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-tertiary)' }}>Amount to lock</div>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{fw.lockAmount}</div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
              <Donut segments={fw.segments} size={120} />
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Lock your savings until next payday?</div>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 24 }}>
            Once locked, you'll need Face ID to access this amount. Your spending balance stays available as usual.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn-primary" onClick={() => router.push(`/payday/success?fw=${fwId}&variant=locked`)}>Lock my savings</button>
            <button className="btn-ghost" onClick={() => { setShowLock(false); router.push(`/payday/home?fw=${fwId}&locked=0`); }}>Not now</button>
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <PreviewContent />
    </Suspense>
  );
}
