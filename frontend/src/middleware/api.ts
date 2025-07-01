import type {
  GetAdvertResult,
  GetAdvertsParams,
  GetAdvertsResult,
  PatchAdvertData,
  PatchAdvertResult,
  PostAdvertData,
  PostAdvertResult,
} from '../types/api';

import apiClient from '@/config/apiClient';

/* Advert */

export const postAdvert = async (data: PostAdvertData): Promise<PostAdvertResult> => {
  return apiClient.post('advert', data);
};

export const patchAdvert = async (id: string, data: PatchAdvertData): Promise<PatchAdvertResult> => {
  return apiClient.patch(`advert/${id}`, data);
};

export const getAdvert = async (id: string): Promise<GetAdvertResult> => {
  return apiClient.get(`advert/${id}`);
};

export const getAdverts = async (params: GetAdvertsParams): Promise<GetAdvertsResult> => {
  return apiClient.get('advert', { params });
};
