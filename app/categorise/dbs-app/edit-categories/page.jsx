'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/shell/StatusBar';
import AppBar from '@/components/shell/AppBar';
import Drawer from '@/components/primitives/Drawer';
import { Minus } from 'lucide-react';
import { CATS, MASTER_CATS, PICK_OPTIONS } from '@/lib/categories';

function CategoryPicker({ title, subtitle, options, onPick }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14.5, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>{subtitle}</div>
      {options.length === 0 && <div style={{ fontSize: 14, color: 'var(--text-tertiary)', textAlign: 'center', padding: '20px 0' }}>All categories are already enabled.</div>}
      {options.map(opt => (
        <button key={opt} className="cat-option" onClick={() => onPick(opt)}>
          <span style={{ width: 38, height: 38, borderRadius: 4, background: CATS[opt]?.color || '#aaa', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>
            {opt === 'Shopping' ? '🛍️' : opt === 'Dining' ? '🍜' : opt === 'Insurance' ? '🛡️' : opt === 'Rent' ? '🏠' : opt === 'Investment' ? '📈' : '🚗'}
          </span>
          <span style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{opt}</span>
        </button>
      ))}
    </div>
  );
}

export default function EditCategoriesPage() {
  const router = useRouter();
  const [cats, setCats] = useState(MASTER_CATS);
  const [showAdd, setShowAdd] = useState(false);

  const addable = MASTER_CATS.filter(c => !cats.includes(c));

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <StatusBar dark />
      <AppBar title="Edit Category" onBack={() => router.push('/categorise/dbs-app/breakdown?range=1m')} />

      <div className="scroll" style={{ padding: '4px 20px 20px' }}>
        <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '12px 0 6px' }}>
          Add or remove categories used for auto-categorisation.
        </p>
        <div>
          {cats.map(cat => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: '1px solid var(--color-border)' }}>
              <span className="cat-icon" style={{ background: CATS[cat]?.color, color: CATS[cat]?.ink, width: 38, height: 38, fontSize: 18 }}>
                {cat === 'Shopping' ? '🛍️' : cat === 'Dining' ? '🍜' : cat === 'Insurance' ? '🛡️' : cat === 'Rent' ? '🏠' : cat === 'Investment' ? '📈' : '🚗'}
              </span>
              <span style={{ flex: 1, fontSize: 15.5, fontWeight: 600, color: 'var(--text-primary)' }}>{cat}</span>
              <button
                onClick={() => setCats(prev => prev.filter(c => c !== cat))}
                style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--dbs-gray-100)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--dbs-gray-600)' }}
                aria-label={`Remove ${cat}`}
              >
                <Minus size={16} strokeWidth={2.4} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="screen-footer">
        <button className="btn-primary" onClick={() => setShowAdd(true)}>Add Category</button>
      </div>

      {showAdd && (
        <Drawer onClose={() => setShowAdd(false)}>
          <CategoryPicker
            title="Add a category"
            subtitle={addable.length ? 'Pick a category to track in auto-categorisation.' : 'All categories are already enabled.'}
            options={addable}
            onPick={c => { setCats(prev => [...prev, c]); setShowAdd(false); }}
          />
        </Drawer>
      )}
    </div>
  );
}
