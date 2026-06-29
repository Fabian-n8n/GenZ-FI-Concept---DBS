'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import BottomNav from '@/components/shell/BottomNav';
import { Bell, Search, MessageSquare, Shield, ChevronRight, Pencil, RotateCcw } from 'lucide-react';

// ── DBS-style outline SVG icons ──────────────────────────────────────────────
// 26×26 viewBox 0 0 24 24, stroke 1.6, rounded caps/joins, fill none
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

// Transaction History — receipt with a magnifier (containing $) over it
function IcoHistory() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="4" y="3" width="11" height="16" rx="1.5" />
      <line x1="7" y1="7" x2="12" y2="7" />
      <line x1="7" y1="10" x2="10" y2="10" />
      <circle cx="15.5" cy="15" r="4" />
      <line x1="18.4" y1="17.9" x2="21" y2="20.5" />
      <path d="M15.5 13.2v3.6M14.4 14.1h1.7a.65.65 0 010 1.3h-1.2a.65.65 0 000 1.3h1.7" />
    </svg>
  );
}

// eDocuments — document with a folded corner
function IcoDocuments() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <path d="M13 3H7a1.5 1.5 0 00-1.5 1.5v15A1.5 1.5 0 007 21h10a1.5 1.5 0 001.5-1.5V8.5z" />
      <path d="M13 3v5.5h5.5" />
      <line x1="8.5" y1="13" x2="15.5" y2="13" />
      <line x1="8.5" y1="16.5" x2="13" y2="16.5" />
    </svg>
  );
}

// Replace/Block Card — card with a prohibition sign over the corner
function IcoBlockCard() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="3" y="5" width="15" height="11" rx="1.5" />
      <line x1="3" y1="9" x2="18" y2="9" />
      <circle cx="17" cy="16" r="4" />
      <line x1="14.2" y1="18.8" x2="19.8" y2="13.2" />
    </svg>
  );
}

// Personalise Your App — 2×3 grid of dots
function IcoPersonalise() {
  const dots = [
    [8, 9.5], [12, 9.5], [16, 9.5],
    [8, 14.5], [12, 14.5], [16, 14.5],
  ];
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.35" fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}

// LiveBetter — three-leaf sprout
function IcoLeaf() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <path d="M12 21v-8" />
      <path d="M12 13c-1-2.6-3.6-4.2-6.2-4 .2 2.9 2.8 4.7 6.2 4z" />
      <path d="M12 13c1-2.6 3.6-4.2 6.2-4-.2 2.9-2.8 4.7-6.2 4z" />
      <path d="M12 13c0-3 1.3-5.6 0-8.2-1.3 2.6 0 5.2 0 8.2z" />
    </svg>
  );
}

// Update Particulars — person with an @ symbol
function IcoUpdateProfile() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <circle cx="9.5" cy="8" r="3.3" />
      <path d="M4 19.5v-1C4 15.6 6.5 13.5 9.5 13.5c1.1 0 2.1.3 3 .8" />
      <circle cx="17" cy="9" r="1.6" />
      <path d="M20.6 9a3.6 3.6 0 10-1.3 2.85" />
    </svg>
  );
}

// Lock with digiVault — closed padlock
function IcoVault() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="5" y="10.5" width="14" height="10.5" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3" />
      <circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
      <line x1="12" y1="15.8" x2="12" y2="17.8" />
    </svg>
  );
}

// Payday Lock — padlock with a $ (distinguishes it from digiVault)
function IcoLock() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="5" y="10.5" width="14" height="10.5" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3" />
      <path d="M12 13.4v4.6M10.6 14.4h2.1a.95.95 0 010 1.9h-1.5a.95.95 0 000 1.9h2.1" />
    </svg>
  );
}

// Starter Packs — classical bank building with columns
function IcoBuilding() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <path d="M3.5 9L12 3.5 20.5 9" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="6" y1="9" x2="6" y2="17" />
      <line x1="10" y1="9" x2="10" y2="17" />
      <line x1="14" y1="9" x2="14" y2="17" />
      <line x1="18" y1="9" x2="18" y2="17" />
      <line x1="4.5" y1="17" x2="19.5" y2="17" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  );
}

// Cards — single card with chip
function IcoCard() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <rect x="6" y="9.5" width="3.6" height="2.8" rx="0.6" />
      <line x1="12.5" y1="10" x2="18" y2="10" />
      <line x1="12.5" y1="13" x2="18" y2="13" />
      <line x1="6" y1="15" x2="12" y2="15" />
    </svg>
  );
}

// Deposit Accounts — two stacked cards
function IcoStackedCards() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="2.5" y="6.5" width="15" height="10" rx="1.5" />
      <rect x="6.5" y="10" width="15" height="10" rx="1.5" />
      <line x1="6.5" y1="13.5" x2="21.5" y2="13.5" />
    </svg>
  );
}

// Personal Loan / Cashline / Pay By Instalments — card with a $
function IcoChequeDollar() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M8 9.4v5.2M6.6 10.6h2.2a1 1 0 010 2H7.2a1 1 0 000 2h2.2" />
      <line x1="13" y1="11" x2="18" y2="11" />
      <line x1="13" y1="14.5" x2="16.5" y2="14.5" />
    </svg>
  );
}

