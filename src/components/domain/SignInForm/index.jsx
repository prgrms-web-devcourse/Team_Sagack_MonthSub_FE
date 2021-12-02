import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useSignInForm } from '@hooks';
import Input from '@components/commons/Input';
import validationEmail from '@utils/validation';

const SignInForm = ({ onSubmit }) => {
  const { values, errors, handleChange, handleSignInSubmit } = useSignInForm({
    initialValues: {
      email: '',
      password: '',
    },
    // 여기서 벨류는 e-mail password
    onSubmit: async value => {
      onSubmit && (await onSubmit(value));
    },
    validate: ({ email, password }) => {
      const newErrors = {};
      if (!email) newErrors.id = '이메일을 입력해주세요.';
      if (!password) newErrors.password = '비밀번호를 입력해주세요.';
      if (!validationEmail(email)) newErrors.id = '잘못된 이메일 형식입니다.';
      return newErrors;
    },
  });

  return (
    <form onSubmit={handleSignInSubmit}>
      <h1>Login</h1>
      <Input
        name="id"
        value={values.email}
        type="text"
        placeholder="아이디"
        onChange={handleChange}
      />
      <ErrorMessage>{errors.email}&nbsp;</ErrorMessage>
      <Input
        name="password"
        value={values.password}
        type="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <ErrorMessage>{errors.password}&nbsp;</ErrorMessage>
      <button type="submit">submit</button>
    </form>
  );
};

export default SignInForm;

SignInForm.defaultProps = {
  onSubmit: () => {},
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
};

const ErrorMessage = styled.span`
  margin: 16px 0;
  color: red;
`;
