'use client';

import toast from 'react-hot-toast';
import { useNetworkStatus } from './useNetworkStatus';

export function useConnectionCheck(message: string = 'Check network status') {
  const isOnline = useNetworkStatus();

  function checkConnection(message = 'Check network status') {
    if (!isOnline) {
      toast.error(message);
      return false;
    }
    return true;
  }

  return { checkConnection, isOnline };
}
