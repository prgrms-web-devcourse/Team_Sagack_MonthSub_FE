import { GET, POST, PUT } from './axios';

export const getArticleDetail = async ({ id }) =>
  GET({
    url: `/articles/${id}`,
    isAuth: true,
    isJsonType: false,
    data: {
      seriesId: id,
    },
  });

export const postArticle = async ({ data }) =>
  POST({
    url: '/articles',
    isAuth: true,
    data,
  });

export const putArticle = async ({ data, id }) =>
  PUT({
    url: `/articles/${id}`,
    isAuth: true,
    data,
    isJsonType: true,
  });

export const putArticleImage = async ({ data, id }) =>
  PUT({
    url: `/articles/${id}/thumbnail`,
    isAuth: true,
    data,
  });
