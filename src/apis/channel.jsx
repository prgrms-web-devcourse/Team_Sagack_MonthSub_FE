import { GET } from './axios';

export const getMyChannel = async () =>
  GET({
    url: `/channel/me`,
  });

export const getChannel = async id =>
  GET({
    url: `/channel/users/${id}/other`,
  });
