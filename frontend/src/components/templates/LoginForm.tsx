import type { LoginInputs } from '@/types/schema';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '@/components/atoms/Card';
import Link from '@/components/atoms/Link';
import Form from '@/components/molecules/Form';
import InputField from '@/components/molecules/InputField';
import { LoginSchema } from '@/types/schema';

interface LoginFormProps {
  loading?: boolean;
  onSubmit: (data: LoginInputs) => void;
}

const LoginForm = ({ loading, onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ disabled: loading, resolver: zodResolver(LoginSchema) });

  return (
    <Card className="mx-4 flex w-full max-w-md flex-col gap-4">
      <Form
        disabled={loading}
        loading={loading}
        onSubmit={handleSubmit(onSubmit)}
        submitTitle="Zaloguj się"
        title="Logowanie"
        className="flex flex-col gap-4"
      >
        <InputField
          label="E-mail"
          invalid={!!errors.email}
          invalidMessage={errors.email?.message}
          loading={loading}
          type="email"
          {...register('email')}
        />
        <InputField
          label="Hasło"
          invalid={!!errors.password}
          invalidMessage={errors.password?.message}
          loading={loading}
          type="password"
          {...register('password')}
        />
      </Form>
      <div className="flex justify-center">
        <Link disabled={loading}>Nie pamiętasz hasła?</Link>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <p>Nie masz konta?</p>
        <Link disabled={loading} to="/register">
          Załóż je teraz!
        </Link>
      </div>
    </Card>
  );
};

export default LoginForm;
