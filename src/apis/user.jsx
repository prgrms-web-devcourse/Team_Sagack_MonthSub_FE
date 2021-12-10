import axios from './axios';

export const instance = axios.create({});

export const getMyInfo = async () => {
  instance.defaults.headers.common.Authorization =
    sessionStorage.getItem('Authorization');
  const response = await axios({
    url: 'https://monthsub.com/users/me',
    method: 'get',
    headers: {
      Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
    },
    withCredentials: true,
  });
  alert(response);
};
