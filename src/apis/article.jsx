import { GET, POST, PUT } from './axios';

export const getArticleDetail = async ({ params }) =>
  GET({
    url: `/articles/${params}`,
    isAuth: true,
    isJsonType: false,
  });

export const postArticle = async ({ data }) =>
  POST({
    url: '/articles',
    isAuth: true,
    data,
  });

export const putArticle = async ({ data, params }) =>
  PUT({
    url: `/articles/${params}`,
    isAuth: true,
    data,
    isJsonType: true,
  });

export const putArticleImage = async ({ data, params }) =>
  PUT({
    url: `/articles/${params}/thumbnail`,
    isAuth: true,
    data,
  });
