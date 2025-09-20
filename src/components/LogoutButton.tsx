'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import { Button } from './ui/button';

import { signOut } from '@/lib/actions/auth-actions';
import { useConnectionCheck } from '@/hooks/useConnectionCheck';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const { checkConnection } = useConnectionCheck();
  const router = useRouter();

  function handleLogout() {
    if (!checkConnection('Seems your are offline.')) return;

    startTransition(async () => {
      const res = await signOut();

      if (res.success) {
        router.push('/auth/signin');
      } else {
        toast.error('Something went wrong.');
      }
    });
  }

  return (
    <Button onClick={handleLogout} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
