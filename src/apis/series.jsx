import { GET, POST, PUT } from './axios';

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
