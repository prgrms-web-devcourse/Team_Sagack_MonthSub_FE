import React from 'react';
import { Wrapper, SignUpForm } from '@components';

const SignUpPage = () => {
  const postSignUp = data => {
    // data = { email: '', name: '', nickname: '', password: ''}
    console.log(data);
  };
  return (
    <Wrapper>
      <SignUpForm onSubmit={postSignUp} />
    </Wrapper>
  );
};

export default SignUpPage;
