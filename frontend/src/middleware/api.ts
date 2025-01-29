import type { LoginInputs } from '@/components/templates/LoginForm';
import type { RegisterInputs } from '@/components/templates/RegisterForm';
import type { ForgotPasswordInputs } from '@/components/templates/ForgotPasswordForm';
import type { ResetPasswordInputs } from '@/components/templates/ResetPasswordForm';
import type { BuilderFirstStepInputs } from '@/components/templates/BuilderFirstStep';
import type { Advert, CarInfo, CarMake, Comment, UserPrivate, UserPublic } from '@/types/api';

import apiClient from '@/config/apiClient';

export const login = async (data: LoginInputs) => {
  return apiClient.post('auth/login', data);
};

export const register = async (data: RegisterInputs) => {
  return apiClient.post('auth/register', data);
};

export const verifyEmail = async (code: string) => {
  return apiClient.post(`auth/verify-email/${code}`);
};

export const sendPasswordResetEmail = async (data: ForgotPasswordInputs) => {
  return apiClient.post('auth/forgot-password', data);
};

export const resetPassword = async (code: string, data: ResetPasswordInputs) => {
  return apiClient.post(`auth/reset-password/${code}`, data);
};

export const logout = async () => {
  return apiClient.post('auth/logout');
};

export const getUserPrivate = async (): Promise<UserPrivate> => {
  return apiClient.get('user');
};

export const getUserPublic = async (id: string): Promise<UserPublic> => {
  return apiClient.get(`user/${id}`);
};

export const getCarInfo = async (): Promise<CarInfo> => {
  return apiClient.get('info');
};

export const getMakeInfo = async (id: string): Promise<CarMake> => {
  return apiClient.get(`info/${id}`);
};

export const getAdvert = async (id: string): Promise<Advert> => {
  return apiClient.get(`advert/${id}`);
};

export const createAdvert = async (data: BuilderFirstStepInputs) => {
  return apiClient.post('advert', data);
};

export const getAdvertComments = async (id: string): Promise<Comment[]> => {
  return apiClient.get(`comment/advert/${id}`);
};
