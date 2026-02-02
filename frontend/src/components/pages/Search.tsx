import { useNavigate, useSearch } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
// import { z } from 'zod';
import PaginatedAdverts from '@/components/organisms/PaginatedAdverts';
import Header from '@/components/organisms/Header';
// import { defaultFormOptions } from '@/utils/form';
import { stringifySearch } from '@/utils/string';
import { getAdvertsQueryOptions /* getCarInfoQueryOptions */ } from '@/middleware/queryOptions';

// const searchSchema = z.object({
//   query: z.string().optional(),
//   min_mileage: z.int().nonnegative().optional(),
//   max_mileage: z.int().nonnegative().optional(),
//   damaged: z.boolean().optional(),
//   make: z.string().optional(),
//   model: z.string().optional(),
//   min_year: z.int().min(1900).optional(),
//   max_year: z.int().min(1900).optional(),
//   fuel: z.string().array().nonempty().optional(),
//   min_power: z.int().positive().optional(),
//   max_power: z.int().positive().optional(),
//   gearbox: z.string().optional(),
//   body: z.string().array().nonempty().optional(),
//   color: z.string().array().nonempty().optional(),
// });

// const searchFormOptions = defaultFormOptions(searchSchema, {});

const Search = () => {
  const search = useSearch({ from: '/search' });
  const navigate = useNavigate({ from: '/search' });

  // const { data: carInfo } = useSuspenseQuery(getCarInfoQueryOptions());
  const { data: adverts } = useSuspenseQuery(getAdvertsQueryOptions(stringifySearch(search)));

  const { data, meta } = adverts;

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 md:p-4">
      <Header />
      <div className="mt-40"></div>
      <PaginatedAdverts
        adverts={data}
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
        onChange={(pageNumber) => navigate({ to: '.', search: { page: pageNumber } })}
      />
      <div className="mt-20"></div>
    </div>
  );
};

export default Search;
