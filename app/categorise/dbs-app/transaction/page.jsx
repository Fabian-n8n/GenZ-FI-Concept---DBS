'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AppBar from '@/components/shell/AppBar';
import Drawer from '@/components/primitives/Drawer';
import CatIcon from '@/components/primitives/CatIcon';
import { Pencil } from 'lucide-react';
import { CATS, PICK_OPTIONS } from '@/lib/categories';
import { TXN_GROUPS, fmtMoney } from '@/lib/transactions';

function CategoryPicker({ title, subtitle, options, selected, onPick }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14.5, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>{subtitle}</div>
      {options.map((opt) => (
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

function TransactionContent() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id') || 'txn1';

  const allTxns = TXN_GROUPS.flatMap((g) => g.items.map((t) => ({ ...t, date: g.date })));
  const original = allTxns.find((t) => t.id === id) || allTxns[0];

  const [txn, setTxn] = useState(original);
  const [showPicker, setShowPicker] = useState(false);

  const catInfo = CATS[txn.cat] || { color: '#aaa', ink: '#fff' };

  const DetailRow = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '15px 0', borderTop: '1px solid var(--color-border)' }}>
      <span style={{ fontSize: 14.5, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14.5, color: 'var(--text-primary)', fontWeight: 700, textAlign: 'right' }}>{value}</span>
    </div>
  );

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <AppBar title="Transaction Details" onBack={() => router.back()} />

      <div className="scroll" style={{ padding: '6px 20px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '18px 0 22px' }}>
          <span className="cat-icon" style={{ background: catInfo.color, color: catInfo.ink, width: 66, height: 66, borderRadius: 16 }}>
            <CatIcon cat={txn.cat} size={32} />
          </span>
          <div style={{ marginTop: 16, fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{txn.name}</div>
          <div style={{ marginTop: 8, fontSize: 34, fontWeight: 800, letterSpacing: '-0.6px', fontVariantNumeric: 'tabular-nums' }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-secondary)', marginRight: 5 }}>SGD</span>{fmtMoney(txn.amount)}
          </div>
        </div>

        <div>
          <DetailRow label="Category" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: catInfo.color }} /> {txn.cat}</span>} />
          <DetailRow label="Date" value={txn.date} />
          <DetailRow label="Account" value="273-484844-2 SGD" />
          <DetailRow label="Reference" value={'DBS' + (txn.name.replace(/[^A-Z0-9]/g, '').slice(0, 6) || 'TXN') + '26'} />
          <div style={{ borderTop: '1px solid var(--color-border)' }} />
        </div>
      </div>

      <div className="screen-footer">
        <button
          onClick={() => setShowPicker(true)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', minHeight: 44, padding: '0 20px', background: 'transparent', color: 'var(--color-brand)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, border: '1.5px solid var(--color-brand)', borderRadius: 4, cursor: 'pointer' }}
        >
          <Pencil size={18} /> Change Category
        </button>
      </div>

      {showPicker && (
        <Drawer onClose={() => setShowPicker(false)}>
          <CategoryPicker
            title="Change category"
            subtitle="Pick a new category for this transaction."
            options={PICK_OPTIONS}
            selected={txn.cat}
            onPick={(c) => {
              setTxn((prev) => ({ ...prev, cat: c }));
              setShowPicker(false);
            }}
          />
        </Drawer>
      )}
    </div>
  );
}

export default function TransactionPage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <TransactionContent />
    </Suspense>
  );
}
