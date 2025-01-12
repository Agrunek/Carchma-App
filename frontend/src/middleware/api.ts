import type { LoginInputs } from '@/components/templates/LoginForm';
import type { RegisterInputs } from '@/components/templates/RegisterForm';

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
