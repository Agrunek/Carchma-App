import { createFileRoute, redirect, retainSearchParams, stripSearchParams } from '@tanstack/react-router';
import { z } from 'zod';
import Login from '@/components/pages/Login';

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
});

export const Route = createFileRoute('/auth/login')({
  validateSearch: loginSearchSchema,
  search: { middlewares: [retainSearchParams(['redirect']), stripSearchParams({ redirect: '' })] },
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || '/' });
    }
  },
  component: () => <Login />,
});
