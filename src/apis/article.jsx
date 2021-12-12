import { GET, POST, PUT, PATCH } from './axios';

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

export const patchArticleImage = async (data, params) => {
  const response = await PATCH({
    url: `/articles/${params}/thumbnail`,
    isAuth: true,
    data,
  });
  return response;
};
