'use client';

import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';

export default function NetworkProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const isOnline = useNetworkStatus();
  const hasBeenOffline = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isOnline) {
      hasBeenOffline.current = true;
    } else if (hasBeenOffline.current) {
      toast.success('Back online!', { duration: 2000 });
    }
  }, [isOnline, mounted]);

  if (!mounted) return children;

  return (
    <>
      {!isOnline && (
        <div className='bg-red-500 text-white p-2 text-center text-sm fixed top-0 left-0 right-0 z-50'>
          ⚠️ No internet connection.
        </div>
      )}
      <div className={!isOnline ? 'pt-10' : ''}>{children}</div>
    </>
  );
}
