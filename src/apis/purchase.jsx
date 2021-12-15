import { GET, POST } from './axios';

export const getPurchaseInfo = async ({ id }) =>
  GET({
    url: `/payments/series/${id}`,
    isAuth: true,
    isJsonType: false,
  });

export const postPurchase = async ({ id }) => {
  POST({
    url: `/payments/series/${id}`,
    isAuth: true,
    isJsonType: false,
  });
};
