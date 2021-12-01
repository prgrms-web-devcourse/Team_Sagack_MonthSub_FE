import React from 'react';
import Wrapper from '@components/commons/Wrapper';
import LoginForm from '@components/domain/LoginForm';

const SignInPage = () => {
  const handleSubmit = () => {
    // TODO: 로그인 api 호출해야합니다.
  };

  return (
    <Wrapper width="71.25rem">
      <LoginForm onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default SignInPage;
