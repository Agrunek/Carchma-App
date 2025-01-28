import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useCarInfo from '@/hooks/useCarInfo';
import useMakeInfo from '@/hooks/useMakeInfo';
import Card from '@/components/atoms/Card';
import Form from '@/components/molecules/Form';
import CheckboxField from '@/components/molecules/CheckboxField';
import ComboboxField from '@/components/molecules/ComboboxField';
import InputField from '@/components/molecules/InputField';
import { schemaWrapper } from '@/utils/schema';
import { tw } from '@/utils/string';

const BuilderFirstStepSchema = z.object({
  type: schemaWrapper(z.string().min(1), 'type', 'Nieprawidłowy typ'),
  vin: schemaWrapper(z.string().min(1).max(17), 'vin', 'Nieprawidłowy vin'),
  registrationNumber: schemaWrapper(z.string().min(1).max(8), 'registrationNumber', 'Nieprawidłowa rejestracja'),
  dateOfFirstRegistration: schemaWrapper(z.string().date(), 'dateOfFirstRegistration', 'Nieprawidłowa data'),
  mileage: schemaWrapper(z.coerce.number().int().nonnegative(), 'mileage', 'Nieprawidłowa wartość'),
  damaged: schemaWrapper(z.coerce.boolean(), 'damaged', 'Nieprawidłowy wybór'),
  make: schemaWrapper(z.string().min(1), 'make', 'Nieprawidłowa marka'),
  model: schemaWrapper(z.string().min(1), 'model', 'Nieprawidłowy model'),
  year: schemaWrapper(z.coerce.number().int().min(1900), 'year', 'Nieprawidłowy rocznik'),
  fuel: schemaWrapper(z.string().min(1), 'fuel', 'Nieprawidłowy typ paliwa'),
  power: schemaWrapper(z.coerce.number().int().positive(), 'power', 'Nieprawidłowa moc'),
  displacement: schemaWrapper(z.coerce.number().int().positive(), 'displacement', 'Nieprawidłowa pojemność skokowa'),
  doors: schemaWrapper(z.coerce.number().int().positive(), 'doors', 'Nieprawidłowa liczba drzwi'),
  gearbox: schemaWrapper(z.string().min(1), 'gearbox', 'Nieprawidłowa skrzynia biegów'),
  body: schemaWrapper(z.string().min(1), 'body', 'Nieprawidłowy typ nadwozia'),
  color: schemaWrapper(z.string().min(1), 'color', 'Nieprawidłowy kolor'),
});

export type BuilderFirstStepInputs = z.infer<typeof BuilderFirstStepSchema>;

interface BuilderFirstStepProps {
  loading?: boolean;
  onSubmit: (data: BuilderFirstStepInputs) => void;
}

