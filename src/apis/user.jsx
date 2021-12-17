import { GET, POST, PATCH } from './axios';

export const getMain = async () =>
  GET({
    url: '/main',
    isJsonType: false,
  });

export const getMyInfo = async () =>
  GET({
    url: '/users/me',
    isJsonType: false,
  });

export const postMyProfileImage = async data => {
  POST({
    url: '/users/profile',
    data,
    isJsonType: false,
  });
};

export const patchMyInfo = async data => {
  PATCH({
    url: '/users/me',
    data,
    isJsonType: false,
  });
};

export const getMyPurchaseSeries = async () =>
  GET({
    url: '/series/users/subscribe',
  });

export const getMyWriteSeries = async () =>
  GET({
    url: '/series/writer/posts',
  });
