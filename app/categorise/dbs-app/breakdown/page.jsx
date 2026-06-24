'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Donut from '@/components/primitives/Donut';
import CatIcon from '@/components/primitives/CatIcon';
import Drawer from '@/components/primitives/Drawer';
import { KeyLoadingOverlay } from '@/components/shell/KeyLoader';
import { ChevronLeft, ArrowUp, ArrowDown, Lock, Pencil } from 'lucide-react';
import { CATS, PICK_OPTIONS } from '@/lib/categories';
import { LAST_MONTH, fmtMoney, txnsForRange, budgetForRange } from '@/lib/transactions';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';

function fmtSGD(n) {
  return 'S$' + n.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function CategoryPicker({ selected, onPick }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Change category</div>
      <div style={{ fontSize: 14.5, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>
        Pick a new category — your breakdown updates instantly.
      </div>
      {PICK_OPTIONS.map((opt) => (
        <button key={opt} className="cat-option" onClick={() => onPick(opt)}>
          <span className="cat-icon" style={{ width: 38, height: 38, background: CATS[opt]?.color || '#aaa', color: CATS[opt]?.ink || '#fff' }}>
            <CatIcon cat={opt} size={19} />
          </span>
          <span style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{opt}</span>
          {selected === opt && <svg width="20" height="20" fill="none" stroke="var(--color-brand)" strokeWidth="2.4" strokeLinecap="round"><path d="M4 10l5 5L16 6" /></svg>}
        </button>
      ))}
    </div>
  );
}

function BreakdownContent() {
  const router = useRouter();
  const params = useSearchParams();
  const range = params.get('range') || '1m';
  const rangeLabel = { today: 'Today', '1m': 'Last 1 month', '3m': 'Last 3 months', range: 'Custom range' }[range] || 'Last 1 month';

  const [tab, setTab] = useState(params.get('tab') === 'transactions' ? 'transactions' : 'spending');
  const [txns, setTxns] = useState(() => txnsForRange(range));
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const budget = budgetForRange(range);

  // Everything below is DERIVED from txns, so recategorising updates it all.
  const derived = useMemo(() => {
    const totals = {};
    let total = 0;
    for (const t of txns) {
      totals[t.cat] = (totals[t.cat] || 0) + t.amount;
      total += t.amount;
    }
    const cats = Object.keys(totals).sort((a, b) => totals[b] - totals[a]);
    const used = Math.round((total / budget) * 100);
    const left = Math.max(0, budget - total);

    const rows = cats.map((c) => {
      const last = LAST_MONTH[c];
      const delta = last ? Math.round(((totals[c] - last) / last) * 100) : null;
      return {
        cat: c, amount: totals[c],
        share: total ? Math.round((totals[c] / total) * 100) : 0,
        delta, dollarDelta: last != null ? totals[c] - last : 0,
      };
    });

    const rising = rows.filter((r) => r.dollarDelta > 0).sort((a, b) => b.dollarDelta - a.dollarDelta);
    const top = rising[0] || [...rows].sort((a, b) => Math.abs(b.delta || 0) - Math.abs(a.delta || 0))[0];

    return { totals, total, cats, used, left, rows, top };
  }, [txns, budget]);

  // Group transactions by date for the list view (preserves order).
  const groups = useMemo(() => {
    const out = [];
    for (const t of txns) {
      let g = out.find((x) => x.date === t.date);
      if (!g) { g = { date: t.date, today: t.today, items: [] }; out.push(g); }
      g.items.push(t);
    }
    return out;
  }, [txns]);

  const editing = txns.find((t) => t.id === editId);

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 44px', alignItems: 'center', padding: 'env(safe-area-inset-top) 8px 0', minHeight: 'calc(52px + env(safe-area-inset-top))', background: '#fff', flexShrink: 0 }}>
        <button className="icon-btn" aria-label="Back" onClick={() => { setNextRouteDirection(-1); router.push(`/categorise/dbs-app/history`); }}><ChevronLeft size={26} /></button>
        <span />
        <span />
      </div>

      <div style={{ textAlign: 'center', padding: '0 20px 14px', flexShrink: 0 }}>
        <div style={{ fontSize: 16.5, fontWeight: 800, color: 'var(--text-primary)' }}>My Account 273-484844-2 SGD</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 3 }}>{rangeLabel}</div>
      </div>

      <div className="tabs">
        <button className={`tab${tab === 'spending' ? ' active' : ''}`} onClick={() => setTab('spending')}>Spending</button>
        <button className={`tab${tab === 'transactions' ? ' active' : ''}`} onClick={() => setTab('transactions')}>Transactions</button>
      </div>

      {tab === 'spending' ? (
        <div className="scroll" style={{ padding: '22px 20px 28px' }}>
          {/* Donut with live total in the centre */}
          <div style={{ position: 'relative', width: 196, margin: '2px auto 6px' }}>
            <Donut segments={derived.cats.map((c) => ({ pct: (derived.totals[c] / derived.total) * 100, color: CATS[c]?.color || '#ccc' }))} size={196} thickness={16} gap={3} />
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', fontWeight: 600 }}>Total spent</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.4px', marginTop: 1 }}>{fmtSGD(derived.total)}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 18px', margin: '10px 0 18px' }}>
            {derived.cats.map((c) => (
              <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: CATS[c]?.color }} /> {c} <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>{Math.round((derived.totals[c] / derived.total) * 100)}%</span>
              </span>
            ))}
          </div>

          {/* "So what" — subtle amber warning note (not shown for the light "today" view) */}
          {range !== 'today' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#fff8ec', border: '1px solid #f3e2bf',
              borderRadius: 'var(--radius-tile)', padding: '10px 12px', marginBottom: 16,
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                background: 'var(--dbs-amber-500)', color: '#fff',
                display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 800, lineHeight: 1,
              }} aria-hidden="true">!</span>
              <span style={{ fontSize: 12.5, lineHeight: 1.45, color: 'var(--text-secondary)' }}>
                At this rate, your <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{derived.top?.cat?.toLowerCase()}</span> spending could go over budget before payday.
              </span>
            </div>
          )}

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
                <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.15 }}>{fmtSGD(derived.total)}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums', marginTop: 1 }}>of {fmtSGD(budget)}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 2, height: 14, borderRadius: 7, overflow: 'hidden', background: 'var(--dbs-gray-100)', marginTop: 14 }}>
              {derived.cats.map((c) => (
                <div key={c} title={`${c} ${fmtSGD(derived.totals[c])}`} style={{ width: `${(derived.totals[c] / budget) * 100}%`, background: CATS[c]?.color }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              <span><strong style={{ color: 'var(--text-primary)' }}>{derived.used}%</strong> used</span>
              <span><strong style={{ color: 'var(--color-positive)' }}>{fmtSGD(derived.left)}</strong> left</span>
            </div>

            <div style={{ marginTop: 4 }}>
              {derived.rows.map((r) => {
                const up = (r.delta ?? 0) > 0;
                const flat = r.delta === 0 || r.delta == null;
                return (
                  <div key={r.cat} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: CATS[r.cat]?.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.cat}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 1 }}>{r.share}% of spend</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{fmtSGD(r.amount)}</div>
                      {range === '1m' && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 2, marginTop: 2,
                          fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums',
                          color: flat ? 'var(--text-tertiary)' : up ? 'var(--color-brand)' : 'var(--color-positive)',
                        }}>
                          {!flat && (up ? <ArrowUp size={11} strokeWidth={2.6} /> : <ArrowDown size={11} strokeWidth={2.6} />)}
                          {flat ? 'No change' : `${Math.abs(r.delta)}% vs last mo.`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="scroll" style={{ padding: '14px 20px 28px' }}>
          <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)', lineHeight: 1.45, marginBottom: 4 }}>
            Tap any transaction to recategorise it — your Spending breakdown updates automatically.
          </div>
          {groups.map((g) => (
            <div key={g.date}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-tertiary)', padding: '18px 0 6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {g.today ? 'Today · ' + g.date : g.date}
              </div>
              {g.items.map((txn) => (
                <button key={txn.id} className="txn-row" onClick={() => setEditId(txn.id)}>
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
                  <Pencil size={15} color="var(--text-tertiary)" style={{ flexShrink: 0, marginLeft: 4 }} />
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Drawer onClose={() => setEditId(null)}>
          <CategoryPicker
            selected={editing.cat}
            onPick={(c) => {
              const id = editing.id;
              setEditId(null);
              setLoading(true);
              setTimeout(() => {
                setTxns((prev) => prev.map((t) => (t.id === id ? { ...t, cat: c } : t)));
                setLoading(false);
              }, 650);
            }}
          />
        </Drawer>
      )}

      {loading && <KeyLoadingOverlay />}
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
