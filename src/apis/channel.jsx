import { GET } from './axios';

export const getMyChannel = async () => {
  const response = await GET({
    url: `/channel/me`,
    isAuth: true,
  });

  return response.data;
};

export const getChannel = async id => {
  const response = await GET({
    url: `/channel/users/${id}/other`,
    isAuth: true,
  });

  return response.data;
};
