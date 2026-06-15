'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/shell/StatusBar';
import AppBar from '@/components/shell/AppBar';
import { Wallet, ChevronDown, Check, ChevronRight } from 'lucide-react';

const RANGES = [
  { id: 'today', label: 'Today' },
  { id: '1m',    label: '1 Month' },
  { id: '3m',    label: '3 Months' },
  { id: 'range', label: 'Range', chevron: true },
];

export default function TransactionHistoryPage() {
  const router = useRouter();
  const [sel, setSel] = useState('today');

  return (
    <div className="screen" style={{ background: 'var(--dbs-gray-50)' }}>
      <StatusBar dark />
      <AppBar title="Transaction History" onBack={() => router.push('/categorise/dbs-app/home')} />

      <div className="scroll" style={{ paddingBottom: 16 }}>
        <div style={{ height: 12 }} />

        {/* Account picker */}
        <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: '#fff', border: 'none', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '14px 20px', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
          <Wallet size={22} color="var(--text-secondary)" />
          <span style={{ flex: 1, textAlign: 'left', fontSize: 15.5, fontWeight: 600, color: 'var(--text-primary)' }}>Deposit Account</span>
          <ChevronDown size={20} color="var(--text-tertiary)" />
        </button>

        <div className="overline" style={{ padding: '22px 20px 8px' }}>Time range</div>

        <div style={{ background: '#fff', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          {RANGES.map(r => (
            <button key={r.id}
              onClick={() => setSel(r.id)}
              style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '15px 20px', background: 'none', border: 'none', borderBottom: '1px solid var(--color-border)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
            >
              <span style={{ flex: 1, textAlign: 'left', fontSize: 15.5, color: 'var(--text-primary)', fontWeight: sel === r.id ? 600 : 400 }}>{r.label}</span>
              {sel === r.id
                ? <Check size={21} strokeWidth={2.4} color="var(--color-brand)" />
                : r.chevron ? <ChevronRight size={19} color="var(--text-tertiary)" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="screen-footer screen-footer--plain">
        <button className="btn-primary" onClick={() => router.push(`/categorise/dbs-app/breakdown?range=${sel}`)}>
          SHOW
        </button>
      </div>
    </div>
  );
}
