import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import Snackbar from '@/components/molecules/Snackbar';
import LoginForm from '@/components/templates/LoginForm';
import { login } from '@/middleware/api';

export const Route = createLazyFileRoute('/login')({
  component: Login,
});

function Login() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, reset } = useMutation({
    mutationFn: login,
    onSuccess: () => navigate({ to: '/', replace: true }),
  });

  return (
    <div className="flex w-full justify-center p-4">
      <LoginForm loading={isPending} onSubmit={mutate} />
      <Snackbar message="Nieprawidłowy email lub hasło" open={isError} onClose={reset} variant="error" />
    </div>
  );
}
