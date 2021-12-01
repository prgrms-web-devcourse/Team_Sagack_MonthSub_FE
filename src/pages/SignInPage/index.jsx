import React from 'react';
import Wrapper from '@components/commons/Wrapper';
import LoginForm from '@components/domain/LoginForm';
import users from './dummyData';

const SignInPage = () => {
  const handleSubmit = data => {
    // TODO: 로그인 api 호출해야합니다.
    const { id, password } = data;
    const filteredUsers = users.filter(
      user => user.id === id && user.password === password,
    );
    if (!filteredUsers.length) {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <Wrapper width="71.25rem">
      <LoginForm onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default SignInPage;
