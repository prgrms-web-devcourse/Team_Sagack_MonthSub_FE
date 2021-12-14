import { GET, POST, PUT } from './axios';

export const getArticleDetail = async ({ data, id }) =>
  GET({
    url: `/articles/${id}`,
    isAuth: true,
    isJsonType: false,
    data: {
      seriesId: data,
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
