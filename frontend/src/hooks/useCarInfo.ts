import { useSuspenseQuery } from '@tanstack/react-query';
import { getCarInfoQueryOptions } from '@/middleware/queryOptions';

const useCarInfo = () => {
  const { data } = useSuspenseQuery(getCarInfoQueryOptions());

  return { info: data };
};

export default useCarInfo;
