import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/advert/wizard')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/auth/login', search: { redirect: location.href } });
    }
  },
  component: () => <div>Hello "/advert/wizard"!</div>,
});
