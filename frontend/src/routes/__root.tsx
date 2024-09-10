import { createRootRoute, Outlet } from '@tanstack/react-router';
import RouterDevtools from '@/components/RouterDevtools';

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <Outlet />
      <RouterDevtools />
    </>
  );
}
