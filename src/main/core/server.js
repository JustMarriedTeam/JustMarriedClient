/* eslint-disable no-param-reassign */

import axios from 'axios';
import Promise from 'bluebird';
import store from './store';

const axiosInstance = axios.create({
  baseURL: process.env.serverApiUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getState().account.token;

  if (accessToken) {
    if (config.method !== 'OPTIONS') {
      config.headers.token = accessToken;
    }
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
