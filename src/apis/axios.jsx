import axios from 'axios';
import Swal from 'sweetalert2';
import { errorToString } from '@utils/errors';

const { REACT_APP_API_END_POINT } = process.env;

export const GET = async ({ url, isJsonType = false, params = {} }) => {
  const token = sessionStorage.getItem('authorization');
  const headers = {
    ...(isJsonType && { 'Content-Type': 'application/json;charset=utf-8' }),
    ...(token && { Authorization: `Bearer ${token.replace(/\"/gi, '')}` }),
  };

  try {
    const response = await axios({
      method: 'get',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
      params,
    });
    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response;
  } catch (error) {
    Swal.fire({
      title: errorToString(error.response.data.code),
      icon: 'question',
      confirmButtonText: '확인',
      confirmButtonColor: '#ffb15c',
    });
    return error;
  }
};

export const POST = async ({ url, data, isJsonType = false, params = {} }) => {
  const token = sessionStorage.getItem('authorization');
  const headers = {
    ...(isJsonType && { 'Content-Type': 'application/json;charset=utf-8' }),
    ...(token && { Authorization: `Bearer ${token.replace(/\"/gi, '')}` }),
  };

  try {
    const response = await axios({
      method: 'post',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
      data,
      params,
    });

    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }

    return response;
  } catch (error) {
    Swal.fire({
      title: errorToString(error.response.data.code),
      icon: 'question',
      confirmButtonText: '확인',
      confirmButtonColor: '#ffb15c',
    });
    return error;
  }
};

export const PUT = async ({ url, data, isJsonType = false, params = {} }) => {
  const token = sessionStorage.getItem('authorization');
  const headers = {
    ...(isJsonType && { 'Content-Type': 'application/json;charset=utf-8' }),
    ...(token && { Authorization: `Bearer ${token.replace(/\"/gi, '')}` }),
  };

  try {
    const response = await axios({
      method: 'put',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
      data,
      params,
    });

    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response;
  } catch (error) {
    Swal.fire({
      title: errorToString(error.response.data.code),
      icon: 'question',
      confirmButtonText: '확인',
      confirmButtonColor: '#ffb15c',
    });
    return error;
  }
};

export const PATCH = async ({ url, data, isJsonType = false, params = {} }) => {
  const token = sessionStorage.getItem('authorization');
  const headers = {
    ...(isJsonType && { 'Content-Type': 'application/json;charset=utf-8' }),
    ...(token && { Authorization: `Bearer ${token.replace(/\"/gi, '')}` }),
  };
  try {
    const response = await axios({
      method: 'patch',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
      data,
      params,
    });
    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response;
  } catch (error) {
    Swal.fire({
      title: errorToString(error.response.data.code),
      icon: 'question',
      confirmButtonText: '확인',
      confirmButtonColor: '#ffb15c',
    });
    return error;
  }
};

export const DELETE = async ({
  url,
  data,
  isJsonType = false,
  params = {},
}) => {
  const token = sessionStorage.getItem('authorization');
  const headers = {
    ...(isJsonType && { 'Content-Type': 'application/json;charset=utf-8' }),
    ...(token && { Authorization: `Bearer ${token.replace(/\"/gi, '')}` }),
  };

  try {
    const response = await axios({
      method: 'delete',
      url: `${REACT_APP_API_END_POINT}${url}`,
      headers,
      data,
      params,
    });
    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }
    return response;
  } catch (error) {
    Swal.fire({
      title: errorToString(error.response.data.code),
      icon: 'question',
      confirmButtonText: '확인',
      confirmButtonColor: '#ffb15c',
    });
    return error;
  }
};

export default { GET, POST, PUT, DELETE, PATCH };
