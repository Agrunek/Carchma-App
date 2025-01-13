import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '@/components/atoms/Card';
import Link from '@/components/atoms/Link';
import Form from '@/components/molecules/Form';
import InputField from '@/components/molecules/InputField';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email').min(1).max(255),
});

export type ForgotPasswordInputs = z.infer<typeof ForgotPasswordSchema>;

interface ForgotPasswordFormProps {
  loading?: boolean;
  onSubmit: (data: ForgotPasswordInputs) => void;
}

const ForgotPasswordForm = ({ loading, onSubmit }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>({ disabled: loading, resolver: zodResolver(ForgotPasswordSchema) });

  return (
    <Card className="flex w-full max-w-md flex-col items-center gap-4">
      <Form
        disabled={loading}
        loading={loading}
        onSubmit={handleSubmit(onSubmit)}
        submitTitle="Wyślij maila"
        title="Aktualizacja hasła"
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

export default ForgotPasswordForm;
