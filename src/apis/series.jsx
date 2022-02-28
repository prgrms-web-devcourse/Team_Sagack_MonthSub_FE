import { GET, POST, PUT, DELETE } from './axios';

export const getSeries = async params =>
  GET({
    url: '/series',
    params,
  });

export const getSeriesDetail = async ({ id }) =>
  GET({
    url: `/series/${id}`,
  });

export const getPopularSeries = async () =>
  GET({
    url: `/series/popular`,
  });

export const getRecentSeries = async () =>
  GET({
    url: `/series/recent`,
  });

export const postSeries = async ({ data }) =>
  POST({
    url: '/series',
    data,
  });

export const putSeries = async ({ data, id }) =>
  PUT({
    url: `/series/${id}/edit`,
    data,
    isJsonType: true,
  });

export const postSeriesComment = async data =>
  POST({
    url: '/series/comments',
    data,
  });

export const getSeriesComment = async params =>
  GET({
    url: '/series/comments',
    params,
  });

export const putSeriesComment = async data =>
  PUT({
    url: `/series/comments`,
    data,
    isJsonType: true,
  });

export const deleteSeriesComment = async id =>
  DELETE({
    url: `/series/comments/${id}`,
  });
