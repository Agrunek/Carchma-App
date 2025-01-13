import { createLazyFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import Snackbar from '@/components/molecules/Snackbar';
import ForgotPasswordForm from '@/components/templates/ForgotPasswordForm';
import RouterFeedback from '@/components/templates/RouterFeedback';
import { sendPasswordResetEmail } from '@/middleware/api';

export const Route = createLazyFileRoute('/forgot-password')({
  component: ForgotPassword,
});

function ForgotPassword() {
  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  if (isSuccess) {
    return <RouterFeedback>Sprawdź skrzynkę mailową!</RouterFeedback>;
  }

  return (
    <div className="flex w-full justify-center p-4">
      <ForgotPasswordForm loading={isPending} onSubmit={mutate} />
      <Snackbar message="Spróbuj ponownie później" open={isError} onClose={reset} variant="error" />
    </div>
  );
}
