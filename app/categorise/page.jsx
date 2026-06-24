'use client';
import Link from 'next/link';
import { Smartphone, Landmark, ShoppingBag } from 'lucide-react';

export default function CategoriseLanding() {
  const flows = [
    {
      id: 'A',
      title: 'Flow A — Apple Pay',
      sub: 'Tap & pay → auto-categorise banner → change category',
      href: '/categorise/apple-pay',
      color: '#000',
      Icon: Smartphone,
    },
    {
      id: 'B',
      title: 'Flow B — DBS App Review',
      sub: 'DBS login → Face ID → Home → Transaction history → Breakdown → Edit',
      href: '/categorise/dbs-app',
      color: 'var(--dbs-red-600)',
      Icon: Landmark,
    },
    {
      id: 'C',
      title: 'Flow C — Shopee Checkout',
      sub: 'Shopee pay → payment success → auto-categorised',
      href: '/categorise/shopee',
      color: '#ee4d2d',
      Icon: ShoppingBag,
    },
  ];

  return (
    <div className="screen screen--white">
      <div style={{ padding: 'calc(env(safe-area-inset-top) + 8px) 20px 0', flexShrink: 0 }}>
        <Link href="/" style={{ fontSize: 13, color: 'var(--color-brand)', fontWeight: 600, textDecoration: 'none' }}>← All flows</Link>
      </div>
      <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>Flow 2</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Post-Transaction</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-brand)', letterSpacing: '-0.3px' }}>Auto-Categorisation</div>
        <p style={{ fontSize: 14.5, color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 10 }}>
          DBS automatically categorises spending when you pay via Apple Pay, DBS app, or third-party apps like Shopee.
        </p>
      </div>

      <div className="scroll" style={{ padding: '20px 20px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {flows.map(f => (
            <Link key={f.id} href={f.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 18, display: 'flex', gap: 16, alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ width: 48, height: 48, borderRadius: 4, background: f.color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <f.Icon size={24} strokeWidth={1.8} color="#fff" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--text-primary)' }}>{f.title}</div>
                </div>
                <svg width="18" height="18" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round"><path d="M5 9h8M10 5l4 4-4 4"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
