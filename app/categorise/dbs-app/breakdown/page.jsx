'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Donut from '@/components/primitives/Donut';
import CatIcon from '@/components/primitives/CatIcon';
import { ArrowLeft, Search, Pencil, ChevronRight, ArrowUp, ArrowDown, Lock } from 'lucide-react';
import { CATS, BREAKDOWN_SEGS } from '@/lib/categories';
import { TXN_GROUPS, RANGE_DAYS, fmtMoney, CATEGORY_SPEND, SPENDING_BUDGET } from '@/lib/transactions';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';

function fmtSGD(n) {
  return 'S$' + n.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function SpendingInsight({ router }) {
  const totalSpent = CATEGORY_SPEND.reduce((s, c) => s + c.spent, 0);
  const usedPct = Math.round((totalSpent / SPENDING_BUDGET) * 100);
  const left = Math.max(0, SPENDING_BUDGET - totalSpent);

  // Headline for the "so what" callout — surface the biggest spending *increase*
  // (most actionable nudge); fall back to the biggest absolute mover if nothing rose.
  const movers = CATEGORY_SPEND.map((c) => ({
    ...c,
    delta: c.last ? Math.round(((c.spent - c.last) / c.last) * 100) : 0,
    dollarDelta: c.spent - (c.last ?? c.spent),
  }));
  const rising = movers.filter((c) => c.dollarDelta > 0).sort((a, b) => b.dollarDelta - a.dollarDelta);
  const top = rising[0] || [...movers].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0];

  return (
    <div style={{ marginTop: 6 }}>
      {/* "So what" — a single, subtle, predictive line */}
      <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--text-tertiary)', margin: '2px 2px 14px' }}>
        At this rate, your <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{top.cat.toLowerCase()}</span> spending could go over budget before payday.
      </div>

      {/* Spending vs locked budget */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-tile)', boxShadow: 'var(--shadow-card)', padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-primary)' }}>Spending this cycle</div>
            <button
              onClick={() => router.push('/payday/manage?fw=warren&locked=1')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, background: 'var(--dbs-gray-100)', border: 'none', borderRadius: 999, padding: '3px 9px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
            >
              <Lock size={11} /> from Payday Lock
            </button>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.15 }}>{fmtSGD(totalSpent)}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums', marginTop: 1 }}>of {fmtSGD(SPENDING_BUDGET)}</div>
          </div>
        </div>

        {/* Stacked bar — every category in its own colour, remainder is "left" */}
        <div style={{ display: 'flex', gap: 2, height: 14, borderRadius: 7, overflow: 'hidden', background: 'var(--dbs-gray-100)', marginTop: 14 }}>
          {CATEGORY_SPEND.map((c) => (
            <div key={c.cat} title={`${c.cat} ${fmtSGD(c.spent)}`} style={{ width: `${(c.spent / SPENDING_BUDGET) * 100}%`, background: CATS[c.cat]?.color }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span><strong style={{ color: 'var(--text-primary)' }}>{usedPct}%</strong> used</span>
          <span><strong style={{ color: 'var(--color-positive)' }}>{fmtSGD(left)}</strong> left</span>
        </div>

        {/* Per-category rows with month-on-month comparison */}
        <div style={{ marginTop: 4 }}>
          {CATEGORY_SPEND.map((c) => {
            const delta = c.last ? Math.round(((c.spent - c.last) / c.last) * 100) : 0;
            const up = delta > 0;
            const flat = delta === 0;
            const share = Math.round((c.spent / totalSpent) * 100);
            return (
              <div key={c.cat} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderTop: '1px solid var(--color-border)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: CATS[c.cat]?.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.cat}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 1 }}>{share}% of spend</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{fmtSGD(c.spent)}</div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 2, marginTop: 2,
                    fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums',
                    color: flat ? 'var(--text-tertiary)' : up ? 'var(--color-brand)' : 'var(--color-positive)',
                  }}>
                    {!flat && (up ? <ArrowUp size={11} strokeWidth={2.6} /> : <ArrowDown size={11} strokeWidth={2.6} />)}
                    {flat ? 'No change' : `${Math.abs(delta)}% vs last mo.`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
        <button className="icon-btn" aria-label="Back" onClick={() => { setNextRouteDirection(-1); router.push(`/categorise/dbs-app/history`); }}><ArrowLeft size={22} /></button>
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

        <SpendingInsight router={router} />

        <div style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--text-primary)', padding: '24px 0 0' }}>Transactions</div>

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
