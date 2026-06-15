'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import BottomNav from '@/components/shell/BottomNav';
import Donut from '@/components/primitives/Donut';
import Drawer from '@/components/primitives/Drawer';
import { Bell, Eye, Lock, ChevronDown, ChevronRight, BarChart2, TrendingUp, Settings } from 'lucide-react';
import { fwById, INCOME_NUM } from '@/lib/frameworks';

function fmtSGD(n) {
  return n.toLocaleString('en-SG', { minimumFractionDigits: 2 });
}

function HomeContent() {
  const router = useRouter();
  const params = useSearchParams();
  const setupParam = params.get('setup');
  const lockedParam = params.get('locked');

  const fwId = params.get('fw') || 'warren';
  const locked = lockedParam === '1';

  const [tab, setTab] = useState('accounts');
  const [showSetup, setShowSetup] = useState(setupParam === '1');

  const fw = fwById(fwId);
  const savings = fw.lockAmtNum;
  const available = locked ? fmtSGD(INCOME_NUM - savings) : fmtSGD(INCOME_NUM);

  const lockSegs = [
    { pct: 76, color: 'var(--dbs-red-500)' },
    { pct: 24, color: 'var(--dbs-amber-500)' },
  ];

  const SHORTCUTS = [
    { icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>, label: 'Transaction History' },
    { icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24"><path d="M9 14l-4-4 4-4M15 10H5M15 10l4 4-4 4"/></svg>, label: 'Bill Payment' },
    { icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, label: 'eStatement' },
    { icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/></svg>, label: 'Local Transfer' },
    { icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24"><path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"/><path d="M8 12h8M12 8l4 4-4 4"/></svg>, label: 'PayNow' },
  ];

  return (
    <div className="screen" style={{ position: 'relative' }}>
      {/* Hero */}
      <div className="hero-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0 16px' }}>
          <div style={{ display: 'flex', gap: 18 }}>
            <Bell size={23} color="#fff" />
            <Eye size={23} color="#fff" />
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ border: '1.5px solid rgba(255,255,255,0.75)', borderRadius: 999, padding: '5px 12px', fontSize: 11.5, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>LOG OUT</span>
          </div>
        </div>
        <div style={{ fontSize: 25, fontWeight: 600, lineHeight: 1.15 }}>Welcome to</div>
        <div style={{ fontSize: 25, fontWeight: 800, color: '#1a1f24', letterSpacing: '-0.3px', lineHeight: 1.1 }}>digibank</div>
        <div style={{ fontSize: 13, opacity: 0.82, marginTop: 10 }}>Last login: 27 Jun 2026, 09:10am (SG)</div>
      </div>

      <div className="scroll" style={{ marginTop: -12 }}>
        <div style={{ background: '#fff', borderRadius: '16px 16px 0 0', paddingTop: 18, minHeight: '100%' }}>
          {/* Quick Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 20px 14px' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Quick Links</span>
            <Settings size={17} color="var(--color-brand)" />
          </div>
          <div className="shortcuts">
            {SHORTCUTS.map(s => (
              <div key={s.label} className="shortcut">
                <span className="shortcut__icon">{s.icon}</span>
                <span className="shortcut__label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="tabs" style={{ marginTop: 12 }}>
            <button className={`tab${tab === 'accounts' ? ' active' : ''}`} onClick={() => setTab('accounts')}>Accounts</button>
            <button className={`tab${tab === 'insights' ? ' active' : ''}`} onClick={() => setTab('insights')}>
              Insights{locked && <span style={{ display: 'inline-grid', placeItems: 'center', minWidth: 18, height: 18, borderRadius: 999, background: 'var(--dbs-gray-200)', color: 'var(--text-secondary)', fontSize: 11, fontWeight: 700, marginLeft: 4, verticalAlign: '1px', padding: '0 4px' }}>2</span>}
            </button>
          </div>

          <div style={{ padding: '6px 20px 24px' }}>
            {tab === 'accounts' ? (
              <>
                {locked && (
                  <div className="card" style={{ padding: 16, margin: '16px 0 6px', cursor: 'pointer', boxShadow: 'var(--shadow-card), inset 0 0 0 1px var(--dbs-red-100)' }}
                    onClick={() => router.push(`/payday/manage?fw=${fwId}&locked=1`)}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="chip chip--lock"><Lock size={13} /> Payday Lock active</span>
                      <ChevronRight size={18} color="var(--text-tertiary)" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                      <div>
                        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>Locked savings</div>
                        <div style={{ fontSize: 23, fontWeight: 800, fontVariantNumeric: 'tabular-nums', marginTop: 1 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginRight: 4 }}>SGD</span>
                          {fmtSGD(savings)}
                        </div>
                        <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 6 }}>{fw.name} · unlocks next payday</div>
                      </div>
                      <Donut segments={lockSegs} size={52} thickness={8} />
                    </div>
                  </div>
                )}

                {/* Account rows */}
                {[
                  { bar: 'var(--dbs-amber-500)', title: 'Savings Accounts', label: 'Available balance', amount: available, sub: locked ? `Excludes SGD ${fmtSGD(savings)} locked in your payday plan` : null },
                  { bar: 'var(--dbs-red-400)',   title: 'Credit Cards',     label: 'Outstanding balance', amount: '1,482.00' },
                  { bar: 'var(--dbs-navy-600)',  title: 'PayLah!',          label: 'Wallet balance',      amount: '10.00' },
                ].map(row => (
                  <div key={row.title} style={{ padding: '16px 0', borderTop: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 4, height: 18, borderRadius: 2, background: row.bar, flexShrink: 0 }} />
                        <span style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--text-primary)' }}>{row.title}</span>
                      </div>
                      <ChevronDown size={18} color="var(--text-tertiary)" />
                    </div>
                    <div style={{ textAlign: 'right', marginTop: 8 }}>
                      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{row.label}</div>
                      <div style={{ fontSize: 21, fontWeight: 800, fontVariantNumeric: 'tabular-nums', marginTop: 1 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-secondary)', marginRight: 4 }}>SGD</span>{row.amount}
                      </div>
                      {row.sub && <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 4 }}>{row.sub}</div>}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="card" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 4, background: 'var(--dbs-red-50)', display: 'grid', placeItems: 'center', color: 'var(--color-brand)', flexShrink: 0 }}>
                    <BarChart2 size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>You spent more than usual yesterday</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>SGD 304 above your daily average.</div>
                  </div>
                </div>
                <div className="card" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 4, background: 'var(--dbs-green-50)', display: 'grid', placeItems: 'center', color: 'var(--color-positive)', flexShrink: 0 }}>
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>You're on track to save SGD 3,200</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Your payday plan is working.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNav={id => id === 'more' && router.push('/payday/more')} />

      {/* Setup drawer */}
      {showSetup && (
        <Drawer onClose={() => setShowSetup(false)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--dbs-red-50)', display: 'grid', placeItems: 'center' }}>
              <img src="/assets/logo/dbs-mark-red.png" alt="DBS" style={{ width: 28, height: 28 }} />
            </div>
            <div className="overline" style={{ color: 'var(--color-brand)' }}>Payday plan</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Set up your payday plan</div>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 24 }}>
            Pick a framework to automatically split your salary into savings, spending and investments. Takes 30 seconds.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn-primary" onClick={() => router.push('/payday/frameworks')}>Choose framework</button>
            <button className="btn-ghost" onClick={() => setShowSetup(false)}>Maybe later</button>
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default function PaydayHomePage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <HomeContent />
    </Suspense>
  );
}