const BuilderFirstStep = ({ loading, onSubmit }: BuilderFirstStepProps) => {
  const { info } = useCarInfo();

  const { control, handleSubmit, watch } = useForm<BuilderFirstStepInputs>({
    disabled: loading,
    resolver: zodResolver(BuilderFirstStepSchema),
  });

  const carType = info.car_types.find((type) => type.id === watch('type'));

  const carMakes = carType?.car_makes || [];
  const carBodies = carType?.body_types || [];

  const carMake = watch('make');
  const { data, isLoading, isError, isSuccess } = useMakeInfo(carMake, !!carMake);
  const carModels = isSuccess ? data.car_models : [];

  return (
    <Card className="flex w-full max-w-2xl flex-col items-center">
      <Form
        disabled={loading}
        loading={loading}
        onSubmit={handleSubmit(onSubmit)}
        submitTitle="Zapisz zmiany"
        submitClassName={tw`col-span-full`}
        title="Informacje o pojeździe"
        titleClassName={tw`col-span-full`}
        className="grid w-full grid-cols-1 items-center justify-center gap-x-8 gap-y-4 sm:grid-cols-2"
      >
        <Controller
          name="type"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ComboboxField
              label="Typ pojazdu"
              items={info.car_types}
              chosen={info.car_types.find((type) => type.id === field.value) || null}
              onChosen={(chosen) => field.onChange(chosen?.id)}
              invalid={!!error}
              invalidMessage={error?.message}
              disabled={field.disabled}
              loading={loading}
              required
            />
          )}
        />
        <Controller
          name="vin"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Numer VIN"
              invalid={!!error}
              invalidMessage={error?.message}
              loading={loading}
              type="text"
              placeholder="WDBRF52H76F783280"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="registrationNumber"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Numer rejestracyjny"
              invalid={!!error}
              invalidMessage={error?.message}
              loading={loading}
              type="text"
              placeholder="KSU9TS45"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="dateOfFirstRegistration"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Data pierwszej rejestracji"
              invalid={!!error}
              invalidMessage={error?.message}
              loading={loading}
              type="date"
              placeholder="YYYY-MM-DD"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="mileage"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Przebieg (km)"
              invalid={!!error}
              invalidMessage={error?.message}
              loading={loading}
              type="text"
              placeholder="100000"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="damaged"
          control={control}
          defaultValue={false}
          render={({ field, fieldState: { error } }) => (
            <CheckboxField
              label="Uszkodzony"
              invalid={!!error}
              invalidMessage={error?.message}
              loading={loading}
              {...field}
            />
          )}
        />
        <Controller
          name="make"
          control={control}
          disabled={!carType}
          render={({ field, fieldState: { error } }) => (
            <ComboboxField
              label="Marka"
              items={carMakes}
              chosen={carMakes.find((make) => make.id === field.value) || null}
              onChosen={(chosen) => field.onChange(chosen?.id)}
              invalid={!!error}
              invalidMessage={error?.message}
              disabled={field.disabled}
              loading={loading}
              required
            />
          )}
        />
        <Controller
          name="model"
          control={control}
          disabled={!carMake || isLoading}
          render={({ field, fieldState: { error } }) => (
            <ComboboxField
              label="Model"
              items={carModels}
              chosen={carModels.find((model) => model.id === field.value) || null}
              onChosen={(chosen) => field.onChange(chosen?.id)}
              invalid={!!error || isError}
              invalidMessage={error?.message || 'Serwer nie odpowiada...'}
              disabled={field.disabled}
              loading={loading || isLoading}
              required
            />
          )}
        />
        <Controller
          name="year"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Rok produkcji"
              invalid={!!error}
              invalidMessage={error?.message}
              loading={loading}
              type="text"
              placeholder="2002"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="fuel"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ComboboxField
              label="Rodzaj paliwa"
              items={info.fuel_types}
              chosen={info.fuel_types.find((fuel) => fuel.id === field.value) || null}
              onChosen={(chosen) => field.onChange(chosen?.id)}
              invalid={!!error}
              invalidMessage={error?.message}
              disabled={field.disabled}
              loading={loading}
              required
            />
          )}
        />
        <Controller
          name="power"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Moc (KM)"
              invalid={!!error}
              invalidMessage={error?.message}
              loading={loading}
              type="text"
              placeholder="420"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="displacement"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Pojemność skokowa (cm3)"
              invalid={!!error}
              invalidMessage={error?.message}
              loading={loading}
              type="text"
              placeholder="2993"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="doors"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Liczba drzwi"
              invalid={!!error}
              invalidMessage={error?.message}
              loading={loading}
              type="text"
              placeholder="4"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="gearbox"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ComboboxField
              label="Skrzynia biegów"
              items={info.gearbox_types}
              chosen={info.gearbox_types.find((gearbox) => gearbox.id === field.value) || null}
              onChosen={(chosen) => field.onChange(chosen?.id)}
              invalid={!!error}
              invalidMessage={error?.message}
              disabled={field.disabled}
              loading={loading}
              required
            />
          )}
        />
        <Controller
          name="body"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ComboboxField
              label="Typ nadwozia"
              items={carBodies}
              chosen={carBodies.find((body) => body.id === field.value) || null}
              onChosen={(chosen) => field.onChange(chosen?.id)}
              invalid={!!error}
              invalidMessage={error?.message}
              disabled={field.disabled}
              loading={loading}
              required
            />
          )}
        />
        <Controller
          name="color"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ComboboxField
              label="Kolor"
              items={info.colors}
              chosen={info.colors.find((color) => color.id === field.value) || null}
              onChosen={(chosen) => field.onChange(chosen?.id)}
              invalid={!!error}
              invalidMessage={error?.message}
              disabled={field.disabled}
              loading={loading}
              required
            />
          )}
        />
      </Form>
    </Card>
  );
};

export default BuilderFirstStep;
