import type { AuthContext } from '@/types/context';

import { useQuery } from '@tanstack/react-query';
import { getCurrentProfileQueryOptions } from '@/middleware/queryOptions';

const useAuth = (): AuthContext => {
  const { data, isSuccess } = useQuery(getCurrentProfileQueryOptions());

  return isSuccess ? { isAuthenticated: true, user: data } : { isAuthenticated: false, user: null };
};

export default useAuth;
