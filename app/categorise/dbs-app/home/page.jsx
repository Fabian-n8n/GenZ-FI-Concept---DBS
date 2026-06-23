'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/shell/BottomNav';
import Insights from '@/components/shell/Insights';
import { Bell, Eye, Settings, FileSearch, ArrowLeftRight, ReceiptText, CreditCard, FileText } from 'lucide-react';

export default function CatHomeScreen() {
  const router = useRouter();
  const [tab, setTab] = useState('accounts');

  const shortcuts = [
    { Icon: FileSearch,    label: 'Transaction History', onClick: () => router.push('/categorise/dbs-app/history') },
    { Icon: ArrowLeftRight, label: 'Transfer Money' },
    { Icon: ReceiptText,   label: 'Pay Bills' },
    { Icon: CreditCard,    label: 'Pay Credit Card Bill' },
    { Icon: FileText,      label: 'eDocuments' },
  ];

  return (
    <div className="screen">
      <div className="hero-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0 14px' }}>
          <div style={{ display: 'flex', gap: 18 }}>
            <Bell size={23} color="#fff" />
            <Eye size={23} color="#fff" />
          </div>
          <span style={{ border: '1.5px solid rgba(255,255,255,0.75)', borderRadius: 999, padding: '5px 12px', fontSize: 11.5, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>LOG OUT</span>
        </div>
        <div style={{ fontSize: 25, fontWeight: 600, lineHeight: 1.15 }}>Welcome to</div>
        <div style={{ fontSize: 25, fontWeight: 800, color: '#1a1f24', letterSpacing: '-0.3px', lineHeight: 1.1 }}>digibank</div>
        <div style={{ fontSize: 12, opacity: 0.82, marginTop: 12 }}>Last login: 21 May 2026, 09:10am (SG)</div>
      </div>

      <div className="scroll" style={{ marginTop: -12 }}>
        <div style={{ background: '#fff', borderRadius: '16px 16px 0 0', paddingTop: 18, minHeight: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 20px 14px' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Smart Shortcuts</span>
            <Settings size={17} color="var(--color-brand)" />
          </div>
          <div className="shortcuts">
            {shortcuts.map(({ Icon, label, onClick }) => (
              <div key={label} className="shortcut" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
                <span className="shortcut__icon"><Icon size={24} strokeWidth={1.8} /></span>
                <span className="shortcut__label">{label}</span>
              </div>
            ))}
          </div>

          <div className="tabs" style={{ marginTop: 14 }}>
            <button className={`tab${tab === 'accounts' ? ' active' : ''}`} onClick={() => setTab('accounts')}>Accounts</button>
            <button className={`tab${tab === 'insights' ? ' active' : ''}`} onClick={() => setTab('insights')}>Insights</button>
          </div>

          <div style={{ padding: '18px 20px 28px' }}>
            {tab === 'accounts' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Your Net Worth</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>Value</span>
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.6px', fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>$100.00</div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 26 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Deposits</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>Balance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid var(--color-border)', marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 4, height: 30, borderRadius: 2, background: 'var(--dbs-amber-500)' }} />
                    <div>
                      <div style={{ fontSize: 15.5, fontWeight: 700 }}>My Account</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>253-434144-3</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 19, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginRight: 4 }}>SGD</span>100.00
                  </div>
                </div>
              </>
            ) : (
              <Insights />
            )}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNav={() => {}} />
    </div>
  );
}
