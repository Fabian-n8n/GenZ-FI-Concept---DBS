'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/shell/StatusBar';
import TopNotif from '@/components/primitives/TopNotif';
import Drawer from '@/components/primitives/Drawer';
import { X } from 'lucide-react';

export default function ShopeeBlockedPage() {
  const router = useRouter();
  const [showNotif, setShowNotif] = useState(true);
  const [showUnlock, setShowUnlock] = useState(false);

  return (
    <div className="screen" style={{ background: '#f2f3f5', position: 'relative' }}>
      <div style={{ background: '#ee4d2d', flexShrink: 0 }}>
        <StatusBar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 16px 16px', position: 'relative' }}>
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Payment Result</span>
          <button onClick={() => router.push('/payday/shopee')} style={{ position: 'absolute', right: 12, top: 0, background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }}>
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Result card */}
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-md)', padding: '30px 22px 28px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#e0193b', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 17 }}>!</span>
            <span style={{ color: '#e0193b', fontSize: 22, fontWeight: 700 }}>Payment Failed</span>
          </div>
          <div style={{ marginTop: 18, fontSize: 46, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-1.5px', fontVariantNumeric: 'tabular-nums' }}>
            <span style={{ fontSize: 26, fontWeight: 600, verticalAlign: '7px', marginRight: 2 }}>S$</span>18.05
          </div>
          <div style={{ marginTop: 18, fontSize: 15, color: '#8c8c8c' }}>Credit / Debit Card</div>
        </div>

        {/* Reason */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#fdeaec', borderRadius: 12, padding: 16 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#e0193b', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>!</span>
          <span style={{ color: '#d11f3a', fontSize: 14.5, lineHeight: 1.45, fontWeight: 500 }}>
            Your <strong>S$18.05</strong> purchase exceeds your Payday Lock spending limit. Tap the notification to manage.
          </span>
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: '12px 16px calc(16px + env(safe-area-inset-bottom))' }}>
        <button onClick={() => router.push('/payday/shopee')} style={{ width: '100%', height: 50, borderRadius: 4, background: '#ee4d2d', color: '#fff', border: 'none', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
          OK
        </button>
      </div>

      {/* Top notification */}
      {showNotif && (
        <TopNotif
          title="Payment blocked"
          text={<>Your <strong>S$18.05</strong> purchase exceeds your Payday Lock spending limit. Tap to manage.</>}
          onClick={() => { setShowNotif(false); setShowUnlock(true); }}
        />
      )}

      {/* Unlock drawer */}
      {showUnlock && (
        <Drawer onClose={() => setShowUnlock(false)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--dbs-red-50)', color: 'var(--color-brand)', display: 'grid', placeItems: 'center' }}>
              🔓
            </div>
            <div className="overline" style={{ color: 'var(--color-brand)' }}>Payday Lock</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Unlock spending for this purchase?</div>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 24 }}>
            Releasing <strong style={{ color: 'var(--text-primary)' }}>S$18.05</strong> will reduce your locked savings. The rest stays protected until your next payday.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn-primary" onClick={() => { setShowUnlock(false); router.push('/payday/manage?locked=1&fw=warren'); }}>Yes, unlock</button>
            <button className="btn-ghost" style={{ color: 'var(--color-brand)' }} onClick={() => setShowUnlock(false)}>Keep it locked</button>
          </div>
        </Drawer>
      )}
    </div>
  );
}
