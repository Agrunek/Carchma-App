import type { ErrorComponentProps } from '@tanstack/react-router';
import type { GlobalRouterContext } from '@/types/context';

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorOccurred from '@/components/pages/ErrorOccurred';
import NotFound from '@/components/pages/NotFound';

export const Route = createRootRouteWithContext<GlobalRouterContext>()({
  component: RouteComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}

function ErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorOccurred errorMessage={error.message} />;
}

function NotFoundComponent() {
  return <NotFound />;
}
