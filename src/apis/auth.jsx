import { POST } from './axios';

export const postSignIn = async ({ email, password }) => {
  const response = await POST({
    url: '/users/login',
    isAuth: false,
    data: {
      email,
      password,
    },
    isJsonType: false,
  });

  return response;
};

export const postSignOut = async () =>
  POST({
    url: '/logout',
    isAuth: false,
    params: {},
    isJsonType: false,
  });
