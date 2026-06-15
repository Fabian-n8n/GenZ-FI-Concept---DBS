'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Drawer from '@/components/primitives/Drawer';
import TopNotif from '@/components/primitives/TopNotif';
import { CATS, PICK_OPTIONS } from '@/lib/categories';

function CategoryPicker({ title, subtitle, options, selected, onPick }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14.5, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>{subtitle}</div>
      <div>
        {options.map(opt => (
          <button key={opt} className="cat-option" onClick={() => onPick(opt)}>
            <span style={{ width: 38, height: 38, borderRadius: 4, background: CATS[opt]?.color || '#aaa', color: CATS[opt]?.ink || '#fff', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>
              {opt === 'Shopping' ? '🛍️' : opt === 'Dining' ? '🍜' : opt === 'Insurance' ? '🛡️' : opt === 'Rent' ? '🏠' : opt === 'Investment' ? '📈' : '📦'}
            </span>
            <span style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{opt}</span>
            {selected === opt && (
              <svg width="20" height="20" fill="none" stroke="var(--color-brand)" strokeWidth="2.4" strokeLinecap="round"><path d="M4 10l5 5L16 6"/></svg>
            )}
          </button>
        ))}
      </div>
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
    } else {
      const t = setTimeout(() => setShowBanner(true), 600);
      return () => clearTimeout(t);
    }
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
    <div className="apple-pay-screen screen" style={{ position: 'relative' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 28px' }}>
        {/* Checkmark */}
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(28, 166, 91, 0.15)', border: '3px solid #1ca65b', display: 'grid', placeItems: 'center' }}>
          <svg width="38" height="38" fill="none" stroke="#1ca65b" strokeWidth="3" strokeLinecap="round"><path d="M8 20l10 10L34 10"/></svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Payment Successful</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{merchantName}</div>
        </div>

        <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', letterSpacing: '-2px', fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ fontSize: 24, fontWeight: 600, verticalAlign: '8px', marginRight: 3 }}>S$</span>31.50
        </div>

        {categorised && cat && (
          <div style={{ background: 'rgba(28,166,91,0.12)', borderRadius: 10, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="18" height="18" fill="none" stroke="#1ca65b" strokeWidth="2.4" strokeLinecap="round"><path d="M3 9l5 5L15 5"/></svg>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: 500 }}>
              Auto-categorised as <strong style={{ color: '#fff' }}>{cat}</strong>
            </span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, width: '100%' }}>
          <button onClick={() => router.push('/categorise/apple-pay')} style={{ flex: 1, padding: '13px 0', background: 'rgba(255,255,255,0.12)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
            New payment
          </button>
          <button onClick={() => router.push('/categorise')} style={{ flex: 1, padding: '13px 0', background: '#fff', color: '#000', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
            Done
          </button>
        </div>
      </div>

      {/* Top notification banner */}
      {showBanner && !overlay && (
        <TopNotif
          title={bannerTitle()}
          text={bannerText()}
          onClick={() => { setShowBanner(false); setOverlay(categorised ? 'changecat' : 'categorise'); }}
        />
      )}

      {/* Categorise drawer */}
      {overlay === 'categorise' && (
        <Drawer onClose={() => { setOverlay(null); setShowBanner(true); }}>
          <CategoryPicker
            title="Help us categorise this"
            subtitle="We couldn't match this merchant. Pick a category to continue."
            options={PICK_OPTIONS}
            selected={cat}
            onPick={c => { setCat(c); setCategorised(true); setChanged(true); setOverlay(null); setShowBanner(true); }}
          />
        </Drawer>
      )}

      {/* Change category drawer */}
      {overlay === 'changecat' && (
        <Drawer onClose={() => { setOverlay(null); setShowBanner(true); }}>
          <CategoryPicker
            title="Change category"
            subtitle="Pick a new category for this transaction."
            options={PICK_OPTIONS}
            selected={cat}
            onPick={c => { setCat(c); setChanged(true); setOverlay(null); setShowBanner(true); }}
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
