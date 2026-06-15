'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Drawer from '@/components/primitives/Drawer';
import Alert from '@/components/primitives/Alert';
import TopNotif from '@/components/primitives/TopNotif';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

function ShopeeContent() {
  const router = useRouter();
  const params = useSearchParams();
  const locked = params.get('locked') === '1';
  const [overlay, setOverlay] = useState(null);

  function placeOrder() {
    if (locked) {
      router.push('/payday/shopee/blocked');
    } else {
      router.push('/payday/shopee/blocked');
    }
  }

  return (
    <div className="screen" style={{ background: '#f4f4f4', position: 'relative' }}>
      <div style={{ background: '#fff', flexShrink: 0, paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="shopee-bar">
          <ChevronLeft size={22} color="#ee4d2d" style={{ cursor: 'pointer' }} onClick={() => router.back()} />
          <span style={{ flex: 1, textAlign: 'center', color: '#222', fontWeight: 600, fontSize: 18 }}>Checkout</span>
        </div>
      </div>

      <div className="scroll">
        {/* Address */}
        <div style={{ background: '#fff', padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <MapPin size={20} color="#ee4d2d" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5 }}><strong>Fabian Wong</strong> <span style={{ color: '#999' }}>(+65) 9815 1350</span></div>
            <div style={{ fontSize: 13.5, color: '#555', marginTop: 3, lineHeight: 1.45 }}>11 Serangoon North Road, #09-23<br/>SG 687467</div>
          </div>
          <ChevronRight size={18} color="#ccc" />
        </div>

        {/* Product */}
        <div style={{ background: '#fff', marginTop: 8, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ background: '#ee4d2d', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 5px', borderRadius: 3 }}>Mall</span>
            <span style={{ fontSize: 14.5, fontWeight: 600 }}>Xandro Lab Official Store</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 72, height: 72, borderRadius: 6, background: 'linear-gradient(150deg,#eaf3ff,#cfe2ff)', flexShrink: 0, display: 'grid', placeItems: 'center', color: '#4a7fe0', fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px' }}>
              4iir
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: '#222', lineHeight: 1.3 }}>Xandro Lab Air Nasal Strips | Supports Nasal A…</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 3 }}>Single Pack</div>
              <span style={{ display: 'inline-block', marginTop: 6, border: '1px solid #ee4d2d', color: '#ee4d2d', fontSize: 10.5, padding: '1px 5px', borderRadius: 3 }}>0% SPayLater (up to 6M)</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
                <div><span style={{ color: '#ee4d2d', fontWeight: 700, fontSize: 15 }}>$18.05</span> <span style={{ color: '#bbb', fontSize: 12, textDecoration: 'line-through' }}>$35.00</span></div>
                <span style={{ color: '#999', fontSize: 13 }}>x1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div style={{ background: '#fff', marginTop: 8, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Shipping Option</span>
          </div>
          <div style={{ border: '1px solid #1ca65b', background: '#f3fbf6', borderRadius: 8, padding: 12, marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>Get by 9 Jun – 10 Jun</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Doorstep Delivery</div>
            </div>
            <div style={{ fontSize: 13 }}><span style={{ color: '#bbb', textDecoration: 'line-through' }}>$1.99</span> <strong style={{ color: '#1ca65b' }}>Free</strong></div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: '#fff', marginTop: 8, padding: '12px 16px' }}>
          {[['Order Total', '$18.05'], ['Shipping', 'Free'], ['Voucher', '−$0.00']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}>
              <span style={{ color: '#555' }}>{l}</span>
              <span style={{ fontWeight: l === 'Order Total' ? 700 : 400, color: '#222' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 16 }} />
      </div>

      {/* Checkout bar */}
      <div style={{ flexShrink: 0, background: '#fff', borderTop: '1px solid #eee', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13.5, color: '#333' }}>Total <span style={{ color: '#ee4d2d', fontWeight: 800, fontSize: 18 }}>$18.05</span></div>
          <div style={{ fontSize: 11.5, color: '#888' }}>Saved <span style={{ color: '#ee4d2d' }}>$18.94</span></div>
        </div>
        <button
          onClick={placeOrder}
          style={{ background: '#ee4d2d', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default function ShopeePage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <ShopeeContent />
    </Suspense>
  );
}
