'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import DbsLoginFlow from '@/components/shell/DbsLoginFlow';

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next');
  const over = params.get('over') === '1';
  const act  = params.get('act') === '1';

  // Use replace (not push): router.push silently no-ops after the multi-stage
  // Face ID → loading sequence, and replace also keeps the login/loading
  // screens out of the back-history.
  const onComplete = () => {
    if (next === 'manage') {
      router.replace(`/payday/manage?fw=warren&locked=1${over ? '&over=1' : ''}${act ? '&act=1' : ''}`);
    } else {
      router.replace('/payday/home?setup=1');
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
