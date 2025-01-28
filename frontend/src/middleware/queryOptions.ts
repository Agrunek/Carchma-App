import { queryOptions } from '@tanstack/react-query';
import { getAdvert, getCarInfo, getMakeInfo, getUserPrivate } from '@/middleware/api';

export const AUTH_KEY = 'auth';

export const getAuthQueryOptions = () => {
  return queryOptions({
    queryKey: [AUTH_KEY],
    queryFn: getUserPrivate,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const INFO_KEY = 'info';

export const getCarInfoQueryOptions = () => {
  return queryOptions({
    queryKey: [INFO_KEY],
    queryFn: getCarInfo,
    staleTime: Infinity,
  });
};

export const getMakeInfoQueryOptions = (id: string, enabled?: boolean) => {
  return queryOptions({
    queryKey: [INFO_KEY, id],
    queryFn: () => getMakeInfo(id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};

export const ADVERT_KEY = 'advert';

export const getAdvertQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: [ADVERT_KEY, id],
    queryFn: () => getAdvert(id),
  });
};
