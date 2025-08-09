import { useEffect, useMemo } from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from './hooks/useAuth';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree, context: undefined! });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const Router = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  const context = useMemo(() => ({ queryClient, auth }), [queryClient, auth]);

  useEffect(() => {
    router.invalidate();
  }, [context]);

  return <RouterProvider router={router} context={context} />;
};

export default Router;
