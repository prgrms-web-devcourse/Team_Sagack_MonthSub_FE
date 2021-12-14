import { GET, POST, PUT } from './axios';

export const getSeries = async () =>
  GET({
    url: '/series/all?size=16',
    isAuth: false,
  });

export const getSeriesDetail = async ({ id }) =>
  GET({
    url: `/series/${id}`,
    isAuth: false,
  });

export const postSeries = async ({ data }) =>
  POST({
    url: '/series',
    isAuth: true,
    data,
  });

export const putSeries = async ({ data, id }) =>
  PUT({
    url: `/series/${id}/edit`,
    isAuth: true,
    data,
    isJsonType: true,
  });

export const putSeriesImage = async ({ data, id }) =>
  PUT({
    url: `/series/${id}/thumbnail`,
    isAuth: true,
    data,
  });
