import axios from 'axios';
import { POST, PUT } from './axios';

// export const getArticleDetail = async () => {
//   const res = await GET({
//     url: `/articles/2?seriesId=0`,
//     isAuth: true,
//     isJsonType: false,
//   });
//   console.log(res);
// };

export const getArticleDetail = async ({ seriesId, articleId }) => {
  const res = await axios({
    method: 'get',
    url: `https://monthsub.com/articles/${articleId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage
        .getItem('authorization')
        .replace(/\"/gi, '')}`,
    },
    params: {
      seriesId,
    },
  });
  return res;
};

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
    isJsonType: false,
  });
