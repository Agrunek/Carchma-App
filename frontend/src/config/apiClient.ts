import type { AxiosError, CreateAxiosDefaults } from 'axios';

import axios from 'axios';
import queryClient from '@/config/queryClient';
import { AUTH_KEY } from '@/middleware/queryOptions';

interface ApiError {
  type?: string;
}

const config: CreateAxiosDefaults = {
  baseURL: 'http://localhost:5050',
  withCredentials: true,
};

const jwtClient = axios.create(config);

jwtClient.interceptors.response.use((response) => response.data);

const apiClient = axios.create(config);

const onError = async (error: AxiosError<ApiError>) => {
  const { config, response } = error;
  const { status, data } = response || {};

  if (config && status === 401 && data?.type === 'invalid_access_token') {
    try {
      await jwtClient.post('/auth/refresh');
      return jwtClient(config);
    } catch {
      queryClient.invalidateQueries({ queryKey: [AUTH_KEY], exact: true, refetchType: 'none' });
    }
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use((response) => response.data, onError);

export default apiClient;
