import { GET, POST } from './axios';

export const getPurchaseInfo = async ({ id }) =>
  GET({
    url: `/payments/series/${id}`,
  });

export const postPurchase = async ({ id }) =>
  POST({
    url: `/payments/series/${id}`,
  });
