import { POST, DELETE, GET } from './axios';

export const postFollow = async ({ id }) =>
  POST({
    url: `/writers/${id}/follow`,
  });

export const deleteFollow = async ({ id }) =>
  DELETE({
    url: `/writers/${id}/follow`,
  });

export const getOtherFollowList = async ({ id, params }) =>
  GET({
    url: `/writers/likes/others/${id}`,
    params,
  });

export const getMyFollowList = async ({ params }) =>
  GET({
    url: '/writers/likes',
    params,
  });
