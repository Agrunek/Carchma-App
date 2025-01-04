import { lazy, Suspense } from 'react';

const TanStackQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((res) => ({
    default: res.ReactQueryDevtools,
  })),
);

const QueryDevtools = () => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <Suspense>
      <TanStackQueryDevtools />
    </Suspense>
  );
};

export default QueryDevtools;
