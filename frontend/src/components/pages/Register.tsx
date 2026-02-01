import { useRouteContext } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Link from '@/components/atoms/Link';
import { defaultFormOptions } from '@/utils/form';
import { register } from '@/middleware/api';
import { AUTH_KEY } from '@/middleware/queryOptions';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Nazwa użytkownika nie może być pusta'),
    email: z.email('Niepoprawny adres email'),
    password: z.string().min(8, 'Hasło musi mieć minimalnie 8 znaków'),
    confirm: z.string().min(8, 'Hasło musi mieć minimalnie 8 znaków'),
  })
  .refine((data) => data.password === data.confirm, { error: 'Hasła nie są takie same', path: ['confirm'] });

const registerFormOptions = defaultFormOptions(registerSchema, {
  name: '',
  email: '',
  password: '',
  confirm: '',
});

const Register = () => {
  const { queryClient } = useRouteContext({ from: '/auth/register' });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: register,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [AUTH_KEY], exact: true }),
  });

  const { Field, Subscribe, handleSubmit } = useForm({
    ...registerFormOptions,
    onSubmit: ({ value }) => mutate(value),
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex max-w-100 flex-1 flex-col gap-8 rounded-md border-2 border-white/70 bg-white/50 p-8 dark:border-black/70 dark:bg-black/50">
        <Text as="h1" variant="heading" className="text-center">
          Dołącz do nas
        </Text>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <Field
            name="name"
            children={({ name, state, handleBlur, handleChange }) => (
              <div className="flex min-h-24 flex-col gap-1">
                <Input
                  label="Nazwa użytkownika"
                  name={name}
                  type="text"
                  placeholder="Kowal87"
                  value={state.value}
                  loading={isPending || isSuccess}
                  invalid={!state.meta.isValid && state.meta.isTouched}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {!state.meta.isValid && state.meta.isTouched && (
                  <Text className="text-rose-600! dark:text-rose-500!">{state.meta.errors[0]?.message}</Text>
                )}
              </div>
            )}
          />

          <Field
            name="email"
            children={({ name, state, handleBlur, handleChange }) => (
              <div className="flex min-h-24 flex-col gap-1">
                <Input
                  label="Email"
                  name={name}
                  type="email"
                  placeholder="email@domena.com"
                  value={state.value}
                  loading={isPending || isSuccess}
                  invalid={!state.meta.isValid && state.meta.isTouched}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {!state.meta.isValid && state.meta.isTouched && (
                  <Text className="text-rose-600! dark:text-rose-500!">{state.meta.errors[0]?.message}</Text>
                )}
              </div>
            )}
          />

          <Field
            name="password"
            children={({ name, state, handleBlur, handleChange }) => (
              <div className="flex min-h-24 flex-col gap-1">
                <Input
                  label="Hasło"
                  name={name}
                  type="password"
                  placeholder="********"
                  value={state.value}
                  loading={isPending || isSuccess}
                  invalid={!state.meta.isValid && state.meta.isTouched}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {!state.meta.isValid && state.meta.isTouched && (
                  <Text className="text-rose-600! dark:text-rose-500!">{state.meta.errors[0]?.message}</Text>
                )}
              </div>
            )}
          />

          <Field
            name="confirm"
            children={({ name, state, handleBlur, handleChange }) => (
              <div className="flex min-h-24 flex-col gap-1">
                <Input
                  label="Potwierdź hasło"
                  name={name}
                  type="password"
                  placeholder="********"
                  value={state.value}
                  loading={isPending || isSuccess}
                  invalid={!state.meta.isValid && state.meta.isTouched}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {!state.meta.isValid && state.meta.isTouched && (
                  <Text className="text-rose-600! dark:text-rose-500!">{state.meta.errors[0]?.message}</Text>
                )}
              </div>
            )}
          />

          <Subscribe
            selector={(state) => state.canSubmit}
            children={(canSubmit) => (
              <Button type="submit" disabled={!canSubmit} loading={isPending || isSuccess}>
                Załóż konto
              </Button>
            )}
          />

          <Link to="/auth/login" className="text-center">
            Posiadasz konto?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
