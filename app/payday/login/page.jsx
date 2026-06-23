'use client';
import { useRouter } from 'next/navigation';
import DbsLoginFlow from '@/components/shell/DbsLoginFlow';

export default function LoginPage() {
  const router = useRouter();
  return (
    <DbsLoginFlow
      onExit={() => router.push('/payday')}
      onComplete={() => router.push('/payday/home?setup=1')}
    />
  );
}
