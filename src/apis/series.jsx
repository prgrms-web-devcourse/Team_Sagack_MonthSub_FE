// import axios from 'axios';
import { GET, POST, PUT } from './axios';

// const { REACT_APP_API_END_POINT } = process.env;

// export const getSeries = async ({ url }) => {
//   try {
//     const response = await axios({
//       method: 'get',
//       url: `${REACT_APP_API_END_POINT}${url}`,
//       headers: { 'Content-Type': 'application/json;charset=utf-8' },
//     });
//     if (response.status >= 400) {
//       throw new Error('API 호출에 실패 했습니다.');
//     }
//     return response.data;
//   } catch (error) {
//     alert(error);
//   }
// };

// export default getSeries;

export const getSeries = async params => {
  const response = await GET({
    url: `/series/${params}`,
    isAuth: false,
  });
  return response;
};

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
    url: `/series/edit/${params}`,
    isAuth: true,
    data,
  });
  return response;
};
