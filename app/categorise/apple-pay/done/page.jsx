'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Drawer from '@/components/primitives/Drawer';
import TopNotif from '@/components/primitives/TopNotif';
import CatIcon from '@/components/primitives/CatIcon';
import { CATS, PICK_OPTIONS } from '@/lib/categories';
import { DBSCard } from '../page';

// Reused from hold/page — card stack at bottom
function CardStack() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 72,
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 14, right: 14, height: 56,
        borderRadius: '14px 14px 0 0',
        background: 'linear-gradient(135deg, #1b2a3a 0%, #243b55 100%)',
        display: 'flex', alignItems: 'flex-start',
        padding: '11px 16px',
      }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.03em' }}>HSBC</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>TravelOne</span>
      </div>
      <div style={{
        position: 'absolute', bottom: 18, left: 14, right: 14, height: 56,
        borderRadius: '14px 14px 0 0',
        background: 'linear-gradient(135deg, #1a3060 0%, #0e1f4a 100%)',
        display: 'flex', alignItems: 'flex-start',
        padding: '11px 16px',
      }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.03em' }}>DBS</span>
        <span style={{ marginLeft: 6, fontSize: 10, color: 'rgba(255,255,255,0.38)' }}>Debit</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.32)' }}>VISA</span>
      </div>
    </div>
  );
}

// iOS-style blue circle checkmark — matches real Apple Pay Done screen (#007AFF)
function DoneCheck({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 84, height: 84,
        borderRadius: '50%',
        background: 'none',
        border: '3px solid #007AFF',
        display: 'grid', placeItems: 'center',
        cursor: 'pointer',
        flexShrink: 0,
      }}
      aria-label="Done"
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
        stroke="#007AFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 23l10 10L36 11" />
      </svg>
    </button>
  );
}

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
  const merchantParam = params.get('merchant') || 'FAIRPRICE SG';
  const isUnknown = merchantParam === 'unknown';
  const isKnown = !isUnknown;
  const back = params.get('back') || '/categorise';

  const amt = Number(params.get('amt') || '31.50');
  const amtFmt = 'S$' + amt.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const [cat, setCat] = useState(isKnown ? (params.get('cat') || 'Grocery') : null);
  const [categorised, setCategorised] = useState(isKnown);
  const [changed, setChanged] = useState(false);
  const [overlay, setOverlay] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  const merchantName = isUnknown ? 'ABC PTE LTD' : merchantParam;

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
    if (!categorised) return <span>{amtFmt} at <strong>{merchantName}</strong>. Tap to categorise.</span>;
    return <span>{amtFmt} at <strong>{merchantName}</strong>, categorised as <strong>{cat}</strong>. Tap to change.</span>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100dvh',
      background: '#000',         // pure black — matches real iOS Apple Pay
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* DBS card — same position as Hold */}
      <div style={{ padding: 'calc(env(safe-area-inset-top) + 16px) 16px 0', flexShrink: 0 }}>
        <DBSCard compact />
      </div>

      {/* Blue checkmark + "Done" — centered, clears card stack */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 16,
        paddingBottom: 80,
        zIndex: 1,
      }}>
        <DoneCheck onClick={() => router.push(back)} />
        <div style={{
          fontSize: 18, fontWeight: 600,
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '-0.2px',
        }}>
          Done
        </div>
      </div>

      {/* Card stack peeking from bottom */}
      <CardStack />

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
            subtitle="We couldn't match this merchant. Pick a category."
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
    <Suspense fallback={<div style={{ width: '100%', height: '100dvh', background: '#000' }} />}>
      <DoneContent />
    </Suspense>
  );
}
