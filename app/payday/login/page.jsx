'use client';
import { useRouter } from 'next/navigation';
import DbsLogin from '@/components/shell/DbsLogin';

export default function LoginPage() {
  const router = useRouter();
  return (
    <DbsLogin
      onClose={() => router.push('/payday')}
      onLogin={() => router.push('/payday/faceid')}
    />
  );
}
