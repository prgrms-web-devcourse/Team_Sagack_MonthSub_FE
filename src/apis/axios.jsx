import Swal from 'sweetalert2';
import { errorToString } from '@utils/errors';
import request from './config';

const fetchWrap = async ({ method, url, data = {}, params = {} }) => {
  try {
    const config = {
      params,
    };

    const response =
      (method === 'get' && (await request.get(url, config))) ||
      (method === 'post' && (await request.post(url, data, config))) ||
      (method === 'put' && (await request.put(url, data, config))) ||
      (method === 'delete' && (await request.delete(url, config))) ||
      {};

    return response;
  } catch (error) {
    Swal.fire({
      title: error.response
        ? errorToString(error.response.data.code)
        : '요청 형식이 잘못되었습니다!',
      icon: 'question',
      confirmButtonText: '확인',
      confirmButtonColor: '#ffb15c',
    });

    return error;
  }
};

export const GET = ({ url, params }) =>
  fetchWrap({ method: 'get', url, params });

export const POST = ({ url, data, params }) =>
  fetchWrap({ method: 'post', url, data, params });

export const PUT = ({ url, data }) => fetchWrap({ method: 'put', url, data });

export const DELETE = ({ url }) => fetchWrap({ method: 'delete', url });
