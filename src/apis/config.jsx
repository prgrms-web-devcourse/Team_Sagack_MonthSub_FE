import axios from 'axios';

const { REACT_APP_API_END_POINT } = process.env;

const request = axios.create({
  baseURL: `${REACT_APP_API_END_POINT}`,
  timeout: 5000,
});

request.interceptors.request.use(
  config => {
    const TOKEN = sessionStorage.getItem('authorization');
    if (!TOKEN) return config;
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${JSON.parse(TOKEN)}`;
    return config;
  },
  error => Promise.reject(error),
);

request.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default request;
