import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '@/components/atoms/Card';
import Link from '@/components/atoms/Link';
import Form from '@/components/molecules/Form';
import InputField from '@/components/molecules/InputField';

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Hasło musi się składać z przynajmniej 8 znaków').max(255),
    confirm: z.string().min(8, 'Hasło musi się składać z przynajmniej 8 znaków').max(255),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Hasła nie są takie same',
    path: ['confirm'],
  });

export type ResetPasswordInputs = z.infer<typeof ResetPasswordSchema>;

interface ResetPasswordFormProps {
  loading?: boolean;
  onSubmit: (data: ResetPasswordInputs) => void;
}

const ResetPasswordForm = ({ loading, onSubmit }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({ disabled: loading, resolver: zodResolver(ResetPasswordSchema) });

  return (
    <Card className="flex w-full max-w-md flex-col items-center gap-4">
      <Form
        disabled={loading}
        loading={loading}
        onSubmit={handleSubmit(onSubmit)}
        submitTitle="Zmień hasło"
        title="Aktualizacja hasła"
        className="flex w-full flex-col gap-4"
      >
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
      <div className="flex flex-wrap justify-center gap-2">
        <p>Pamiętasz hasło?</p>
        <Link disabled={loading} to="/login">
          Zaloguj się!
        </Link>
      </div>
    </Card>
  );
};

export default ResetPasswordForm;
