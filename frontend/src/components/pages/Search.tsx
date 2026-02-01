// import { useSearch } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
// import { z } from 'zod';
import Combobox from '@/components/atoms/Combobox';
// import { defaultFormOptions } from '@/utils/form';
// import { stringifySearch } from '@/utils/string';
import { /* getAdvertsQueryOptions,*/ getCarInfoQueryOptions } from '@/middleware/queryOptions';

// const searchSchema = z.object({
//   page: z.int().positive().optional(),
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
  // const search = useSearch({ from: '/search' });

  const { data: carInfo } = useSuspenseQuery(getCarInfoQueryOptions());
  // const { data: adverts } = useSuspenseQuery(getAdvertsQueryOptions(stringifySearch(search)));

  // console.log(search);
  // console.log(carInfo);
  // console.log(adverts);

  const carMakes = carInfo.car_types[0].car_makes;

  return (
    <Combobox
      label="Marka"
      items={carMakes}
      chosen={null}
      onChosen={(chosen) => console.log(chosen)}
      required
      className="w-60"
    />
  );
};

export default Search;
