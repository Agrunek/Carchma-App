import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import Snackbar from '@/components/molecules/Snackbar';
import RegisterForm from '@/components/templates/RegisterForm';
import { register } from '@/middleware/api';

export const Route = createLazyFileRoute('/register')({
  component: Register,
});

function Register() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, reset } = useMutation({
    mutationFn: register,
    onSuccess: () => navigate({ to: '/', replace: true }),
  });

  return (
    <div className="flex w-full justify-center p-4">
      <RegisterForm loading={isPending} onSubmit={mutate} />
      <Snackbar message="Konto z podanym mailem już istnieje" open={isError} onClose={reset} variant="error" />
    </div>
  );
}
