import { POST, DELETE } from './axios';

export const addLikeSeries = async id => {
  POST({
    url: `/series/${id}/likes`,
    isAuth: true,
  });
};

export const delLikeSeries = async id => {
  DELETE({
    url: `/series/${id}/likes`,
    isAuth: true,
  });
};
