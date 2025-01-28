import { createFileRoute, redirect } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { getAdvertQueryOptions } from '@/middleware/queryOptions';

const BuilderSearchSchema = z.object({
  step: z.optional(fallback(z.union([z.literal(1), z.literal(2), z.literal(3)]), 1).default(1)),
});

export const Route = createFileRoute('/builder/$id')({
  validateSearch: zodValidator(BuilderSearchSchema),
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(getAdvertQueryOptions(params.id));
  },
});
