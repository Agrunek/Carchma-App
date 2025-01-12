import type { GlobalRouterContext } from '@/types/context';

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import QueryDevtools from '@/components/QueryDevtools';
import RouterDevtools from '@/components/RouterDevtools';
import RouterFeedback from '@/components/templates/RouterFeedback';

export const Route = createRootRouteWithContext<GlobalRouterContext>()({
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

function RootError() {
  return <RouterFeedback>Wystąpił niespodziewany błąd...</RouterFeedback>;
}

function RootNotFound() {
  return <RouterFeedback>Nie znaleźliśmy strony, której szukasz...</RouterFeedback>;
}
