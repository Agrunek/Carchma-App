import type { GlobalRouterContext } from '@/types/context';

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorOccurred from '@/components/pages/ErrorOccurred';
import NotFound from '@/components/pages/NotFound';

const Root = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<GlobalRouterContext>()({
  component: () => <Root />,
  errorComponent: ({ error }) => <ErrorOccurred errorMessage={error.message} />,
  notFoundComponent: () => <NotFound />,
});
