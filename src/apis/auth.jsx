import { POST } from './axios';

export const postSignIn = async ({ email, password }) => {
  const response = await POST({
    url: '/signin',
    data: {
      email,
      password,
    },
  });

  return response;
};

export const postSignUp = async data =>
  POST({
    url: '/signup',
    data,
  });
