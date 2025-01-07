import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '@/components/atoms/Card';
import Form from '@/components/molecules/Form';
import InputField from '@/components/molecules/InputField';

const RegisterSchema = z
  .object({
    name: z.string().min(1, 'Imię nie może być puste').max(255),
    email: z.string().email('Nieprawidłowy adres email').min(1).max(255),
    password: z.string().min(8, 'Hasło musi się składać z przynajmniej 8 znaków').max(255),
    confirm: z.string().min(8, 'Hasło musi się składać z przynajmniej 8 znaków').max(255),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Hasła nie są takie same',
    path: ['confirm'],
  });

export type RegisterInputs = z.infer<typeof RegisterSchema>;

interface RegisterFormProps {
  loading?: boolean;
  onSubmit: (data: RegisterInputs) => void;
}

const RegisterForm = ({ loading, onSubmit }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({ disabled: loading, resolver: zodResolver(RegisterSchema) });

  return (
    <Card className="mx-4 w-full max-w-md">
      <Form
        disabled={loading}
        loading={loading}
        onSubmit={handleSubmit(onSubmit)}
        submitTitle="Utwórz konto"
        title="Rejestracja"
        className="flex flex-col gap-4"
      >
        <InputField
          label="Imię"
          invalid={!!errors.name}
          invalidMessage={errors.name?.message}
          loading={loading}
          type="text"
          {...register('name')}
        />
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
        <InputField
          label="Powtórz hasło"
          invalid={!!errors.confirm}
          invalidMessage={errors.confirm?.message}
          loading={loading}
          type="password"
          {...register('confirm')}
        />
      </Form>
    </Card>
  );
};

export default RegisterForm;
