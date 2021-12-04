import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useForm } from '@hooks';
import Input from '@components/commons/Input';
import validationEmail from '@utils/validation';

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
      <H1>Login</H1>
      <Input
        width="100%"
        height="2rem"
        name="email"
        value={values.email}
        type="text"
        placeholder="아이디를 입력해주세요."
        onChange={handleChange}
      />
      <ErrorMessage>{errors.email}&nbsp;</ErrorMessage>
      <Input
        width="100%"
        height="2rem"
        name="password"
        value={values.password}
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={handleChange}
      />
      <ErrorMessage>{errors.password}&nbsp;</ErrorMessage>
      <Button type="submit">submit</Button>
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
  margin: 100rem 0;
  color: red;
`;

const H1 = styled.h1`
  font-size: 2rem;
  margin-bottom: 4rem;
`;

const Form = styled.form`
  width: 60%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  height: 2rem;
  outline: 0;
  border: 0;
`;
