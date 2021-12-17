import axios from 'axios';
import { GET, POST, PUT } from './axios';

const { REACT_APP_API_END_POINT } = process.env;

export const getSeriesScrolling = async ({
  lastSeriesId,
  size,
  categories,
}) => {
  const response = await axios({
    method: 'get',
    url: `${REACT_APP_API_END_POINT}/series`,
    params: {
      lastSeriesId,
      size,
      categories,
    },
  });
  return response;
};

export const getSeries = async () =>
  GET({
    url: '/series?size=16&categories=ALL',
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
