import axios from 'axios';

import { useCommonStore } from '@/stores/common';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const commonStore = useCommonStore();
    commonStore.setIsLoading(true);
    if (!config.headers.Authorization) {
      const token = localStorage.getItem('TOKEN');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    const commonStore = useCommonStore();
    commonStore.setIsLoading(false);
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    const commonStore = useCommonStore();
    commonStore.setIsLoading(false);
    return Promise.resolve(res.data);
  },
  (err) => {
    const commonStore = useCommonStore();
    commonStore.setIsLoading(false);
    return Promise.reject(err);
  }
);

export default axiosInstance;
