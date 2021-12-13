import { GET, POST, PUT } from './axios';

export const getSeries = async () =>
  GET({
    url: `/series/all?size=16`,
    isAuth: false,
  });

export const getSeriesDetail = async ({ params }) =>
  GET({
    url: `/series/${params}`,
    isAuth: false,
  });

export const postSeries = async data => {
  const response = await POST({
    url: '/series',
    isAuth: true,
    data,
  });
  return response;
};

export const putSeries = async (data, params) => {
  const response = await PUT({
    url: `/series/${params}/edit`,
    isAuth: true,
    data,
    isJsonType: true,
  });
  return response;
};

export const putSeriesImage = async (data, params) => {
  const response = await PUT({
    url: `/series/${params}/thumbnail`,
    isAuth: true,
    data,
  });
  return response;
};
