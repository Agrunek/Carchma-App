import type { LoginInputs } from '@/components/templates/LoginForm';
import type { RegisterInputs } from '@/components/templates/RegisterForm';
import type { ForgotPasswordInputs } from '@/components/templates/ForgotPasswordForm';
import type { ResetPasswordInputs } from '@/components/templates/ResetPasswordForm';
import type { UserPrivate } from '@/types/api';

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

export const getUserPrivate = async (): Promise<UserPrivate> => {
  return apiClient.get('/user');
};
