'use client';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import ShopeeCheckout from '@/components/shell/ShopeeCheckout';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';

function ShopeeContent() {
  const router = useRouter();
  return (
    <ShopeeCheckout
      onBack={() => { setNextRouteDirection(-1); router.back(); }}
      onPlaceOrder={() => {
        setNextRouteDirection(1);
        // Apple Pay card → Face ID → declined by Payday Lock → over-limit screen
        router.push('/categorise/apple-pay?merchant=' + encodeURIComponent('Shopee') + '&bioNext=' + encodeURIComponent('/payday/shopee/blocked'));
      }}
    />
  );
}

export default function ShopeePage() {
  return (
    <Suspense fallback={<div className="screen" />}>
      <ShopeeContent />
    </Suspense>
  );
}
