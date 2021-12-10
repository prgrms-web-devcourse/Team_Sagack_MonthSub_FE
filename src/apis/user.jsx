import { GET } from './axios';

export const getMyInfo = async () =>
  GET({
    url: '/users/me',
    isAuth: true,
    isJsonType: false,
  });
