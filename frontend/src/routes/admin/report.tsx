import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/report')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/auth/login', search: { redirect: location.href } });
    }

    if (!context.auth.user.permissions.includes('report_reviewer')) {
      throw redirect({ to: '/' });
    }
  },
  component: () => <div>Hello "/admin/report"!</div>,
});
