import axios from 'axios';

import { useCommonStore } from '@/stores/common';

const setIsLoading = (value: boolean) => {
  const commonStore = useCommonStore();
  commonStore.setIsLoading(value);
};

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    setIsLoading(true);
    if (!config.headers.Authorization) {
      const token = localStorage.getItem('TOKEN');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    setIsLoading(false);
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    setIsLoading(false);
    return Promise.resolve(res.data);
  },
  (error) => {
    setIsLoading(false);
    return Promise.reject(error);
  }
);

export default axiosInstance;
