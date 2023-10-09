import axios from 'axios';
import { ElNotification } from 'element-plus';

import TokenService from '@/services/Token';
import store from '@/store';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (!error.response) {
      return;
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch('auth/refreshToken');
      } catch (e) {
        await store.dispatch('auth/logout');
        return;
      }
      axiosInstance.defaults.headers.common['token'] = TokenService.getAccessToken();
      error.config.headers['token'] = TokenService.getAccessToken();
      error.config.baseURL = undefined;
      return axiosInstance.request(originalRequest);
    }
    if (error.response.status === 500) {
      ElNotification({ message: 'Ошибка на сервере, попробуйте позже', duration: 10000, type: 'error' });
      // router.go(-1);
      console.log(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
