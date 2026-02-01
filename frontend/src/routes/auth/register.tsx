import { createFileRoute, redirect, retainSearchParams, stripSearchParams } from '@tanstack/react-router';
import { z } from 'zod';
import Register from '@/components/pages/Register';

const registerSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
});

export const Route = createFileRoute('/auth/register')({
  validateSearch: registerSearchSchema,
  search: { middlewares: [retainSearchParams(['redirect']), stripSearchParams({ redirect: '' })] },
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || '/' });
    }
  },
  component: () => <Register />,
});
