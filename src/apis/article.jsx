import { GET, POST, PUT } from './axios';

export const getArticleDetail = async ({ seriesId, articleId }) =>
  GET({
    url: `/articles/${articleId}`,
    params: { seriesId },
  });

export const postArticle = async ({ data }) =>
  POST({
    url: '/articles',
    data,
  });

export const putArticle = async ({ data, id }) =>
  PUT({
    url: `/articles/${id}`,
    data,
  });
