import { GET } from './axios';

export const getPurchaseInfo = async ({ id }) =>
  GET({
    url: `/payments/series/${id}`,
    isAuth: true,
    isJsonType: false,
  });
