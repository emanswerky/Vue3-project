import axios from 'axios';
import { store } from '/src/stores';

const request = axios.create({
  baseURL: 'https://api.auth.emanswerky.me/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
request.interceptors.request.use(function (config) {
  const token = store.token;

  // Do something before request is sent

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default request;
