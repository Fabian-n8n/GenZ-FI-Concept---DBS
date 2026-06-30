'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Quote } from 'lucide-react';
import AppBar from '@/components/shell/AppBar';
import Donut from '@/components/primitives/Donut';
import { fwById } from '@/lib/frameworks';

function TheoryContent() {
  const router = useRouter();
  const params = useSearchParams();
  const fwId = params.get('fw') || 'warren';
  const mode = params.get('mode') || 'setup';
  const readonly = params.get('readonly') === '1';
  const over = params.get('over') === '1';
  const overQ = over ? '&over=1' : '';
  const fw = fwById(fwId);
  const t = fw.theory;

  return (
    <div className="screen screen--white">
      <AppBar title={fw.tag} onBack={() => router.back()} />

      <div className="scroll" style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)', marginTop: 16, marginBottom: 4 }}>
          The {fw.name} framework
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 22 }}>{t.source} · {t.readTime}</div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 26px' }}>
          <Donut segments={fw.segments} size={168} label={fw.segments[0].pct + '%'} sublabel="to savings" />
        </div>

        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 22 }}>
          {fw.blurb}
        </p>

        {/* Pull quote */}
        <div style={{ position: 'relative', background: 'var(--dbs-red-50)', borderRadius: 'var(--radius-tile)', padding: '18px 18px 16px', marginBottom: 24 }}>
          <Quote size={18} color="var(--color-brand)" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, fontStyle: 'italic' }}>
            “{t.quote}”
          </div>
          {t.quoteBy && (
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 10 }}>— {t.quoteBy}</div>
          )}
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>How the split works</h3>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 22 }}>
          The moment your salary lands, <strong>{fw.segments[0].pct}%</strong> moves straight into a locked savings pocket. <strong>{fw.segments[1].pct}%</strong> stays available for everyday spending — food, transport, the fun stuff. The final <strong>{fw.segments[2].pct}%</strong> is set aside to invest for growth.
        </p>

        {t.sections.map((s) => (
          <div key={s.h}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>{s.h}</h3>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 22 }}>{s.p}</p>
          </div>
        ))}
      </div>

      {!readonly ? (
        <div className="screen-footer screen-footer--plain" style={{ padding: '12px 20px calc(12px + env(safe-area-inset-bottom))' }}>
          <button className="btn-primary"
            onClick={() => router.push(`/payday/frameworks/preview?fw=${fwId}&mode=${mode}${overQ}`)}>
            {mode === 'change' ? `Switch to ${fw.name}` : `Select ${fw.name} framework`}
          </button>
        </div>
      ) : (
        <div className="screen-footer screen-footer--plain" style={{ padding: '12px 20px calc(12px + env(safe-area-inset-bottom))' }}>
          <button className="btn-secondary"
            onClick={() => router.push(`/payday/frameworks?mode=change&current=${fwId}${overQ}`)}>
            Change framework
          </button>
        </div>
      )}
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
