'use client';
import { useRouter } from 'next/navigation';
import DbsLogin from '@/components/shell/DbsLogin';

export default function DbsLoginPage() {
  const router = useRouter();
  return (
    <DbsLogin
      onClose={() => router.push('/categorise')}
      onLogin={() => router.push('/categorise/dbs-app/biometric')}
    />
  );
}
