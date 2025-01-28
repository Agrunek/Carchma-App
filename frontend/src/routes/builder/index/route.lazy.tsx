import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import Snackbar from '@/components/molecules/Snackbar';
import BuilderFirstStep from '@/components/templates/BuilderFirstStep';
import { createAdvert } from '@/middleware/api';

export const Route = createLazyFileRoute('/builder/')({
  component: Builder,
});

function Builder() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: createAdvert,
    onSuccess: () => navigate({ to: '/' }),
  });

  return (
    <div className="flex w-full justify-center p-4">
      <BuilderFirstStep loading={isPending || isSuccess} onSubmit={mutate} />
      <Snackbar message="Wystąpił błąd podczas zapisu zmian" open={isError} onClose={reset} variant="error" />
    </div>
  );
}
