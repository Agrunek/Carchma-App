import type { ResetPasswordInputs } from '@/components/templates/ResetPasswordForm';

import { createLazyFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import Link from '@/components/atoms/Link';
import Snackbar from '@/components/molecules/Snackbar';
import ResetPasswordForm from '@/components/templates/ResetPasswordForm';
import RouterFeedback from '@/components/templates/RouterFeedback';
import { resetPassword } from '@/middleware/api';

export const Route = createLazyFileRoute('/reset-password/$code')({
  component: ResetPassword,
});

function ResetPassword() {
  const { code } = Route.useParams();

  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: (data: ResetPasswordInputs) => resetPassword(code, data),
  });

  if (isSuccess) {
    return (
      <RouterFeedback
        actionNode={
          <Link to="/login" replace>
            Zaloguj się!
          </Link>
        }
      >
        Hasło zostało zmienione!
      </RouterFeedback>
    );
  }

  return (
    <div className="flex w-full justify-center p-4">
      <ResetPasswordForm loading={isPending} onSubmit={mutate} />
      <Snackbar message="Podany kod weryfikacyjny nie działa" open={isError} onClose={reset} variant="error" />
    </div>
  );
}
