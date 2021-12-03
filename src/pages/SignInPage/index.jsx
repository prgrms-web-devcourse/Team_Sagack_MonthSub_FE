import React from 'react';
import Wrapper from '@components/commons/Wrapper';
import SignInForm from '@components/domain/SignInForm';

const SignInPage = () => {
  const handleSubmit = value => {
    // TODO: 로그인 api 호출해야합니다.
    console.log(value);
  };

  return (
    <Wrapper width="71.25rem">
      <SignInForm onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default SignInPage;
