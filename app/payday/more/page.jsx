'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import BottomNav from '@/components/shell/BottomNav';
import { Bell, Search, MessageSquare, Lock } from 'lucide-react';

const QUICK_TILES = [
  { icon: '📋', label: 'Transaction History' },
  { icon: '📄', label: 'eDocuments' },
  { icon: '🚫', label: 'Replace/Block Card' },
  { icon: '⚙️', label: 'Personalise Your App' },
  { icon: '🌿', label: 'LiveBetter' },
  { icon: '👤', label: 'Update Particulars' },
  { icon: 'LOCK', label: 'Payday Lock', isNew: true, active: true },
];

const APPLY_TILES = [
  { icon: '🏦', label: 'Starter Packs' },
  { icon: '💳', label: 'Cards' },
  { icon: '🏧', label: 'Deposit Accounts' },
  { icon: '💰', label: 'Personal Loan' },
  { icon: '💳', label: 'Cashline' },
  { icon: '📦', label: 'Pay By Instalments' },
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
          {QUICK_TILES.map(tile => (
            <button
              key={tile.label}
              className="more-tile"
              onClick={tile.active ? () => router.push(`/payday/manage?fw=${fwId}&locked=${locked ? 1 : 0}`) : undefined}
            >
              <span className="more-tile__icon">
                {tile.icon === 'LOCK'
                  ? <Lock size={26} strokeWidth={1.6} color="var(--dbs-gray-700)" />
                  : <span style={{ fontSize: 22 }}>{tile.icon}</span>}
                {tile.isNew && (
                  <span style={{ position: 'absolute', top: -9, right: -12, background: 'var(--color-brand)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 999 }}>NEW</span>
                )}
              </span>
              <span className="more-tile__label">{tile.label}</span>
            </button>
          ))}
        </Section>

        <Section label="APPLY">
          {APPLY_TILES.map(tile => (
            <button key={tile.label} className="more-tile">
              <span className="more-tile__icon"><span style={{ fontSize: 22 }}>{tile.icon}</span></span>
              <span className="more-tile__label">{tile.label}</span>
            </button>
          ))}
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
