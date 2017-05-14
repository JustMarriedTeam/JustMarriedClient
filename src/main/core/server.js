/* eslint-disable no-param-reassign */

import axios from 'axios';
import Promise from 'bluebird';
import store from './store';
import { signOut } from './actions/account.actions';
import { removeTransientIdentifiers } from './utils/conversion.utils';
import isObject from 'lodash/isObject';

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_API_URL,
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

axiosInstance.interceptors.request.use((config) => {
  if (isObject(config.data)) {
    removeTransientIdentifiers(config.data);
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
