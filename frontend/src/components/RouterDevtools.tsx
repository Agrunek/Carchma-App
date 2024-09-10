import { lazy, Suspense } from 'react';

const TanStackRouterDevtools = lazy(() =>
  import('@tanstack/router-devtools').then((res) => ({
    default: res.TanStackRouterDevtools,
  })),
);

const RouterDevtools = () => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <Suspense>
      <TanStackRouterDevtools />
    </Suspense>
  );
};

export default RouterDevtools;
