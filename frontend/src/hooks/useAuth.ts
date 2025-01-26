import type { AuthContext } from '@/types/context';

import { useQuery } from '@tanstack/react-query';
import { getAuthQueryOptions } from '@/middleware/queryOptions';

const useAuth = (): AuthContext => {
  const { data, isSuccess } = useQuery(getAuthQueryOptions());

  return isSuccess ? { isAuthenticated: true, user: data } : { isAuthenticated: false, user: null };
};

export default useAuth;
