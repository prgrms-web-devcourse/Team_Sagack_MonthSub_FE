import axios from 'axios';
import jsonBlob from '@utils/createJsonBlob';

const { REACT_APP_API_END_POINT } = process.env;
axios.create({
  baseURL: REACT_APP_API_END_POINT,
});

export const fileAxios = async ({ method, url, file, auth, contentType }) => {
  const token = sessionStorage.getItem('authorization');
  if (auth && !token) {
    alert('로그인이 필요한 서비스입니다.');
    return;
  }

  const formData = new FormData({
    file,
  });

  const headers = {
    ...(contentType && { 'Content-Type': contentType }),
    Authorization: auth ? `Bearer ${token.replace(/\"/gi, '')}` : '',
  };

  try {
    const response = axios({
      headers,
      method,
      url,
      data: {
        formData,
      },
    });

    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }

    return response;
  } catch (error) {
    alert(error);
  }
};

export const jsonAxios = async ({ method, url, data, auth, contentType }) => {
  const token = sessionStorage.getItem('authorization');
  if (auth && !token) {
    alert('로그인이 필요한 서비스입니다.');
    return;
  }

  const headers = {
    ...(contentType && { 'Content-Type': contentType }),
    Authorization: auth ? `Bearer ${token.replace(/\"/gi, '')}` : '',
  };

  try {
    const response = axios({
      headers,
      method,
      url,
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

export const blobAxios = async ({
  method,
  url,
  data,
  file,
  auth,
  contentType,
}) => {
  const token = sessionStorage.getItem('authorization');
  if (auth && !token) {
    alert('로그인이 필요한 서비스입니다.');
    return;
  }

  const headers = {
    ...(contentType && { 'Content-Type': contentType }),
    Authorization: auth ? `Bearer ${token.replace(/\"/gi, '')}` : '',
  };

  const formData = new FormData();
  formData.append('file', file);
  formData.append('request', jsonBlob(data));

  try {
    const response = axios({
      headers,
      method,
      url,
      data: {
        formData,
      },
    });

    if (response.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }

    return response;
  } catch (error) {
    alert(error);
  }
};
