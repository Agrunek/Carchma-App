import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/me')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
});
