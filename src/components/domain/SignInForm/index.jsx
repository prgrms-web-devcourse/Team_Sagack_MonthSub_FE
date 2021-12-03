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
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Input
        name="email"
        value={values.email}
        type="text"
        placeholder="아이디를 입력해주세요."
        onChange={handleChange}
      />
      <ErrorMessage>{errors.email}&nbsp;</ErrorMessage>
      <Input
        name="password"
        value={values.password}
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={handleChange}
      />
      <ErrorMessage>{errors.password}&nbsp;</ErrorMessage>
      <button type="submit">submit</button>
    </form>
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
  margin: 16px 0;
  color: red;
`;
