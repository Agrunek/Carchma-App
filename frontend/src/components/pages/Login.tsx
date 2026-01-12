import { useRouteContext } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { defaultFormOptions } from '@/utils/form';
import { login } from '@/middleware/api';
import { AUTH_KEY } from '@/middleware/queryOptions';

const loginSchema = z.object({
  email: z.email('Niepoprawny adres email'),
  password: z.string().min(8, 'Hasło musi mieć minimalnie 8 znaków'),
});

const loginFormOptions = defaultFormOptions(loginSchema, {
  email: '',
  password: '',
});

const Login = () => {
  const { queryClient } = useRouteContext({ from: '/auth/login' });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [AUTH_KEY], exact: true }),
  });

  const { Field, Subscribe, handleSubmit } = useForm({
    ...loginFormOptions,
    onSubmit: ({ value }) => mutate(value),
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex max-w-100 flex-1 flex-col gap-8 rounded-md border-2 border-white/70 bg-white/50 p-8 dark:border-black/70 dark:bg-black/50">
        <Text as="h1" variant="heading" className="text-center">
          Miło Cię widzieć
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

          <Subscribe
            selector={(state) => state.canSubmit}
            children={(canSubmit) => (
              <Button type="submit" disabled={!canSubmit} loading={isPending || isSuccess}>
                Zaloguj się
              </Button>
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
