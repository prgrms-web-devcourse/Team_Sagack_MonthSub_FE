import React from 'react';
import Wrapper from '@components/commons/Wrapper';
import SignInForm from '@components/domain/SignInForm';
import { useHistory } from 'react-router-dom';
import { useSessionStorage } from '@hooks';
import data from './dummy';

const SignInPage = () => {
  const history = useHistory();
  const { setValue } = useSessionStorage('authorization', '');
  const handleSubmit = values => {
    // TODO: 로그인 api 호출해야합니다. reponse.data.token에 토큰 존재!
    const { email, password } = values;
    data.map(item => {
      if (item.email === email && item.password === password) {
        setValue(`${email}${password}`);
        history.push('/');
      }
      return item;
    });
  };

  return (
    <Wrapper width="71.25rem">
      <SignInForm onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default SignInPage;
