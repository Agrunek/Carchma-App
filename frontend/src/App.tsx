import type { AxiosError } from 'axios';

import { QueryClientProvider } from '@tanstack/react-query';
import Router from './router/Router';
import queryClient from './config/queryClient';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
