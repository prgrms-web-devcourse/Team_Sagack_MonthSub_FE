import axios from 'axios';

const { REACT_APP_API_END_POINT } = process.env;

export const getSeries = async ({ url }) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${ REACT_APP_API_END_POINT }${ url }`,
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    });
    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export default getSeries;