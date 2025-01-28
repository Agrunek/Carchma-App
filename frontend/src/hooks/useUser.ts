import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserQueryOptions } from '@/middleware/queryOptions';

const useUser = (id: string) => {
  const { data } = useSuspenseQuery(getUserQueryOptions(id));

  return { user: data };
};

export default useUser;
