'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AppBar from '@/components/shell/AppBar';
import Donut from '@/components/primitives/Donut';
import Switch from '@/components/primitives/Switch';
import Drawer from '@/components/primitives/Drawer';
import { KeyLoadingOverlay } from '@/components/shell/KeyLoader';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';
import { Check, ChevronRight, HelpCircle, Lock, Unlock } from 'lucide-react';
import { fwById } from '@/lib/frameworks';

// Segmented-control pause drawer — matching PauseLockDrawer from the design handoff.
function PauseLockDrawer({ onContinue, onCancel }) {
  const [mode, setSeg] = useState('duration');
  const [sel, setSel] = useState(null);

  const OPTS = {
    duration: [
      { id: '24h', label: '24 hours' },
      { id: '3d',  label: '3 days'   },
      { id: '7d',  label: '7 days'   },
    ],
    transactions: [
      { id: '1tx', label: '1 transaction'  },
      { id: '3tx', label: '3 transactions' },
      { id: '7tx', label: '7 transactions' },
    ],
  };

  function switchSeg(m) { setSeg(m); setSel(null); }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>
          Pause Payday Lock
        </div>
        <div style={{ fontSize: 14.5, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
          Choose how long to keep your savings unlocked. The lock turns back on automatically after.
        </div>
      </div>

      {/* Segmented control */}
      <div style={{
        display: 'flex', background: 'var(--dbs-gray-100)', borderRadius: 8,
        padding: 3, gap: 2, marginBottom: 16,
      }}>
        {['duration', 'transactions'].map(m => (
          <button key={m} onClick={() => switchSeg(m)} style={{
            flex: 1, padding: '9px 0', borderRadius: 6,
            background: mode === m ? '#fff' : 'transparent',
            border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
            color: mode === m ? 'var(--text-primary)' : 'var(--text-secondary)',
            boxShadow: mode === m ? 'var(--shadow-xs)' : 'none',
            transition: 'background 150ms, color 150ms',
          }}>
            {m === 'duration' ? 'By duration' : 'By transactions'}
          </button>
        ))}
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {OPTS[mode].map(o => {
          const isSel = sel?.id === o.id;
          return (
            <button key={o.id} onClick={() => setSel({ ...o, mode })} style={{
              display: 'flex', alignItems: 'center',
              padding: '15px 16px',
              background: isSel ? 'var(--dbs-red-50)' : '#fff',
              border: 'none',
              borderTop: '1px solid var(--color-border)',
              cursor: 'pointer', fontFamily: 'var(--font-sans)',
              transition: 'background 120ms',
            }}>
              <span style={{ flex: 1, textAlign: 'left', fontSize: 15.5, fontWeight: isSel ? 700 : 400, color: 'var(--text-primary)' }}>
                {o.label}
              </span>
              {isSel && (
                <svg width="21" height="21" fill="none" stroke="var(--color-brand)" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M4 10.5l5 5L17 6" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button
          className="btn-primary"
          disabled={!sel}
          onClick={() => sel && onContinue(sel)}
          style={{ opacity: sel ? 1 : 0.45, transition: 'opacity 150ms' }}
        >
          Continue
        </button>
        <button
          onClick={onCancel}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--color-brand)', padding: '12px 0', textAlign: 'center', width: '100%' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function ManageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const fwId   = params.get('fw')     || 'warren';
  const locked = params.get('locked') !== '0';
  // Over-spend entry (from the blocked Shopee payment): show the exceeded
  // Overview for a beat, then auto-swipe to Settings so the user can switch off.
  const over   = params.get('over') === '1';
  // `act` = "this entry needs action" — only the first arrival (from the blocked
  // Shopee payment) auto-swipes to Settings. After switching framework we keep
  // `over` (so the high spend persists) but drop `act`, landing on Overview so
  // the user can see whether the new framework's budget resolves the over-spend.
  const act    = params.get('act') === '1';
  const fw     = fwById(fwId);

  // Return to wherever the user opened Payday Lock from (defaults to Home).
  const lockedQ  = locked ? 1 : 0;
  const from     = params.get('from');
  const backHref =
    from === 'more'      ? `/payday/more?fw=${fwId}&locked=${lockedQ}` :
    from === 'breakdown' ? `/categorise/dbs-app/breakdown?range=1m` :
    `/payday/home?fw=${fwId}&locked=${lockedQ}`;
  const goBack = () => { setNextRouteDirection(-1); router.push(backHref); };
  const [showPause, setShowPause] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(over ? 'overview' : (params.get('tab') === 'settings' ? 'settings' : 'overview'));

  useEffect(() => {
    if (!act) return;
    const t = setTimeout(() => setTab('settings'), 1150);
    return () => clearTimeout(t);
  }, [act]);

  // Brief key-loader on the same screen before navigating (no separate screen).
  const go = (href) => { setShowPause(false); setLoading(true); setTimeout(() => router.push(href), 1100); };

  // Spending-so-far vs the framework's Spending budget (rows[1]). In the
  // over-spend flow the spend is pushed past the budget to warn the user (red).
  const fmtSGD2     = (n) => 'S$' + n.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const spendBudget = parseFloat(fw.rows[1].amount.replace(/[^0-9.]/g, '')) || 0;
  // End-of-cycle spend. In the over-spend scenario it's a FIXED amount (the
  // money is already spent, regardless of framework) so switching to a plan with
  // a bigger Spending budget can resolve the over-spend — exceeded is derived.
  const spendSpent  = over ? 1275.38 : 1185.0;
  const exceeded    = spendSpent > spendBudget;
  const spendPct    = spendBudget ? Math.round((spendSpent / spendBudget) * 100) : 0;
  const spendOver   = Math.max(0, spendSpent - spendBudget);
  const spendLeft   = Math.max(0, spendBudget - spendSpent);

  // Switch calls onChange(!on) — turningOn = true means user is switching lock ON.
  // Branch on the argument, not the URL param (which can be stale or missing).
  function handleToggle(turningOn) {
    if (turningOn) {
      go(`/payday/success?variant=locked&fw=${fwId}`);
    } else {
      setShowPause(true);
    }
  }

  function handlePauseContinue(sel) {
    // Brief key-loader, then success with pause info encoded in URL
    go(`/payday/success?variant=off&fw=${fwId}&pauseMode=${sel.mode}&pauseLabel=${encodeURIComponent(sel.label)}`);
  }

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <AppBar title="Payday Lock" onBack={goBack} />

      <div className="tabs">
        <button className={`tab${tab === 'overview' ? ' active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
        <button className={`tab${tab === 'settings' ? ' active' : ''}`} onClick={() => setTab('settings')}>Settings</button>
      </div>

      <div className="scroll" style={{ padding: '12px 20px 24px', overflowX: 'hidden' }}>
        <div key={tab} className="mg-pane">
        {tab === 'overview' ? (
          <>
            {/* Locked amount card */}
            <div className="card" style={{ padding: '22px 20px 20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-tertiary)' }}>{locked ? 'Currently locked' : 'Currently unlocked'}</div>
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{fw.lockAmount}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 5, lineHeight: 1.45 }}>
                  This is your <strong style={{ color: 'var(--text-primary)' }}>Savings</strong> — the {fw.rows[0].pct} portion of your payday, {locked ? 'moved out of reach until your next salary.' : 'now available to spend. Lock it back anytime.'}
                </div>
                <div style={{ margin: '18px 0 16px', display: 'flex', justifyContent: 'center', opacity: locked ? 1 : 0.5 }}>
                  <Donut segments={fw.segments} size={132} />
                </div>
              </div>

              {/* Legend — what each colour means */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {fw.rows.map((r, i) => (
                  <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 2px', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ width: 11, height: 11, borderRadius: 3, background: r.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</span>
                    {i === 0 && locked && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10.5, fontWeight: 700, color: 'var(--color-brand)', background: 'var(--dbs-red-50)', borderRadius: 4, padding: '2px 6px' }}>
                        <Lock size={10} /> Locked
                      </span>
                    )}
                    <span style={{ flex: 1 }} />
                    <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{r.pct}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', minWidth: 84, textAlign: 'right' }}>{r.amount}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                {locked ? (
                  <span className="chip chip--ok"><Check size={13} /> Active · unlocks 27 Jul 2026</span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, padding: '5px 11px', borderRadius: 999, background: 'var(--dbs-gray-100)', color: 'var(--text-secondary)' }}>
                    <Unlock size={13} /> Off · auto-locks next payday
                  </span>
                )}
              </div>
            </div>

            {/* Spending so far vs budget — turns red when over the limit */}
            <div className="card" style={{ padding: 16, marginTop: 12, ...(exceeded ? { boxShadow: 'var(--shadow-card), inset 0 0 0 1px var(--dbs-red-200, #f5b5bb)' } : {}) }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: exceeded ? 'var(--color-brand)' : fw.rows[1].color, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Spending this cycle</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: exceeded ? 'var(--color-brand)' : 'var(--text-primary)' }}>
                  {fmtSGD2(spendSpent)}<span style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}> / {fmtSGD2(spendBudget)}</span>
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'var(--dbs-gray-100)', marginTop: 12, overflow: 'hidden' }}>
                <div style={{ width: Math.min(100, spendPct) + '%', height: '100%', borderRadius: 999, background: exceeded ? 'var(--color-brand)' : fw.rows[1].color, transition: 'width 400ms var(--ease-out)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: exceeded ? 'var(--color-brand)' : 'var(--text-tertiary)', fontWeight: exceeded ? 700 : 400 }}>
                <span>{spendPct}% used</span>
                <span>{exceeded ? `${fmtSGD2(spendOver)} over budget` : `${fmtSGD2(spendLeft)} left`}</span>
              </div>
              {exceeded && (
                <div style={{ marginTop: 12, display: 'flex', gap: 9, background: 'var(--dbs-red-50)', borderRadius: 6, padding: '10px 12px' }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: 'var(--color-brand)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800, lineHeight: 1 }} aria-hidden="true">!</span>
                  <span style={{ fontSize: 12.5, lineHeight: 1.45, color: 'var(--dbs-gray-700)' }}>
                    You've gone over your spending budget this cycle — that's why the Shopee payment was blocked.
                  </span>
                </div>
              )}
            </div>

            {/* What Payday Lock means + learn more */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--text-primary)' }}>What is Payday Lock?</strong> The moment your salary lands, your savings are automatically moved into a locked pocket — out of sight and out of reach until your next payday. Your spending and invest portions stay available as usual.
              </div>
              <button
                className="btn-secondary"
                style={{ marginTop: 14 }}
                onClick={() => router.push(`/payday/frameworks/theory?fw=${fwId}&readonly=1`)}
              >
                Learn more about this framework
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Active framework */}
            <div className="eyebrow" style={{ marginTop: 4, marginBottom: 10 }}>Active framework</div>
            <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15.5, fontWeight: 700 }}>{fw.tag} · {fw.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 3 }}>{fw.split}</div>
              </div>
              <button
                onClick={() => router.push(`/payday/frameworks?mode=change&current=${fwId}${over ? '&over=1' : ''}`)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-brand)', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Change <ChevronRight size={15} />
              </button>
            </div>

            {/* Toggle */}
            <div className="card" style={{ padding: 16, marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15.5, fontWeight: 700 }}>Payday Lock</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>Auto-lock savings every payday</div>
              </div>
              <Switch on={locked} onChange={handleToggle} />
            </div>

            {/* Info banner */}
            <div style={{ marginTop: 16, display: 'flex', gap: 10, background: 'var(--dbs-red-50)', borderRadius: 4, padding: '14px 16px' }}>
              <HelpCircle size={18} color="var(--color-brand)" style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--dbs-gray-700)' }}>
                Changes apply from your <strong>next payday</strong>. Your current lock stays active until <strong>27 July</strong>.
              </div>
            </div>

            <p style={{ fontSize: 12.5, color: 'var(--text-tertiary)', lineHeight: 1.5, marginTop: 16, textAlign: 'center' }}>
              Switching framework or turning off Payday Lock needs Face ID confirmation.
            </p>
          </>
        )}
        </div>
      </div>

      {showPause && (
        <Drawer onClose={() => setShowPause(false)}>
          <PauseLockDrawer
            onContinue={handlePauseContinue}
            onCancel={() => setShowPause(false)}
          />
        </Drawer>
      )}

      {loading && <KeyLoadingOverlay />}

      <style>{`
        @keyframes mgPaneIn { from { transform: translateX(36px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .mg-pane { animation: mgPaneIn 380ms cubic-bezier(0.32, 0.72, 0, 1); }
      `}</style>
    </div>
  );
}

export default function ManagePage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <ManageContent />
    </Suspense>
  );
}
