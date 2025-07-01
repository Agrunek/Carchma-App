import { queryOptions } from '@tanstack/react-query';
import { getAdvert, getAdverts } from '@/middleware/api';

export const ADVERT_KEY = 'advert';
export const AUTH_KEY = 'auth';

export const getAdvertQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: [ADVERT_KEY, id],
    queryFn: () => getAdvert(id),
  });
};

export const getAdvertsQueryOptions = (params: Parameters<typeof getAdverts>[0]) => {
  return queryOptions({
    queryKey: [ADVERT_KEY, params],
    queryFn: () => getAdverts(params),
  });
};
