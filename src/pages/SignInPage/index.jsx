import React from 'react';
import Wrapper from '@components/commons/Wrapper';
import SignInForm from '@components/domain/SignInForm';
import { useSessionStorage } from '@hooks';
// import Crypto from 'crypto-js';
import { postSignIn } from '../../apis/auth.jsx';

// const { REACT_APP_SECRET_KEY } = process.env;

const SignInPage = () => {
  // const history = useHistory();

  const { setValue } = useSessionStorage('authorization', '');

  const handleSubmit = async values => {
    const res = await postSignIn(values);
    if (res.statusCode === 200) {
      setValue(res.data.token);
      console.log(res.data.token);
    }
  };

  return (
    <Wrapper width="71.25rem">
      <SignInForm onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default SignInPage;
