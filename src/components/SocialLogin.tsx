import SocialLoginButton from './SocialLoginButton';
import { CardFooter } from './ui/card';

export default function SocialLogin() {
  return (
    <CardFooter className='flex-col gap-2'>
      <SocialLoginButton provider='github' />
      <SocialLoginButton provider='google' />
    </CardFooter>
  );
}
