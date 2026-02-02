import { useNavigate, useSearch } from '@tanstack/react-router';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useForm, useStore } from '@tanstack/react-form';
import { z } from 'zod';
import PaginatedAdverts from '@/components/organisms/PaginatedAdverts';
import Header from '@/components/organisms/Header';
import Combobox from '@/components/atoms/Combobox';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import { defaultFormOptions } from '@/utils/form';
import { stringifySearch } from '@/utils/string';
import { getAdvertsQueryOptions, getCarInfoQueryOptions, getCarMakeInfoQueryOptions } from '@/middleware/queryOptions';

const searchSchema = z.object({
  query: z.string(),
  min_mileage: z.int().nonnegative(),
  max_mileage: z.int().nonnegative(),
  damaged: z.boolean(),
  make: z.string(),
  model: z.string(),
  min_year: z.int().min(1900),
  max_year: z.int().min(1900),
  fuel: z.string().array(),
  min_power: z.int().positive(),
  max_power: z.int().positive(),
  gearbox: z.string(),
  body: z.string().array(),
  color: z.string().array(),
});

const Search = () => {
  const search = useSearch({ from: '/search' });
  const navigate = useNavigate({ from: '/search' });

  const searchFormOptions = defaultFormOptions(searchSchema, {
    query: search.query || '',
    min_mileage: search.min_mileage || 0,
    max_mileage: search.max_mileage || 0,
    damaged: search.damaged || false,
    make: search.make || '',
    model: search.model || '',
    min_year: search.min_year || 1970,
    max_year: search.max_year || new Date().getFullYear(),
    fuel: search.fuel || [],
    min_power: search.min_power || 50,
    max_power: search.max_power || 500,
    gearbox: search.gearbox || '',
    body: search.body || [],
    color: search.color || [],
  });

  const { Field, handleSubmit, store } = useForm({
    ...searchFormOptions,
    onSubmit: ({ value }) => navigate({ to: '.', search: { ...value } }),
  });

  const { data: carInfo } = useSuspenseQuery(getCarInfoQueryOptions());
  const carMakeId = useStore(store, (state) => state.values.make);
  const { data: makeInfo, isLoading, isError } = useQuery(getCarMakeInfoQueryOptions(carMakeId));

  const { data: adverts } = useSuspenseQuery(getAdvertsQueryOptions(stringifySearch(search)));
  const { data, meta } = adverts;

  return (
    <div className="my-20 flex min-h-screen flex-col items-center gap-10 py-10 md:px-4">
      <Header />
      <form
        className="flex max-w-7xl flex-wrap items-end gap-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field
          name="make"
          children={({ name, state, handleBlur, handleChange }) => (
            <Combobox
              label="Marka"
              name={name}
              placeholder="BMW"
              items={carInfo.car_types[0].car_makes}
              chosen={carInfo.car_types[0].car_makes.find((make) => make.id === state.value) || null}
              onBlur={handleBlur}
              onChosen={(chosen) => handleChange(chosen?.id || '')}
            />
          )}
        />

        <Field
          name="model"
          children={({ name, state, handleBlur, handleChange }) => (
            <Combobox
              label="Model"
              name={name}
              placeholder="Seria 5"
              disabled={!carMakeId || isLoading || isError}
              items={makeInfo?.car_models || []}
              chosen={makeInfo?.car_models?.find((model) => model.id === state.value) || null}
              onBlur={handleBlur}
              onChosen={(chosen) => handleChange(chosen?.id || '')}
            />
          )}
        />

        <Field
          name="min_mileage"
          children={({ name, state, handleBlur, handleChange }) => (
            <Input
              label="Minimalny przebieg"
              name={name}
              type="text"
              placeholder="10000"
              value={state.value.toString()}
              invalid={!state.meta.isValid && state.meta.isTouched}
              onBlur={handleBlur}
              onChange={(e) => handleChange(Number(e.target.value) || 0)}
            />
          )}
        />

        <Field
          name="max_mileage"
          children={({ name, state, handleBlur, handleChange }) => (
            <Input
              label="Maksymalny przebieg"
              name={name}
              type="text"
              placeholder="200000"
              value={state.value}
              invalid={!state.meta.isValid && state.meta.isTouched}
              onBlur={handleBlur}
              onChange={(e) => handleChange(Number(e.target.value) || 0)}
            />
          )}
        />

        <Field
          name="body"
          children={({ name, state, handleBlur, handleChange }) => (
            <Combobox
              label="Nadwozie"
              name={name}
              placeholder="Hatchback"
              items={carInfo.car_types[0].body_types || []}
              chosen={carInfo.car_types[0].body_types.find((type) => type.id === state.value[0]) || null}
              onBlur={handleBlur}
              onChosen={(chosen) => handleChange(chosen?.id ? [chosen.id] : [])}
            />
          )}
        />

        <Field
          name="min_year"
          children={({ name, state, handleBlur, handleChange }) => (
            <Input
              label="Minimalny rocznik"
              name={name}
              type="text"
              placeholder="1987"
              value={state.value}
              invalid={!state.meta.isValid && state.meta.isTouched}
              onBlur={handleBlur}
              onChange={(e) => handleChange(Number(e.target.value) || 0)}
            />
          )}
        />

        <Field
          name="max_year"
          children={({ name, state, handleBlur, handleChange }) => (
            <Input
              label="Maksymalny rocznik"
              name={name}
              type="text"
              placeholder="2018"
              value={state.value}
              invalid={!state.meta.isValid && state.meta.isTouched}
              onBlur={handleBlur}
              onChange={(e) => handleChange(Number(e.target.value) || 0)}
            />
          )}
        />

        <Field
          name="fuel"
          children={({ name, state, handleBlur, handleChange }) => (
            <Combobox
              label="Paliwo"
              name={name}
              placeholder="Diesel"
              items={carInfo.fuel_types || []}
              chosen={carInfo.fuel_types.find((type) => type.id === state.value[0]) || null}
              onBlur={handleBlur}
              onChosen={(chosen) => handleChange(chosen?.id ? [chosen.id] : [])}
            />
          )}
        />

        <Field
          name="min_power"
          children={({ name, state, handleBlur, handleChange }) => (
            <Input
              label="Minimalna moc silnika"
              name={name}
              type="text"
              placeholder="100"
              value={state.value}
              invalid={!state.meta.isValid && state.meta.isTouched}
              onBlur={handleBlur}
              onChange={(e) => handleChange(Number(e.target.value) || 0)}
            />
          )}
        />

        <Field
          name="max_power"
          children={({ name, state, handleBlur, handleChange }) => (
            <Input
              label="Maksymalna moc silnika"
              name={name}
              type="text"
              placeholder="500"
              value={state.value}
              invalid={!state.meta.isValid && state.meta.isTouched}
              onBlur={handleBlur}
              onChange={(e) => handleChange(Number(e.target.value) || 0)}
            />
          )}
        />

        <Field
          name="gearbox"
          children={({ name, state, handleBlur, handleChange }) => (
            <Combobox
              label="Skrzynia"
              name={name}
              placeholder="Manualna"
              items={carInfo.gearbox_types || []}
              chosen={carInfo.gearbox_types.find((type) => type.id === state.value) || null}
              onBlur={handleBlur}
              onChosen={(chosen) => handleChange(chosen?.id || '')}
            />
          )}
        />

        <Field
          name="color"
          children={({ name, state, handleBlur, handleChange }) => (
            <Combobox
              label="Kolor"
              name={name}
              placeholder="Czarny"
              items={carInfo.colors || []}
              chosen={carInfo.colors.find((color) => color.id === state.value[0]) || null}
              onBlur={handleBlur}
              onChosen={(chosen) => handleChange(chosen?.id ? [chosen.id] : [])}
            />
          )}
        />

        <Field
          name="damaged"
          children={({ name, state, handleBlur, handleChange }) => (
            <Checkbox
              label="Uszkodzony"
              checked={state.value}
              name={name}
              onBlur={handleBlur}
              onChange={handleChange}
              className="mb-2"
            />
          )}
        />

        <div className="flex w-full items-end gap-4">
          <Field
            name="query"
            children={({ name, state, handleBlur, handleChange }) => (
              <Input
                label="Szukaj..."
                name={name}
                type="search"
                placeholder="Mazda MX-5"
                value={state.value}
                invalid={!state.meta.isValid && state.meta.isTouched}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                className="flex-1"
              />
            )}
          />

          <Button type="submit" className="h-11">
            Zastosuj filtry
          </Button>
        </div>
      </form>
      <PaginatedAdverts
        adverts={data}
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
        onChange={(pageNumber) => navigate({ to: '.', search: { page: pageNumber } })}
      />
    </div>
  );
};

export default Search;
