import type { QueryClient } from '@tanstack/react-query';
import type { GetCurrentProfileResult } from '@/types/api';

interface AuthContextLogged {
  isAuthenticated: true;
  user: GetCurrentProfileResult;
}

interface AuthContextFailed {
  isAuthenticated: false;
  user: null;
}

export type AuthContext = AuthContextLogged | AuthContextFailed;

export interface GlobalRouterContext {
  queryClient: QueryClient;
  auth: AuthContext;
}
