import { createRootRoute, Outlet } from '@tanstack/react-router';
import QueryDevtools from '@/components/QueryDevtools';
import RouterDevtools from '@/components/RouterDevtools';

export const Route = createRootRoute({
  component: Root,
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
