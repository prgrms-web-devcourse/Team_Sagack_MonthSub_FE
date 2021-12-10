import React from 'react';
import styled from '@emotion/styled';
import { useForm, useSessionStorage } from '@hooks';
import { postSignIn } from '@apis/auth';
import { Input, Wrapper } from '@components';
import validationEmail from '@utils/validationEmail';
import { Link, useHistory } from 'react-router-dom';

const SignInPage = () => {
  const history = useHistory();
  const { setValue } = useSessionStorage('authorization', '');
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async requestData => {
      const { data } = await postSignIn(values);

      const resErrors = {};
      if (data.code === 'A002')
        resErrors.resError = '존재하지 않은 이메일입니다.';
      if (data.code === 'A003')
        resErrors.resError = '아이디 또는 비밀번호가 일치하지않습니다.';

      if (data.statusCode === 200) {
        setValue(data.data.token);
        requestData.code || history.push('/');
      }
      return resErrors;
    },
    validate: ({ email, password }) => {
      const newErrors = {};
      if (!email) newErrors.email = '이메일을 입력해주세요.';
      else if (!validationEmail(email))
        newErrors.email = '잘못된 이메일 형식입니다.';
      if (!password) newErrors.password = '비밀번호를 입력해주세요.';
      return newErrors;
    },
  });

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <H1>로그인</H1>
        <Input
          width="100%"
          height="2.5rem"
          name="email"
          value={values.email}
          type="text"
          placeholder="아이디를 입력해주세요."
          onChange={handleChange}
        />
        <ErrorMessage>{errors.email}&nbsp;</ErrorMessage>
        <Input
          width="100%"
          height="2.5rem"
          name="password"
          value={values.password}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
        />
        <ErrorMessage>{errors.password}&nbsp;</ErrorMessage>
        <Button type="submit">로그인</Button>
        <Span>
          <Link to="/signup">회원가입하기</Link>
        </Span>
        <ErrorMessage>{errors.resError}&nbsp;</ErrorMessage>
      </Form>
    </Wrapper>
  );
};

export default SignInPage;

const ErrorMessage = styled.span`
  color: #ff0000;
  font-size: 0.75rem;
`;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4rem;
`;

const Form = styled.form`
  width: 60%;
  height: 100%;
  padding: 10rem 0;
  margin: 0 auto;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  height: 2.5rem;
  outline: 0;
  border: 0;
  background-color: #041b1d;
  color: #ffffff;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
    0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
  margin-top: 1rem;

  &:hover {
    background-color: #ffb15c;
    color: #041b1d;
  }
`;

const Span = styled.span`
  margin: 1rem auto;
  width: 20%;
  display: flex;
  justify-content: space-around;
  font-size: 0.75rem;
`;
