import axios from 'axios';

const { REACT_APP_API_END_POINT } = process.env;

export const getSearchWithTitle = async ({ check, keyword }) => {
  const response = await axios({
    headers: {
      Authorization: '',
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: `${REACT_APP_API_END_POINT}/series/search/${check}`,
    params: {
      [check]: keyword,
    },
  });
  return response;
};
