import type { AuthContext } from '@/types/context';

import { useQuery } from '@tanstack/react-query';
import { getUserPrivate } from '@/middleware/api';

export const AUTH_KEY = 'auth';

const useAuth = (): AuthContext => {
  const { data, isSuccess } = useQuery({
    queryKey: [AUTH_KEY],
    queryFn: getUserPrivate,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return isSuccess ? { isAuthenticated: true, user: data } : { isAuthenticated: false, user: null };
};

export default useAuth;