// ── Tile data ─────────────────────────────────────────────────────────────────
const QUICK_TILES = [
  { icon: IcoHistory,       label: 'Transaction History' },
  { icon: IcoDocuments,     label: 'eDocuments' },
  { icon: IcoBlockCard,     label: 'Replace/Block Card' },
  { icon: IcoPersonalise,   label: 'Personalise Your App' },
  { icon: IcoLeaf,          label: 'LiveBetter' },
  { icon: IcoUpdateProfile, label: 'Update Particulars' },
  { icon: IcoVault,         label: 'Lock with digiVault', isNew: true },
  { icon: IcoLock,          label: 'Payday Lock', isNew: true, active: true },
];

const APPLY_TILES = [
  { icon: IcoBuilding,     label: 'Starter Packs' },
  { icon: IcoCard,         label: 'Cards' },
  { icon: IcoStackedCards, label: 'Deposit Accounts' },
  { icon: IcoChequeDollar, label: 'Personal Loan' },
  { icon: IcoChequeDollar, label: 'Cashline' },
  { icon: IcoChequeDollar, label: 'Pay By Instalments' },
];

function Section({ label, children }) {
  return (
    <div>
      <div style={{ background: 'var(--dbs-gray-50)', padding: '9px 20px', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', color: 'var(--text-secondary)' }}>{label}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', rowGap: 22, columnGap: 8, padding: '22px 20px 6px' }}>
        {children}
      </div>
    </div>
  );
}

function MoreContent() {
  const router = useRouter();
  const params = useSearchParams();
  const locked = params.get('locked') === '1';
  const fwId = params.get('fw') || 'warren';

  return (
    <div className="screen screen--white">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 'calc(env(safe-area-inset-top) + 2px) 16px 12px', background: '#fff', flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          <Bell size={24} color="var(--text-primary)" />
          <span style={{ position: 'absolute', top: -5, right: -6, minWidth: 16, height: 16, borderRadius: 999, background: 'var(--color-brand)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center', padding: '0 4px', border: '1.5px solid #fff' }}>7</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--dbs-gray-100)', borderRadius: 999, padding: '9px 14px', color: 'var(--text-tertiary)' }}>
          <Search size={18} /><span style={{ fontSize: 15 }}>Search 'more'</span>
        </div>
        <MessageSquare size={24} color="var(--text-primary)" />
      </div>

      <div className="scroll" style={{ paddingBottom: 8 }}>
        {/* Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px 14px', background: '#fff' }}>
          <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#eef1f4', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 20, height: 20, borderRadius: '50%', background: '#2b3440' }} />
              <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 36, height: 24, borderRadius: '18px 18px 0 0', background: '#3b6fe0' }} />
            </div>
            <div style={{ position: 'absolute', right: -2, bottom: -2, width: 20, height: 20, borderRadius: '50%', background: '#fff', border: '1px solid var(--color-border)', display: 'grid', placeItems: 'center' }}>
              <Pencil size={11} color="var(--text-secondary)" />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25 }}>FABIAN WONG LIANG JUN (HUANG LIANGJUN)</div>
            <button
              onClick={() => router.push('/payday')}
              style={{ marginTop: 9, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--color-brand)', color: '#fff', border: 'none', borderRadius: 999, padding: '6px 14px', fontSize: 12.5, fontWeight: 700, fontFamily: 'var(--font-sans)', cursor: 'pointer' }}
            >
              <RotateCcw size={13} /> LOG OUT
            </button>
          </div>
        </div>

        {/* Security Checkup */}
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: '#fff', border: 'none', borderTop: '1px solid var(--color-border)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)' }}>
          <span style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid var(--color-border)', display: 'grid', placeItems: 'center', color: 'var(--dbs-gray-600)', flexShrink: 0 }}>
            <Shield size={20} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Security Checkup</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 1 }}>Easy ways to secure your account</div>
          </div>
          <ChevronRight size={18} color="var(--text-tertiary)" />
        </button>

        <Section label="QUICK ACCESS">
          {QUICK_TILES.map(tile => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.label}
                className="more-tile"
                onClick={tile.active ? () => router.push(`/payday/manage?fw=${fwId}&locked=${locked ? 1 : 0}&from=more`) : undefined}
              >
                <span className="more-tile__icon" style={{ color: 'var(--dbs-gray-600)' }}>
                  <Icon />
                  {tile.isNew && (
                    <span style={{ position: 'absolute', top: -9, right: -12, background: 'var(--color-brand)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 999 }}>NEW</span>
                  )}
                </span>
                <span className="more-tile__label">{tile.label}</span>
              </button>
            );
          })}
        </Section>

        <Section label="APPLY">
          {APPLY_TILES.map(tile => {
            const Icon = tile.icon;
            return (
              <button key={tile.label} className="more-tile">
                <span className="more-tile__icon" style={{ color: 'var(--dbs-gray-600)' }}>
                  <Icon />
                </span>
                <span className="more-tile__label">{tile.label}</span>
              </button>
            );
          })}
        </Section>
      </div>

      <BottomNav active="more" onNav={id => id === 'home' && router.push(`/payday/home?fw=${fwId}&locked=${locked ? 1 : 0}`)} />
    </div>
  );
}

export default function MorePage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <MoreContent />
    </Suspense>
  );
}
