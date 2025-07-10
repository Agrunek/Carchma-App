import { queryOptions } from '@tanstack/react-query';
import {
  getAdvert,
  getAdverts,
  getAdvertsFromUser,
  getAnyProfile,
  getCarInfo,
  getCarMakeInfo,
  getComment,
  getCommentsFromAdvert,
  getCurrentProfile,
  getReaction,
  getReports,
} from '@/middleware/api';

export const ADVERT_KEY = 'advert';
export const AUTH_KEY = 'auth';
export const COMMENT_KEY = 'comment';
export const REACTION_KEY = 'reaction';
export const INFO_KEY = 'info';
export const REPORT_KEY = 'report';
export const USER_KEY = 'user';

export const getAdvertQueryOptions = (...[id]: Parameters<typeof getAdvert>) => {
  return queryOptions({
    queryKey: [ADVERT_KEY, id],
    queryFn: () => getAdvert(id),
  });
};

export const getAdvertsFromUserQueryOptions = (...[userId, params]: Parameters<typeof getAdvertsFromUser>) => {
  return queryOptions({
    queryKey: [ADVERT_KEY, params, USER_KEY, userId],
    queryFn: () => getAdvertsFromUser(userId, params),
  });
};

export const getAdvertsQueryOptions = (...[params]: Parameters<typeof getAdverts>) => {
  return queryOptions({
    queryKey: [ADVERT_KEY, params],
    queryFn: () => getAdverts(params),
  });
};

export const getCurrentProfileQueryOptions = () => {
  return queryOptions({
    queryKey: [AUTH_KEY],
    queryFn: () => getCurrentProfile(),
    staleTime: Infinity,
  });
};

export const getCommentQueryOptions = (...[id]: Parameters<typeof getComment>) => {
  return queryOptions({
    queryKey: [COMMENT_KEY, id],
    queryFn: () => getComment(id),
  });
};

export const getCommentsFromAdvertQueryOptions = (...[advertId, params]: Parameters<typeof getCommentsFromAdvert>) => {
  return queryOptions({
    queryKey: [COMMENT_KEY, params, ADVERT_KEY, advertId],
    queryFn: () => getCommentsFromAdvert(advertId, params),
  });
};

export const getReactionQueryOptions = (...[id]: Parameters<typeof getReaction>) => {
  return queryOptions({
    queryKey: [COMMENT_KEY, id, REACTION_KEY],
    queryFn: () => getReaction(id),
  });
};

export const getCarInfoQueryOptions = () => {
  return queryOptions({
    queryKey: [INFO_KEY],
    queryFn: () => getCarInfo(),
    staleTime: Infinity,
  });
};

export const getCarMakeInfoQueryOptions = (...[id]: Parameters<typeof getCarMakeInfo>) => {
  return queryOptions({
    queryKey: [INFO_KEY, id],
    queryFn: () => getCarMakeInfo(id),
    staleTime: Infinity,
  });
};

export const getReportsQueryOptions = (...[params]: Parameters<typeof getReports>) => {
  return queryOptions({
    queryKey: [REPORT_KEY, params],
    queryFn: () => getReports(params),
  });
};

export const getAnyProfileQueryOptions = (...[id]: Parameters<typeof getAnyProfile>) => {
  return queryOptions({
    queryKey: [USER_KEY, id],
    queryFn: () => getAnyProfile(id),
  });
};
