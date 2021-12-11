import axios from 'axios';

export const instance = axios.create({});
const { REACT_APP_API_END_POINT } = process.env;

export const GET = async ({ url, isAuth = false, isJsonType = false }) => {
  const headers = {
    ...(isJsonType && { 'Content-Type': 'multipart/form-data' }),
    Authorization: isAuth
      ? `Bearer ${sessionStorage.getItem('authorization').replace(/\"/gi, '')}`
      : '',
  };

  try {
    const response = await axios({
      method: 'get',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
    });
    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response;
  } catch (error) {
    alert(error);
  }
};

export const POST = async ({
  url,
  isAuth = false,
  data,
  isJsonType = false,
}) => {
  const headers = {
    ...(isJsonType && { 'Content-Type': 'multipart/form-data' }),
    Authorization: isAuth
      ? `Bearer ${sessionStorage.getItem('authorization').replace(/\"/gi, '')}`
      : '',
  };

  try {
    const response = await axios({
      method: 'post',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
      data,
    });
    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response;
  } catch (error) {
    alert(error);
  }
};

export const PUT = async ({
  url,
  isAuth = false,
  data,
  isJsonType = false,
}) => {
  const headers = {
    ...(isJsonType && { 'Content-Type': 'multipart/form-data' }),
    Authorization: isAuth
      ? `Bearer ${sessionStorage.getItem('authorization').replace(/\"/gi, '')}`
      : '',
  };
  try {
    const response = await axios({
      method: 'put',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
      data,
    });
    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response;
  } catch (error) {
    alert(error);
  }
};

export const DELETE = async ({
  url,
  isAuth = false,
  data,
  isJsonType = false,
}) => {
  const headers = {
    ...(isJsonType && { 'Content-Type': 'multipart/form-data' }),
    Authorization: isAuth
      ? `Bearer ${sessionStorage.getItem('authorization').replace(/\"/gi, '')}`
      : '',
  };

  try {
    const response = await axios({
      method: 'delete',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
      data,
    });
    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response;
  } catch (error) {
    alert(error);
  }
};

export const PATCH = async ({
  url,
  isAuth = false,
  data,
  isJsonType = false,
}) => {
  const headers = {
    ...(isJsonType && { 'Content-Type': 'application/json;charset=utf-8' }),
    Authorization: isAuth
      ? `Bearer ${sessionStorage.getItem('authorization').replace(/\"/gi, '')}`
      : '',
  };

  try {
    const response = await axios({
      method: 'patch',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
      data,
    });

    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response;
  } catch (error) {
    alert(error);
  }
};

export default { GET, POST, PUT, DELETE, PATCH };
