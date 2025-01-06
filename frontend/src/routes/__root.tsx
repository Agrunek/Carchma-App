import type { GlobalRouterContext } from '@/types/context';

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import QueryDevtools from '@/components/QueryDevtools';
import RouterDevtools from '@/components/RouterDevtools';
import Link from '@/components/atoms/Link';

export const Route = createRootRouteWithContext<GlobalRouterContext>()({
  component: Root,
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

function RootNotFound() {
  return (
    <div>
      <p>Not found!</p>
      <Link to="/">Go home</Link>
    </div>
  );
}
