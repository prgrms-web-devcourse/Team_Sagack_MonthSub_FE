import { GET } from './axios';

export const getArticleDetail = async ({ id }) =>
  GET({
    url: `/articles/${id}`,
    isAuth: true,
    isJsonType: false,
  });
