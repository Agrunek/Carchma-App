import { QueryClientProvider } from '@tanstack/react-query';
import Router from './Router';
import queryClient from './config/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
