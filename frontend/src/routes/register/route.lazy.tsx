import { createLazyFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import Snackbar from '@/components/molecules/Snackbar';
import RegisterForm from '@/components/templates/RegisterForm';
import { register } from '@/middleware/api';
import { AUTH_KEY } from '@/hooks/useAuth';

export const Route = createLazyFileRoute('/register')({
  component: Register,
});

function Register() {
  const { queryClient } = Route.useRouteContext();

  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: register,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [AUTH_KEY], exact: true }),
  });

  return (
    <div className="flex w-full justify-center p-4">
      <RegisterForm loading={isPending || isSuccess} onSubmit={mutate} />
      <Snackbar message="Konto z podanym mailem już istnieje" open={isError} onClose={reset} variant="error" />
    </div>
  );
}
