import { createFileRoute, redirect } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

const LoginSearchSchema = z.object({
  redirect: z.optional(fallback(z.string(), '').default('')),
});

export const Route = createFileRoute('/login')({
  validateSearch: zodValidator(LoginSearchSchema),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || '/' });
    }
  },
});
