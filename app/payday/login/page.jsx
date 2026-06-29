'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import DbsLoginFlow from '@/components/shell/DbsLoginFlow';

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next');
  const over = params.get('over') === '1';

  const onComplete = () => {
    if (next === 'manage') {
      router.push(`/payday/manage?fw=warren&locked=1${over ? '&over=1' : ''}`);
    } else {
      router.push('/payday/home?setup=1');
    }
  };

  return (
    <DbsLoginFlow
      onExit={() => router.push('/payday')}
      onComplete={onComplete}
    />
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="screen" style={{ background: '#fff' }} />}>
      <LoginContent />
    </Suspense>
  );
}
