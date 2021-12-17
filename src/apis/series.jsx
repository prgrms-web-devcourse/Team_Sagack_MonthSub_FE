import { GET, POST, PUT } from './axios';

export const getSeries = async () =>
  GET({
    url: '/series?size=16&categories=ALL',
  });

export const getSeriesDetail = async ({ id }) =>
  GET({
    url: `/series/${id}`,
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

export const putSeriesImage = async ({ data, id }) =>
  PUT({
    url: `/series/${id}/thumbnail`,
    data,
  });
