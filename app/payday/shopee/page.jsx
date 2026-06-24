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
        // Apple Pay tap → declined by Payday Lock → over-limit blocked screen
        router.push('/categorise/apple-pay?merchant=' + encodeURIComponent('Shopee') + '&amt=15.38&next=' + encodeURIComponent('/payday/shopee/blocked') + '&back=' + encodeURIComponent('/payday/shopee'));
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
