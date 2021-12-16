import { POST, DELETE } from './axios';

export const addLikeSeries = async id => {
  POST({
    url: `/series/${id}/likes`,
  });
};

export const delLikeSeries = async id => {
  DELETE({
    url: `/series/${id}/likes`,
  });
};
