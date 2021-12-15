import { GET, POST, PUT } from './axios';

export const getArticleDetail = async ({ articleId, seriesId }) =>
  GET({
    url: `/articles/${articleId}?seriesId=${seriesId}`,
    isAuth: true,
    isJsonType: false,
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
