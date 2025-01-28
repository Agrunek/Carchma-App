import { useQuery } from '@tanstack/react-query';
import { getMakeInfoQueryOptions } from '@/middleware/queryOptions';

const useMakeInfo = (id: string, enabled?: boolean) => {
  return useQuery(getMakeInfoQueryOptions(id, enabled));
};

export default useMakeInfo;
