import { GET, POST, PUT } from './axios';

export const getSeries = async () =>
  GET({
    url: `/series/sort?sort=RECENT`,
    isAuth: false,
  });

export const getSeriesDetail = async ({ params }) =>
  GET({
    url: `/series/${params}`,
    isAuth: false,
  });

export const postSeries = async ({ data }) =>
  POST({
    url: '/series',
    isAuth: true,
    data,
  });

export const putSeries = async ({ data, params }) =>
  PUT({
    url: `/series/${params}/edit`,
    isAuth: true,
    data,
    isJsonType: true,
  });

export const putSeriesImage = async ({ data, params }) =>
  PUT({
    url: `/series/${params}/thumbnail`,
    isAuth: true,
    data,
  });
