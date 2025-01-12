import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '@/components/atoms/Card';
import Link from '@/components/atoms/Link';
import Form from '@/components/molecules/Form';
import InputField from '@/components/molecules/InputField';

const LoginSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email').min(1).max(255),
  password: z.string().min(8, 'Hasło musi się składać z przynajmniej 8 znaków').max(255),
});

export type LoginInputs = z.infer<typeof LoginSchema>;

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
    <Card className="m-4 flex w-full max-w-md flex-col items-center gap-4">
      <Form
        disabled={loading}
        loading={loading}
        onSubmit={handleSubmit(onSubmit)}
        submitTitle="Zaloguj się"
        title="Logowanie"
        className="flex w-full flex-col gap-4"
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
        <Link disabled={loading}>Nie pamiętam hasła...</Link>
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
