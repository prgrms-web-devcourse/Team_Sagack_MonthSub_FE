import React from 'react';
import styled from '@emotion/styled';
import { useForm } from '@hooks';
import { Input } from '@components';
import validationEmail from '@utils/validationEmail';
import validationPassword from '@utils/validationPassword';
import { useHistory } from 'react-router-dom';
import { postSignUp } from '@apis/auth';

const SignUpForm = () => {
  const history = useHistory();
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      userName: '',
      password: '',
      nickName: '',
    },
    onSubmit: async requestData => {
      const { data } = await postSignUp(requestData);

      if (data.code === 'A005') alert('이미 가입된 이메일입니다.');
      if (data.code === 'A006') alert('이미 가입된 닉네임입니다.');

      !data.code && history.push('/');
    },
    validate: ({ email, userName, password, nickName }) => {
      const newErrors = {};
      if (!email) newErrors.email = '이메일을 입력해주세요.';
      else if (!validationEmail(email))
        newErrors.email = '잘못된 이메일 형식입니다.';

      if (!userName) newErrors.userName = '이름을 입력해주세요.';
      if (!password) newErrors.password = '비밀번호를 입력해주세요.';
      else if (!validationPassword(password))
        newErrors.password =
          '비밀번호는 8자 이상, 숫자, 대문자, 소문자, 특수문자를 모두 포함해야 합니다';
      if (!nickName) newErrors.nickName = '닉네임을 입력해주세요.';
      return newErrors;
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <H1>회원가입</H1>
      <Span>
        <Input
          width="100%"
          height="2.5rem"
          name="email"
          value={values.email}
          type="text"
          placeholder="이메일을 입력해주세요."
          onChange={handleChange}
        />
      </Span>
      <ErrorMessage>{errors.email}&nbsp;</ErrorMessage>
      <Input
        width="100%"
        height="2.5rem"
        name="userName"
        value={values.userName}
        type="text"
        placeholder="이름을 입력해주세요."
        onChange={handleChange}
      />
      <ErrorMessage>{errors.userName}&nbsp;</ErrorMessage>
      <Span>
        <Input
          width="100%"
          height="2.5rem"
          name="nickName"
          value={values.nickName}
          type="text"
          placeholder="닉네임을 입력해주세요."
          onChange={handleChange}
        />
      </Span>
      <ErrorMessage>{errors.nickName}&nbsp;</ErrorMessage>
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
      <SubmitButton type="submit">회원가입</SubmitButton>
    </Form>
  );
};

export default SignUpForm;

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
  padding: 5rem 0;
  margin: 0 auto;
  text-align: center;
`;

const SubmitButton = styled.button`
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
  display: flex;
  justify-content: space-between;
`;
