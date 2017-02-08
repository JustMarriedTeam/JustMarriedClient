/* eslint-disable no-param-reassign */

import axios from 'axios';
import Promise from 'bluebird';
import store from './store';
import { signOut } from './actions/account.actions';

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
});

axiosInstance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    store.dispatch(signOut());
  }
  return Promise.reject(error);
});

export default axiosInstance;
