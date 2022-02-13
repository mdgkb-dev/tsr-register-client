import axios from 'axios';

import router from '@/router';
import TokenService from '@/services/Token';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      TokenService.clearTokens();
      await router.push('/login');
      return axiosInstance.request(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
