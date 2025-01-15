import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5050',
  withCredentials: true,
});

apiClient.interceptors.response.use((response) => response.data);

export default apiClient;
