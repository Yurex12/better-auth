import SignupForm from '@/components/SignupForm';
import SocialLogin from '@/components/SocialLogin';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) redirect('/dashboard');

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Sign up to your account</CardTitle>
        <CardDescription>Enter your details to sign up</CardDescription>
        <CardAction>
          <Link href='/auth/signin'>Login</Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <SocialLogin />
    </Card>
  );
}
