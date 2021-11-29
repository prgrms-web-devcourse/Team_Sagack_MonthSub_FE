import React from 'react';
import PropTypes from 'prop-types';
import useform from '../../../hooks/useform';

const LoginForm = ({ onSubmit }) => {
  const { values, errors, handleChange, handleSubmit } = useform({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: async () => {
      await onSubmit();
    },
    validate: ({ id, password }) => {
      const newErrors = {};
      if (!id) newErrors.id = 'id를 입력해주세요!';
      if (!password) newErrors.password = '비밀번호를 입력해주세요!';
      return newErrors;
    },
  });

  console.log(values, errors);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label htmlFor="login_id">아이디</label>
      <input
        id="login_id"
        type="text"
        name="id"
        placeholder="아이디"
        onChange={handleChange}
      />
      <label htmlFor="login_password">비밀번호</label>
      <input
        id="login_password"
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
