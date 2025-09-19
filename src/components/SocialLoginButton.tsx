'use client';

import { signInSocial } from '@/lib/actions/auth-actions';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import { Button } from './ui/button';

export default function SocialLoginButton({
  provider,
}: {
  provider: 'github' | 'google';
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await signInSocial(provider);

      if (result.success && result.res?.redirect && result.res?.url) {
        window.location.href = result.res.url;
      } else {
        toast.error('something went wrong.');
      }
    });
  }

  return (
    <Button onClick={handleClick} disabled={isPending}>
      {`Continue with ${provider}`}
    </Button>
  );
}
