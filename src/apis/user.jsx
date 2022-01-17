import { GET, PUT } from './axios';

export const getMain = async () =>
  GET({
    url: '/',
    isJsonType: false,
  });

export const getMyInfo = async () =>
  GET({
    url: '/users/me',
    isJsonType: false,
  });

export const putMyInfo = async data => {
  PUT({
    url: '/users/me',
    data,
  });
};

export const getMyPurchaseSeries = async () =>
  GET({
    url: '/series/subscribe',
  });

export const getMyWriteSeries = async () =>
  GET({
    url: '/series/writer/posts',
  });

export const getMyLikes = async () =>
  GET({
    url: '/series/likes',
  });
