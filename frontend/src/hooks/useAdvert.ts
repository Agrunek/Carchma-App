import { useSuspenseQuery } from '@tanstack/react-query';
import { getAdvertQueryOptions } from '@/middleware/queryOptions';

const useAdvert = (id: string) => {
  const { data } = useSuspenseQuery(getAdvertQueryOptions(id));

  return { advert: data };
};

export default useAdvert;
