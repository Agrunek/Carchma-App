import { useEffect } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import Button from '@/components/atoms/Button';
import Header from '@/components/organisms/Header';
import AdvertView from '@/components/templates/AdvertView';
import RouterFeedback from '@/components/templates/RouterFeedback';
import {
  getAdvertQueryOptions,
  getInfoQueryOptions,
  getMakeQueryOptions,
  getUserQueryOptions,
} from '@/middleware/queryOptions';
import { translateAdvert } from '@/utils/advert';

export const Route = createLazyFileRoute('/advert/$id')({
  component: Advert,
  errorComponent: AdvertError,
});

function Advert() {
  const { id } = Route.useParams();

  const { data: raw } = useSuspenseQuery(getAdvertQueryOptions(id));
  const { data: info } = useSuspenseQuery(getInfoQueryOptions());
  const { data: make } = useSuspenseQuery(getMakeQueryOptions(raw.make));
  const { data: user } = useSuspenseQuery(getUserQueryOptions(raw.userId));

  const advert = translateAdvert(raw, info, make);

  return (
    <>
      <Header />
      <div className="mt-16 flex w-full justify-center p-4">
        <AdvertView advert={advert} user={user} />
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
