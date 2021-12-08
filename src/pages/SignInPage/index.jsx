import React from 'react';
import Wrapper from '@components/commons/Wrapper';
import SignInForm from '@components/domain/SignInForm';
import { useSessionStorage } from '@hooks';
import { useHistory } from 'react-router-dom';
import { postSignIn } from '@apis/auth';

const SignInPage = () => {
  const history = useHistory();
  const { setValue } = useSessionStorage('authorization', '');

  const handleSubmit = async values => {
    const { location } = window;
    const { state: intendedLocation } = history.location;
    try {
      const { data } = await postSignIn(values);

      if (data.statusCode === 200) {
        setValue(data.data.token);

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
