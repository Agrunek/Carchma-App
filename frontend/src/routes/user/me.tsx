import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/user/me')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/auth/login', search: { redirect: location.href } });
    }
  },
  component: () => <div>Hello "/user/me"!</div>,
});
