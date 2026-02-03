import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import Advert from '@/components/pages/Advert';
import { getCommentsFromAdvertQueryOptions } from '@/middleware/queryOptions';
import { stringifySearch } from '@/utils/string';

const advertSearchSchema = z.object({
  page: z.int().positive().optional().catch(undefined),
});

export const Route = createFileRoute('/advert/$id')({
  validateSearch: advertSearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context, params, deps }) => {
    await context.queryClient.ensureQueryData(
      getCommentsFromAdvertQueryOptions(params.id, stringifySearch(deps.search)),
    );
  },
  component: () => <Advert />,
});
