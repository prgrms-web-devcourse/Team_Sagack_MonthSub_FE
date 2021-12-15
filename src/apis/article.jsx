import axios from 'axios';
import { POST, PUT } from './axios';

const { REACT_APP_API_END_POINT } = process.env;

export const getArticleDetail = async ({ seriesId, articleId }) => {
  const res = await axios({
    method: 'get',
    url: `${REACT_APP_API_END_POINT}/articles/${articleId}`,
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
