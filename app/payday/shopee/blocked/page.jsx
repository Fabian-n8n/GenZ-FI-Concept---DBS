'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNotif from '@/components/primitives/TopNotif';
import { X } from 'lucide-react';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';

export default function ShopeeBlockedPage() {
  const router = useRouter();
  const [showNotif, setShowNotif] = useState(false);

  // Let the failed-payment screen settle, then the DBS notification slides in.
  useEffect(() => {
    const t = setTimeout(() => setShowNotif(true), 700);
    return () => clearTimeout(t);
  }, []);

  function goManage() {
    setShowNotif(false);
    setNextRouteDirection(1);
    router.push('/payday/manage?fw=warren&locked=1');
  }

  return (
    <div className="screen" style={{ background: '#f2f3f5', position: 'relative' }}>
      <div style={{ background: '#ee4d2d', flexShrink: 0, paddingTop: 'env(safe-area-inset-top)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 16px 16px', position: 'relative' }}>
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Payment Result</span>
          <button onClick={() => { setNextRouteDirection(-1); router.push('/payday/shopee'); }} style={{ position: 'absolute', right: 12, top: 0, background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }}>
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Result card */}
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-md)', padding: '32px 22px 28px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fdeaec', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#e0193b', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 24 }}>!</span>
          </div>
          <div style={{ color: '#e0193b', fontSize: 21, fontWeight: 700 }}>Payment Unsuccessful</div>
          <div style={{ marginTop: 14, fontSize: 44, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-1.5px', fontVariantNumeric: 'tabular-nums' }}>
            <span style={{ fontSize: 25, fontWeight: 600, verticalAlign: '7px', marginRight: 2 }}>S$</span>15.38
          </div>
          <div style={{ marginTop: 14, fontSize: 14.5, color: '#8c8c8c' }}>Apple Pay · DBS Visa Platinum</div>
        </div>

        {/* Reason */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#fff', border: '1px solid #f6d9dd', borderRadius: 12, padding: 16 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#e0193b', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0, marginTop: 1 }}>!</span>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#3a3a3a' }}>
            <strong style={{ color: '#222' }}>Blocked by DBS Payday Lock.</strong> This S$15.38 purchase would dip into the <strong>S$3,200</strong> savings locked until your next payday. Tap the DBS notification to manage your lock.
          </div>
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: '12px 16px calc(16px + env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={goManage} style={{ width: '100%', height: 50, borderRadius: 4, background: '#ee4d2d', color: '#fff', border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
          Manage Payday Lock
        </button>
        <button onClick={() => { setNextRouteDirection(-1); router.push('/payday/shopee'); }} style={{ width: '100%', height: 48, borderRadius: 4, background: 'none', color: '#666', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
          Back to cart
        </button>
      </div>

      {/* DBS notification — tap to jump into the app and switch off the lock */}
      {showNotif && (
        <TopNotif
          title="DBS digibank"
          text={<>Payment of <strong>S$15.38</strong> to Shopee was blocked by Payday Lock. Tap to manage.</>}
          onClick={goManage}
        />
      )}
    </div>
  );
}
