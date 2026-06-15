'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Drawer from '@/components/primitives/Drawer';
import TopNotif from '@/components/primitives/TopNotif';
import CatIcon from '@/components/primitives/CatIcon';
import { X } from 'lucide-react';
import { CATS, PICK_OPTIONS } from '@/lib/categories';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';

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

export default function ShopeeDonePage() {
  const router = useRouter();
  const [cat, setCat] = useState('Shopping');
  const [changed, setChanged] = useState(false);
  const [overlay, setOverlay] = useState(null);

  return (
    <div className="screen" style={{ background: '#f2f3f5', position: 'relative' }}>
      <div style={{ background: '#ee4d2d', flexShrink: 0, paddingTop: 'env(safe-area-inset-top)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 16px 16px', position: 'relative' }}>
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Payment Result</span>
          <button onClick={() => { setNextRouteDirection(-1); router.push('/categorise'); }} style={{ position: 'absolute', right: 12, top: 0, background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }}>
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-md)', padding: '30px 22px 28px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1ca65b', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 15 }}>✓</div>
            <span style={{ color: '#1ca65b', fontSize: 22, fontWeight: 700 }}>Payment Successful</span>
          </div>
          <div style={{ marginTop: 18, fontSize: 46, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-1.5px', fontVariantNumeric: 'tabular-nums' }}>
            <span style={{ fontSize: 26, fontWeight: 600, verticalAlign: '7px', marginRight: 2 }}>S$</span>18.05
          </div>
          <div style={{ marginTop: 18, fontSize: 15, color: '#8c8c8c' }}>Credit / Debit Card</div>
        </div>

        {changed && (
          <div style={{ background: 'var(--dbs-blue-50)', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: 'var(--dbs-blue-500)', fontWeight: 500 }}>
            ✓ Category updated to <strong>{cat}</strong>
          </div>
        )}
      </div>

      <div style={{ flexShrink: 0, padding: '12px 16px calc(16px + env(safe-area-inset-bottom))' }}>
        <button onClick={() => { setNextRouteDirection(-1); router.push('/categorise'); }} style={{ width: '100%', height: 50, borderRadius: 4, background: '#ee4d2d', color: '#fff', border: 'none', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>OK</button>
      </div>

      {!overlay && (
        <TopNotif
          title={changed ? 'Category updated' : 'Transaction categorised'}
          text={<span>S$18.05 at <strong>Shopee</strong>, categorised under <strong>{cat}</strong>. Tap to change.</span>}
          onClick={() => setOverlay('changecat')}
        />
      )}

      {overlay === 'changecat' && (
        <Drawer onClose={() => setOverlay(null)}>
          <CategoryPicker
            title="Change category"
            subtitle="Pick a new category for this transaction."
            options={PICK_OPTIONS}
            selected={cat}
            onPick={(c) => { setCat(c); setChanged(true); setOverlay(null); }}
          />
        </Drawer>
      )}
    </div>
  );
}
