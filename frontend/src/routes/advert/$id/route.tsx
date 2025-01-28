import { createFileRoute } from '@tanstack/react-router';
import { getAdvertQueryOptions, getMakeInfoQueryOptions, getUserQueryOptions } from '@/middleware/queryOptions';

export const Route = createFileRoute('/advert/$id')({
  loader: async ({ context, params }) => {
    const advert = await context.queryClient.ensureQueryData(getAdvertQueryOptions(params.id));
    await context.queryClient.ensureQueryData(getMakeInfoQueryOptions(advert.make));
    await context.queryClient.ensureQueryData(getUserQueryOptions(advert.userId));
  },
});
