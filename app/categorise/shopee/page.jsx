'use client';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/shell/StatusBar';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function CatShopeePage() {
  const router = useRouter();

  return (
    <div className="screen" style={{ background: '#f4f4f4' }}>
      <div style={{ background: '#fff', flexShrink: 0 }}>
        <StatusBar dark />
        <div className="shopee-bar">
          <ChevronLeft size={22} color="#ee4d2d" style={{ cursor: 'pointer' }} onClick={() => router.push('/categorise')} />
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
            <span style={{ fontSize: 14.5, fontWeight: 600 }}>Shopee Official</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 72, height: 72, borderRadius: 6, background: 'linear-gradient(150deg,#fff0ea,#ffe0d0)', flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 32 }}>👗</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: '#222', lineHeight: 1.3 }}>Casual Summer Dress | Floral Pattern | S/M/L</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 3 }}>Size: M · Color: Blue</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ color: '#ee4d2d', fontWeight: 700, fontSize: 15 }}>$18.05</span>
                <span style={{ color: '#999', fontSize: 13 }}>x1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div style={{ background: '#fff', marginTop: 8, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Shipping</div>
          <div style={{ border: '1px solid #1ca65b', background: '#f3fbf6', borderRadius: 8, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>Get by 9 Jun – 10 Jun</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Doorstep Delivery</div>
            </div>
            <strong style={{ color: '#1ca65b' }}>Free</strong>
          </div>
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
          onClick={() => router.push('/categorise/shopee/done')}
          style={{ background: '#ee4d2d', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
