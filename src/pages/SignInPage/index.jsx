import React from 'react';
import Wrapper from '@components/commons/Wrapper';
import SignInForm from '@components/domain/SignInForm';
import { useSessionStorage } from '@hooks';
// import Crypto from 'crypto-js';
import { useHistory } from 'react-router-dom';
import { postSignIn } from '../../apis/auth.jsx';
// const { REACT_APP_SECRET_KEY } = process.env;

const SignInPage = () => {
  const history = useHistory();
  const { setValue } = useSessionStorage('authorization', '');

  const handleSubmit = async values => {
    const { location } = window;
    const { state: intendedLocation } = history.location;
    try {
      const res = await postSignIn(values);

      if (res.data.statusCode === 200) {
        setValue(res.data.data.token);

        if (!intendedLocation) {
          location.replace('/');
          return;
        }

        location.replace(intendedLocation.from);
      }
    } catch (error) {
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <Wrapper width="71.25rem">
      <SignInForm onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default SignInPage;
