import { GET } from './axios';

export const getSearchWithTitle = async ({ check, keyword }) =>
  GET({
    url: `/series/search/${check}`,
    params: {
      [check]: keyword,
    },
  });
