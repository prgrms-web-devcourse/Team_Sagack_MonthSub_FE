import { GET, POST, PUT } from './axios';

export const getArticleDetail = async ({ id }) => {
  const respones = GET({
    url: `/articles/${id}`,
    isAuth: true,
    isJsonType: false,
  });
  return respones;
};

export const postArticles = async data => {
  const response = await POST({
    url: '/articles',
    isAuth: true,
    data,
    isJsonType: false,
  });
  return response;
};

export const putArticles = async (data, params) => {
  const response = await PUT({
    url: `/articles/${params}`,
    isAuth: true,
    data,
  });
  return response;
};

// export const patchSeriesImage = async (data, params) => {
//   const response = await PATCH({
//     url: `/series/${params}/thumbnail`,
//     isAuth: true,
//     data,
//   });
//   return response;
// };
