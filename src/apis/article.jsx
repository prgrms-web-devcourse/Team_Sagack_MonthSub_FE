import { GET, POST, PUT } from './axios';

export const getArticleDetail = async ({ id }) => {
  const respones = GET({
    url: `/articles/${id}`,
    isAuth: true,
    isJsonType: false,
  });
  return respones;
};

export const postArticle = async data => {
  const response = await POST({
    url: '/articles',
    isAuth: true,
    data,
  });
  return response;
};

export const putArticle = async (data, params) => {
  const response = await PUT({
    url: `/articles/${params}`,
    isAuth: true,
    data,
    isJsonType: true,
  });
  return response;
};

export const putArticleImage = async (data, params) => {
  const response = await PUT({
    url: `/articles/${params}/thumbnail`,
    isAuth: true,
    data,
  });
  return response;
};
