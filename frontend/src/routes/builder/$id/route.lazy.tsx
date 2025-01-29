import { useEffect } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import Button from '@/components/atoms/Button';
import RouterFeedback from '@/components/templates/RouterFeedback';
import { getAdvertQueryOptions, getInfoQueryOptions } from '@/middleware/queryOptions';

export const Route = createLazyFileRoute('/builder/$id')({
  component: Builder,
  errorComponent: BuilderError,
});

function Builder() {
  const { id } = Route.useParams();
  const { step } = Route.useSearch();

  const { data: advert } = useSuspenseQuery(getAdvertQueryOptions(id));
  const { data: info } = useSuspenseQuery(getInfoQueryOptions());

  console.log(step, info, advert);

  return null;
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
