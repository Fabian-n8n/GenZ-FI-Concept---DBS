'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Donut from '@/components/primitives/Donut';
import CatIcon from '@/components/primitives/CatIcon';
import { X, Search, Pencil, ChevronRight } from 'lucide-react';
import { CATS, BREAKDOWN_SEGS } from '@/lib/categories';
import { TXN_GROUPS, RANGE_DAYS, fmtMoney } from '@/lib/transactions';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';

function BreakdownContent() {
  const router = useRouter();
  const params = useSearchParams();
  const range = params.get('range') || '1m';

  const segments = BREAKDOWN_SEGS.map((s) => ({ pct: s.pct, color: CATS[s.cat]?.color || '#ccc' }));
  const daysCount = RANGE_DAYS[range] || TXN_GROUPS.length;
  const groups = TXN_GROUPS.slice(0, daysCount);
  const rangeLabel = { today: 'Today', '1m': 'Last 1 month', '3m': 'Last 3 months', range: 'Custom range' }[range] || '';

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 44px', alignItems: 'center', padding: 'env(safe-area-inset-top) 8px 0', minHeight: 'calc(52px + env(safe-area-inset-top))', background: '#fff', flexShrink: 0 }}>
        <button className="icon-btn" onClick={() => { setNextRouteDirection(-1); router.push('/categorise/dbs-app/home'); }}><X size={22} /></button>
        <span />
        <button className="icon-btn"><Search size={21} /></button>
      </div>

      <div style={{ textAlign: 'center', padding: '0 20px 14px', flexShrink: 0, borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: 16.5, fontWeight: 800, color: 'var(--text-primary)' }}>My Account 273-484844-2 SGD</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 3 }}>{rangeLabel}</div>
      </div>

      <div className="scroll" style={{ padding: '22px 20px 28px' }}>
        <div style={{ position: 'relative', width: 196, margin: '2px auto 6px' }}>
          <Donut segments={segments} size={196} thickness={16} gap={3} />
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <button
              onClick={() => router.push('/categorise/dbs-app/edit-categories')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1.5px solid var(--color-border)', borderRadius: 999, padding: '7px 14px', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-sm)' }}
            >
              <Pencil size={13} /> Edit Category
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 18px', margin: '10px 0 4px' }}>
          {BREAKDOWN_SEGS.map((s) => (
            <span key={s.cat} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: CATS[s.cat]?.color }} /> {s.cat} <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>{s.pct}%</span>
            </span>
          ))}
        </div>

        {groups.map((g) => (
            <div key={g.date}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-tertiary)', padding: '18px 0 6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {g.today ? 'Today · ' + g.date : g.date}
            </div>
            {g.items.map((txn) => (
              <button key={txn.id} className="txn-row" onClick={() => router.push(`/categorise/dbs-app/transaction?id=${txn.id}`)}>
                <span className="cat-icon" style={{ background: CATS[txn.cat]?.color, color: CATS[txn.cat]?.ink, width: 38, height: 38 }}>
                  <CatIcon cat={txn.cat} size={19} />
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="txn-name">{txn.name}</div>
                  <div className="txn-cat">
                    <span className="txn-dot" style={{ background: CATS[txn.cat]?.color }} />
                    {txn.cat}
                  </div>
                </div>
                <div className="txn-amt">SGD {fmtMoney(txn.amount)}</div>
                <ChevronRight size={17} color="var(--text-tertiary)" style={{ flexShrink: 0, marginLeft: 2 }} />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BreakdownPage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <BreakdownContent />
    </Suspense>
  );
}
