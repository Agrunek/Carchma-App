import type { LoginInputs, RegisterInputs } from '@/types/schema';

import apiClient from '@/config/apiClient';

export const login = async (data: LoginInputs) => {
  return apiClient.post('auth/login', data);
};

export const register = async (data: RegisterInputs) => {
  return apiClient.post('auth/register', data);
};
