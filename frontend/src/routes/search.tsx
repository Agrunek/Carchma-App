import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { z } from 'zod';
import Search from '@/components/pages/Search';
import { getAdvertsQueryOptions, getCarInfoQueryOptions } from '@/middleware/queryOptions';
import { stringifySearch } from '@/utils/string';

const searchSearchSchema = z.object({
  page: z.int().positive().optional().catch(undefined),
  query: z.string().optional().catch(undefined),
  min_mileage: z.int().nonnegative().optional().catch(undefined),
  max_mileage: z.int().nonnegative().optional().catch(undefined),
  damaged: z.boolean().optional().catch(undefined),
  make: z.string().optional().catch(undefined),
  model: z.string().optional().catch(undefined),
  min_year: z.int().min(1900).optional().catch(undefined),
  max_year: z.int().min(1900).optional().catch(undefined),
  fuel: z.string().array().nonempty().optional().catch(undefined),
  min_power: z.int().positive().optional().catch(undefined),
  max_power: z.int().positive().optional().catch(undefined),
  gearbox: z.string().optional().catch(undefined),
  body: z.string().array().nonempty().optional().catch(undefined),
  color: z.string().array().nonempty().optional().catch(undefined),
});

export const Route = createFileRoute('/search')({
  validateSearch: searchSearchSchema,
  search: { middlewares: [retainSearchParams(true)] },
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(getCarInfoQueryOptions());
    await context.queryClient.ensureQueryData(getAdvertsQueryOptions(stringifySearch(deps.search)));
  },
  component: () => <Search />,
});
