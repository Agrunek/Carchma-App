import type { GlobalRouterContext } from '@/types/context';

import { useEffect } from 'react';
import { createRootRouteWithContext, ErrorComponentProps, Outlet, useRouter } from '@tanstack/react-router';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Button from '@/components/atoms/Button';
import QueryDevtools from '@/components/QueryDevtools';
import RouterDevtools from '@/components/RouterDevtools';
import RouterFeedback from '@/components/templates/RouterFeedback';
import { getInfoQueryOptions } from '@/middleware/queryOptions';

export const Route = createRootRouteWithContext<GlobalRouterContext>()({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getInfoQueryOptions());
  },
  component: Root,
  errorComponent: RootError,
  notFoundComponent: RootNotFound,
});

function Root() {
  return (
    <>
      <Outlet />
      <QueryDevtools />
      <RouterDevtools />
    </>
  );
}

function RootError({ error }: ErrorComponentProps) {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  if (error instanceof AxiosError && error.config?.url === 'info') {
    return (
      <RouterFeedback
        actionNode={
          <Button variant="tertiary" onClick={() => router.invalidate()}>
            Spróbuj ponownie
          </Button>
        }
      >
        Nie można skomunikować się z serwerem...
      </RouterFeedback>
    );
  }

  return <RouterFeedback>Wystąpił niespodziewany błąd...</RouterFeedback>;
}

function RootNotFound() {
  return <RouterFeedback>Nie znaleźliśmy strony, której szukasz...</RouterFeedback>;
}
