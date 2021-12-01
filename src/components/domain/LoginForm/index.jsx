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
    onSubmit: async data => {
      onSubmit && (await onSubmit(data));
    },
    validate: ({ id, password }) => {
      const newErrors = {};
      if (!id) newErrors.id = '아이디를 입력해주세요.';
      if (!password) newErrors.password = '비밀번호를 입력해주세요.';
      return newErrors;
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <H1>Login</H1>
      <Input
        name="id"
        value={values.id}
        type="text"
        placeholder="아이디를 입력해주세요."
        onChange={handleChange}
      />
      <ErrorMessage>{errors.id}&nbsp;</ErrorMessage>
      <Input
        name="password"
        value={values.password}
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={handleChange}
      />
      <ErrorMessage>{errors.password}&nbsp;</ErrorMessage>
      <button type="submit">submit</button>
    </Form>
  );
};

export default LoginForm;

LoginForm.defaultProps = {
  onSubmit: () => {},
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const H1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.span`
  margin: 0.2rem 0 0.5rem 0;
  color: red;
  font-size: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`;
