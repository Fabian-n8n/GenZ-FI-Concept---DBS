'use client';
import { useRouter } from 'next/navigation';
import ShopeeCheckout from '@/components/shell/ShopeeCheckout';
import { setNextRouteDirection } from '@/components/shell/RouteTransition';

export default function CatShopeePage() {
  const router = useRouter();
  return (
    <ShopeeCheckout
      onBack={() => { setNextRouteDirection(-1); router.push('/categorise'); }}
      onPlaceOrder={() => {
        setNextRouteDirection(1);
        router.push('/categorise/apple-pay?merchant=' + encodeURIComponent('Shopee') + '&amt=15.38&cat=Shopping&back=' + encodeURIComponent('/categorise'));
      }}
    />
  );
}
