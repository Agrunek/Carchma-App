import { queryOptions } from '@tanstack/react-query';
import { getAdvert, getAdvertComments, getCarInfo, getMakeInfo, getUserPrivate, getUserPublic } from '@/middleware/api';

export const AUTH_KEY = 'auth';
export const USER_KEY = 'user';
export const INFO_KEY = 'info';
export const ADVERT_KEY = 'advert';
export const COMMENT_KEY = 'comment';

export const getAuthQueryOptions = () => {
  return queryOptions({
    queryKey: [AUTH_KEY],
    queryFn: getUserPrivate,
    staleTime: Infinity,
  });
};

export const getUserQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: [USER_KEY, id],
    queryFn: () => getUserPublic(id),
    enabled: !!id,
  });
};

export const getInfoQueryOptions = () => {
  return queryOptions({
    queryKey: [INFO_KEY],
    queryFn: getCarInfo,
    staleTime: Infinity,
  });
};

export const getMakeQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: [INFO_KEY, id],
    queryFn: () => getMakeInfo(id),
    staleTime: Infinity,
    enabled: !!id,
  });
};

export const getAdvertQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: [ADVERT_KEY, id],
    queryFn: () => getAdvert(id),
    enabled: !!id,
  });
};

export const getAdvertCommentsQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: [COMMENT_KEY, ADVERT_KEY, id],
    queryFn: () => getAdvertComments(id),
    enabled: !!id,
  });
};
