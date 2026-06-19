'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import BottomNav from '@/components/shell/BottomNav';
import { Bell, Search, MessageSquare } from 'lucide-react';

// ── DBS-style outline SVG icons ──────────────────────────────────────────────
// 26×26 viewBox 0 0 24 24, stroke 1.6, rounded caps/joins, fill none
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

function IcoHistory() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <path d="M9 5a2 2 0 012-2h2a2 2 0 012 2H9z" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}

function IcoDocuments() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function IcoBlockCard() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <circle cx="16" cy="15.5" r="3" />
      <line x1="14.1" y1="17.4" x2="17.9" y2="13.6" />
    </svg>
  );
}

function IcoPersonalise() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <line x1="4" y1="6" x2="7" y2="6" />
      <circle cx="9" cy="6" r="2" />
      <line x1="11" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="13" y2="12" />
      <circle cx="15" cy="12" r="2" />
      <line x1="17" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="9" y2="18" />
      <circle cx="11" cy="18" r="2" />
      <line x1="13" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function IcoLeaf() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <path d="M6.5 17.5C5 14 5.5 9.5 10 7s10.5-4 11-4c0 0-2.5 7-7.5 9.5S6.5 17.5 6.5 17.5z" />
      <path d="M6 18c1.5-4 4.5-7 11-11" />
    </svg>
  );
}

function IcoUpdateProfile() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <circle cx="10" cy="8" r="4" />
      <path d="M3 21v-2a7 7 0 017-7h1.5" />
      <path d="M17.5 18l1.8-1.8a1.3 1.3 0 011.9 1.9L17 22.5l-2.5.5.5-2.5z" />
    </svg>
  );
}

function IcoLock() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
      <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IcoGift() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="3" y="8" width="18" height="13" rx="1.5" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="12" y1="8" x2="12" y2="21" />
      <path d="M12 8H9.5a2.5 2.5 0 010-5c2 0 2.5 5 2.5 5z" />
      <path d="M12 8h2.5a2.5 2.5 0 000-5c-2 0-2.5 5-2.5 5z" />
    </svg>
  );
}

function IcoCard() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="10" y2="15" />
      <circle cx="17" cy="15" r="2" />
    </svg>
  );
}

function IcoBank() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <path d="M3 9l9-7 9 7" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="5" y1="9" x2="5" y2="18" />
      <line x1="10" y1="9" x2="10" y2="18" />
      <line x1="14" y1="9" x2="14" y2="18" />
      <line x1="19" y1="9" x2="19" y2="18" />
      <line x1="3" y1="18" x2="21" y2="18" />
      <line x1="2" y1="21" x2="22" y2="21" />
    </svg>
  );
}

function IcoLoan() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <circle cx="12" cy="10" r="4" />
      <path d="M12 8v4M10.5 9h3a1 1 0 010 2h-2a1 1 0 000 2h3" />
      <path d="M4 21v-1a8 8 0 0116 0v1" />
    </svg>
  );
}

function IcoCashline() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V9M12 15v1.5" />
      <path d="M9.5 10h4a1.5 1.5 0 010 3h-3a1.5 1.5 0 000 3H15" />
    </svg>
  );
}

function IcoInstalments() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...P}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="4" x2="8" y2="2" />
      <line x1="16" y1="4" x2="16" y2="2" />
      <path d="M7 14h10M7 17.5h6" />
      <path d="M15 14v3.5" />
    </svg>
  );
}

// ── Tile data ─────────────────────────────────────────────────────────────────
const QUICK_TILES = [
  { icon: IcoHistory,     label: 'Transaction History' },
  { icon: IcoDocuments,   label: 'eDocuments' },
  { icon: IcoBlockCard,   label: 'Replace/Block Card' },
  { icon: IcoPersonalise, label: 'Personalise Your App' },
  { icon: IcoLeaf,        label: 'LiveBetter' },
  { icon: IcoUpdateProfile, label: 'Update Particulars' },
  { icon: IcoLock,        label: 'Payday Lock', isNew: true, active: true },
];

const APPLY_TILES = [
  { icon: IcoGift,        label: 'Starter Packs' },
  { icon: IcoCard,        label: 'Cards' },
  { icon: IcoBank,        label: 'Deposit Accounts' },
  { icon: IcoLoan,        label: 'Personal Loan' },
  { icon: IcoCashline,    label: 'Cashline' },
  { icon: IcoInstalments, label: 'Pay By Instalments' },
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
          <span style={{ position: 'absolute', top: -5, right: -6, minWidth: 16, height: 16, borderRadius: 999, background: 'var(--color-brand)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center', padding: '0 4px', border: '1.5px solid #fff' }}>8</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--dbs-gray-100)', borderRadius: 999, padding: '9px 14px', color: 'var(--text-tertiary)' }}>
          <Search size={18} /><span style={{ fontSize: 15 }}>Search 'more'</span>
        </div>
        <MessageSquare size={24} color="var(--text-primary)" />
      </div>

      <div className="scroll" style={{ paddingBottom: 8 }}>
        <Section label="QUICK ACCESS">
          {QUICK_TILES.map(tile => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.label}
                className="more-tile"
                onClick={tile.active ? () => router.push(`/payday/manage?fw=${fwId}&locked=${locked ? 1 : 0}`) : undefined}
              >
                <span className="more-tile__icon" style={{ color: 'var(--dbs-gray-700)' }}>
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
                <span className="more-tile__icon" style={{ color: 'var(--dbs-gray-700)' }}>
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
