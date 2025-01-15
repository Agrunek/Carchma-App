import { createLazyFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import Snackbar from '@/components/molecules/Snackbar';
import LoginForm from '@/components/templates/LoginForm';
import { login } from '@/middleware/api';
import { AUTH_KEY } from '@/hooks/useAuth';

export const Route = createLazyFileRoute('/login')({
  component: Login,
});

function Login() {
  const { queryClient } = Route.useRouteContext();

  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [AUTH_KEY], exact: true }),
  });

  return (
    <div className="flex w-full justify-center p-4">
      <LoginForm loading={isPending || isSuccess} onSubmit={mutate} />
      <Snackbar message="Nieprawidłowy email lub hasło" open={isError} onClose={reset} variant="error" />
    </div>
  );
}
