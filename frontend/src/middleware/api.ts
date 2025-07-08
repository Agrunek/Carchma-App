import type * as API from '@/types/api';

import apiClient from '@/config/apiClient';

/* Advert */

export const postAdvert = async (data: API.PostAdvertData): Promise<API.PostAdvertResult> => {
  return apiClient.post('advert', data);
};

export const patchAdvert = async (id: string, data: API.PatchAdvertData): Promise<API.PatchAdvertResult> => {
  return apiClient.patch(`advert/${id}`, data);
};

export const getAdvert = async (id: string): Promise<API.GetAdvertResult> => {
  return apiClient.get(`advert/${id}`);
};

export const getAdvertsFromUser = async (
  userId: string,
  params: API.GetAdvertsFromUserParams,
): Promise<API.GetAdvertsFromUserResult> => {
  return apiClient.get(`advert/from-user/${userId}`, { params });
};

export const getAdverts = async (params: API.GetAdvertsParams): Promise<API.GetAdvertsResult> => {
  return apiClient.get('advert', { params });
};

/* Auth */

export const register = async (data: API.RegisterData): Promise<API.RegisterResult> => {
  return apiClient.post('auth/register', data);
};

export const login = async (data: API.LoginData): Promise<API.LoginResult> => {
  return apiClient.post('auth/login', data);
};

export const logout = async (): Promise<API.LogoutResult> => {
  return apiClient.post('auth/logout');
};

export const emailVerification = async (code: string): Promise<API.EmailVerificationResult> => {
  return apiClient.post(`auth/verify-email/${code}`);
};

export const forgotPassword = async (data: API.ForgotPasswordData): Promise<API.ForgotPasswordResult> => {
  return apiClient.post('auth/forgot-password', data);
};

export const resetPassword = async (code: string, data: API.ResetPasswordData): Promise<API.ResetPasswordResult> => {
  return apiClient.post(`auth/reset-password/${code}`, data);
};

/* Comment */

export const postComment = async (advertId: string, data: API.PostCommentData): Promise<API.PostCommentResult> => {
  return apiClient.post(`comment/${advertId}`, data);
};

export const putReaction = async (id: string, data: API.PutReactionData): Promise<API.PutReactionResult> => {
  return apiClient.put(`comment/react/${id}`, data);
};

export const patchComment = async (id: string, data: API.PatchCommentData): Promise<API.PatchCommentResult> => {
  return apiClient.patch(`comment/${id}`, data);
};

export const getComment = async (id: string): Promise<API.GetCommentResult> => {
  return apiClient.get(`comment/${id}`);
};

export const getCommentsFromAdvert = async (
  advertId: string,
  params: API.GetCommentsFromAdvertParams,
): Promise<API.GetCommentsFromAdvertResult> => {
  return apiClient.get(`comment/from-advert/${advertId}`, { params });
};

export const getReaction = async (id: string): Promise<API.GetReactionResult> => {
  return apiClient.get(`comment/react/${id}`);
};

export const deleteComment = async (id: string): Promise<API.DeleteCommentResult> => {
  return apiClient.delete(`comment/${id}`);
};

export const deleteReaction = async (id: string): Promise<API.DeleteReactionResult> => {
  return apiClient.delete(`comment/react/${id}`);
};

/* Image */

export const postImages = async (advertId: string, data: API.PostImagesData): Promise<API.PostImagesResult> => {
  return apiClient.postForm(`image/${advertId}`, data);
};

export const deleteImage = async (id: string): Promise<API.DeleteImageResult> => {
  return apiClient.delete(`image/${id}`);
};

/* Info */

export const getCarInfo = async (): Promise<API.GetCarInfoResult> => {
  return apiClient.get('info');
};

export const getCarMakeInfo = async (id: string): Promise<API.GetCarMakeInfoResult> => {
  return apiClient.get(`info/${id}`);
};

/* Report */

export const postAdvertReport = async (
  id: string,
  data: API.PostAdvertReportData,
): Promise<API.PostAdvertReportResult> => {
  return apiClient.post(`report/advert/${id}`, data);
};

export const postCommentReport = async (
  id: string,
  data: API.PostCommentReportData,
): Promise<API.PostCommentReportResult> => {
  return apiClient.post(`report/comment/${id}`, data);
};

export const getReports = async (params: API.GetReportsParams): Promise<API.GetReportsResult> => {
  return apiClient.get('report', { params });
};

/* User */

export const getCurrentProfile = async (): Promise<API.GetCurrentProfileResult> => {
  return apiClient.get('user');
};

export const getAnyProfile = async (id: string): Promise<API.GetAnyProfileResult> => {
  return apiClient.get(`user/${id}`);
};
