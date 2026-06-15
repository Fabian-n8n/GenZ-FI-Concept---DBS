'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Drawer from '@/components/primitives/Drawer';
import TopNotif from '@/components/primitives/TopNotif';
import CatIcon from '@/components/primitives/CatIcon';
import { CATS, PICK_OPTIONS } from '@/lib/categories';
import { DBSCard } from '../page';

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

function DoneContent() {
  const router = useRouter();
  const params = useSearchParams();
  const merchant = params.get('merchant') || 'known';
  const isKnown = merchant !== 'unknown';

  const [cat, setCat] = useState(isKnown ? 'Dining' : null);
  const [categorised, setCategorised] = useState(isKnown);
  const [changed, setChanged] = useState(false);
  const [overlay, setOverlay] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  const merchantName = isKnown ? 'Hai Di Lao' : 'ABC PTE LTD';

  useEffect(() => {
    if (!isKnown && !categorised) {
      const t = setTimeout(() => setOverlay('categorise'), 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowBanner(true), 600);
    return () => clearTimeout(t);
  }, []);

  function bannerTitle() {
    if (!categorised) return 'Payment successful';
    return changed ? 'Transaction has been categorised' : 'Payment successful';
  }
  function bannerText() {
    if (!categorised) return <span>S$31.50 at <strong>{merchantName}</strong>. Tap to categorise.</span>;
    return <span>S$31.50 at <strong>{merchantName}</strong>, categorised as <strong>{cat}</strong>. Tap to change.</span>;
  }

  return (
    <div className="apple-pay-screen screen" style={{ justifyContent: 'flex-start', gap: 0, position: 'relative' }}>
      {/* DBS card at top — compact with padding */}
      <div style={{ padding: 'calc(env(safe-area-inset-top) + 20px) 20px 0' }}>
        <DBSCard compact />
      </div>

      {/* Green ✓ check + Done centered — matches Claude Design reference */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <button
          onClick={() => router.push('/categorise')}
          style={{
            width: 80, height: 80,
            borderRadius: '50%',
            background: '#1ca65b',
            border: 'none',
            display: 'grid', placeItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 0 6px rgba(28,166,91,0.2)',
          }}
          aria-label="Done"
        >
          <svg width="38" height="38" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
            <path d="M8 20l10 10L34 10" />
          </svg>
        </button>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Done</div>
      </div>

      {/* Categorisation notification banner */}
      {showBanner && !overlay && (
        <TopNotif
          title={bannerTitle()}
          text={bannerText()}
          onClick={() => {
            setShowBanner(false);
            setOverlay(categorised ? 'changecat' : 'categorise');
          }}
        />
      )}

      {overlay === 'categorise' && (
        <Drawer onClose={() => { setOverlay(null); setShowBanner(true); }}>
          <CategoryPicker
            title="Help us categorise this"
            subtitle="We couldn't match this merchant. Pick a category to continue."
            options={PICK_OPTIONS}
            selected={cat}
            onPick={(c) => { setCat(c); setCategorised(true); setChanged(true); setOverlay(null); setShowBanner(true); }}
          />
        </Drawer>
      )}

      {overlay === 'changecat' && (
        <Drawer onClose={() => { setOverlay(null); setShowBanner(true); }}>
          <CategoryPicker
            title="Change category"
            subtitle="Pick a new category for this transaction."
            options={PICK_OPTIONS}
            selected={cat}
            onPick={(c) => { setCat(c); setChanged(true); setOverlay(null); setShowBanner(true); }}
          />
        </Drawer>
      )}
    </div>
  );
}

export default function ApplePayDonePage() {
  return (
    <Suspense fallback={<div className="screen" style={{ background: '#000' }} />}>
      <DoneContent />
    </Suspense>
  );
}
