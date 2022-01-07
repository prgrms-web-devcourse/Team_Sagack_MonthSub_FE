import axios from 'axios';

const { REACT_APP_API_END_POINT } = process.env;
const token = sessionStorage.getItem('authorization');

const request = axios.create({
  baseURL: `${REACT_APP_API_END_POINT}`,
  timeout: 5000,
  headers: {
    ...(token && { Authorization: `Bearer ${JSON.parse(token)}` }),
  },
});

request.interceptors.request.use(
  config =>
    // 이 부분에서 리프레스 토큰 처리해주면 됩니다
    config,
  error => Promise.reject(error),
);

request.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default request;
