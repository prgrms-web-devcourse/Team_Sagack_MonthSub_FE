import { GET, POST, PATCH } from './axios';

export const getMain = async () =>
  GET({
    url: '/main',
    isAuth: false,
    isJsonType: false,
  });

export const getMyInfo = async () =>
  GET({
    url: '/users/me',
    isAuth: true,
    isJsonType: false,
  });

export const postMyProfileImage = async data => {
  POST({
    url: '/users/profile',
    data,
    isAuth: true,
    isJsonType: false,
  });
};

export const patchMyInfo = async data => {
  PATCH({
    url: '/users/me',
    data,
    isAuth: true,
    isJsonType: false,
  });
};

export const getMyWriteSeries = async () =>
  GET({
    url: '/series/writer/posts',
  });
