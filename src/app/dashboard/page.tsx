import { auth } from '@/lib/auth';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect('/auth/signin');

  return (
    <div className='space-y-4 px-4'>
      <h1 className='text-2xl md:text-4xl px-4 space-y-4 font-bold text-center'>
        Welcome to the dashboard {session.user.name}
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
        expedita deleniti, ratione perferendis voluptas sapiente, vel tenetur
        quo itaque dolore delectus odit? Repellendus cum incidunt beatae ex quis
        nihil laudantium.
      </p>
    </div>
  );
}
