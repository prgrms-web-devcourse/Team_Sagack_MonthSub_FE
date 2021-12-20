import { GET, POST, PUT } from './axios';

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
  });
};

export const patchMyInfo = async data => {
  PUT({
    url: '/users/me',
    data,
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

export const getMyLikes = async () =>
  GET({
    url: '/likes',
  });
