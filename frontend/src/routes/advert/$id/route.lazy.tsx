import { useEffect } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import useAdvert from '@/hooks/useAdvert';
import Button from '@/components/atoms/Button';
import Header from '@/components/organisms/Header';
import AdvertView from '@/components/templates/AdvertView';
import RouterFeedback from '@/components/templates/RouterFeedback';

export const Route = createLazyFileRoute('/advert/$id')({
  component: Advert,
  errorComponent: AdvertError,
});

function Advert() {
  const { id } = Route.useParams();

  const { advert } = useAdvert(id);

  return (
    <>
      <Header />
      <div className="mt-16 flex w-full justify-center p-4">
        <AdvertView advert={advert} />
      </div>
    </>
  );
}

function AdvertError() {
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
