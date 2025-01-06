import type { AxiosError } from 'axios';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import queryClient from './config/queryClient';

const router = createRouter({ routeTree, context: { queryClient } });

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
