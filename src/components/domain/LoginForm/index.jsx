import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useForm } from '@hooks';
import Input from '../../commons/Input';

const LoginForm = ({ onSubmit }) => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: async value => {
      onSubmit && (await onSubmit(value));
    },
    validate: ({ id, password }) => {
      const newErrors = {};
      if (!id) newErrors.id = 'id를 입력해주세요!';
      if (!password) newErrors.password = '비밀번호를 입력해주세요!';
      return newErrors;
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Input
        name="id"
        value={values.id}
        type="text"
        placeholder="아이디"
        onChange={handleChange}
      />
      <ErrorMessage>{errors.id}&nbsp;</ErrorMessage>
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

export default LoginForm;

LoginForm.defaultProps = {
  onSubmit: () => {},
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const ErrorMessage = styled.span`
  margin: 16px 0;
  color: red;
`;
