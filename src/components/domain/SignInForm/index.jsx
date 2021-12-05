import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useForm } from '@hooks';
import Input from '@components/commons/Input';
import validationEmail from '@utils/validation';
import { Link } from 'react-router-dom';

const SignInForm = ({ onSubmit }) => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async data => {
      onSubmit && (await onSubmit(data));
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
        <Link to="/">아이디 찾기</Link>
        <Link to="signup">회원가입하기</Link>
      </Span>
    </Form>
  );
};

SignInForm.defaultProps = {
  onSubmit: () => {},
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default SignInForm;

const ErrorMessage = styled.span`
  color: red;
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
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
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
