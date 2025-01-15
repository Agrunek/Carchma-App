import type { QueryClient } from '@tanstack/react-query';
import type { UserPrivate } from '@/types/api';

interface AuthContextLogged {
  isAuthenticated: true;
  user: UserPrivate;
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
