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
        // Apple Pay card → Face ID → Shopee payment success (online, no NFC hold)
        router.push('/categorise/apple-pay?merchant=' + encodeURIComponent('Shopee') + '&bioNext=' + encodeURIComponent('/categorise/shopee/done'));
      }}
    />
  );
}
