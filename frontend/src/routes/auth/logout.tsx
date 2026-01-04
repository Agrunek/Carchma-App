import { createFileRoute, redirect } from '@tanstack/react-router';
import { logout } from '@/middleware/api';
import { AUTH_KEY } from '@/middleware/queryOptions';

export const Route = createFileRoute('/auth/logout')({
  preload: false,
  loader: async ({ context }) => {
    if (context.auth.isAuthenticated) {
      await logout();
      await context.queryClient.invalidateQueries({ queryKey: [AUTH_KEY], exact: true });
    }

    throw redirect({ to: '/', replace: true });
  },
});
