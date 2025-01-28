import { useEffect } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import useCarInfo from '@/hooks/useCarInfo';
import useAdvert from '@/hooks/useAdvert';
import Button from '@/components/atoms/Button';
import RouterFeedback from '@/components/templates/RouterFeedback';

export const Route = createLazyFileRoute('/builder/$id')({
  component: Builder,
  errorComponent: BuilderError,
});

function Builder() {
  const { id } = Route.useParams();
  const { step } = Route.useSearch();

  const { info } = useCarInfo();
  const { advert } = useAdvert(id);

  console.log(step, info, advert);

  return <></>;
}

function BuilderError() {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <RouterFeedback
      actionNode={
        <Button variant="tertiary" onClick={() => router.invalidate()}>
          Spróbuj ponownie
        </Button>
      }
    >
      Nie znaleziono ogłoszenia...
    </RouterFeedback>
  );
}
