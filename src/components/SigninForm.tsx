'use client';

import { Input } from '@/components/ui/input';
import { signIn } from '@/lib/actions/auth-actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Label } from './ui/label';

export default function SigninForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogin(formData: FormData) {
    startTransition(async () => {
      const res = await signIn(formData);

      if (res.success) {
        toast.success('Login succesful');
        router.push('/dashboard');
        router.refresh();
      } else {
        toast.error(res.error);
      }
    });
  }

  return (
    <form className='space-y-8' action={handleLogin}>
      <div className='space-y-2'>
        <Label>Email</Label>
        <Input
          type='email'
          name='email'
          placeholder='johndoe@gmail.com'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label>Password</Label>
        <Input type='password' name='password' placeholder='******' required />
      </div>

      <Button type='submit' disabled={isPending}>
        Login
      </Button>
    </form>
  );
}
