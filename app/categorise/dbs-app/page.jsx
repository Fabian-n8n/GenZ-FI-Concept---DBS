'use client';
import { useRouter } from 'next/navigation';
import DbsLoginFlow from '@/components/shell/DbsLoginFlow';

export default function DbsLoginPage() {
  const router = useRouter();
  return (
    <DbsLoginFlow
      onExit={() => router.push('/categorise')}
      onComplete={() => router.push('/categorise/dbs-app/home')}
    />
  );
}
