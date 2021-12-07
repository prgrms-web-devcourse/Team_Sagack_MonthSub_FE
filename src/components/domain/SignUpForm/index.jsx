import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useForm } from '@hooks';
import { Input, Button } from '@components';
import validationEmail from '@utils/validation';

const SignUpForm = ({ onSubmit }) => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      nickname: '',
    },
    onSubmit: async data => {
      onSubmit && (await onSubmit(data));
    },
    validate: ({ email, name, password, nickname }) => {
      const newErrors = {};
      if (!email) newErrors.email = '이메일을 입력해주세요.';
      else if (!validationEmail(email))
        newErrors.email = '잘못된 이메일 형식입니다.';

      if (!name) newErrors.name = '이름을 입력해주세요.';
      if (!password) newErrors.password = '비밀번호를 입력해주세요.';
      if (!nickname) newErrors.nickname = '닉네임을 입력해주세요.';
      return newErrors;
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <H1>회원가입</H1>
      <Span>
        <Input
          width="78%"
          height="2.5rem"
          name="email"
          value={values.email}
          type="text"
          placeholder="이메일을 입력해주세요."
          onChange={handleChange}
        />
        <StyledButton type="button" width="20%" height="2.5rem">
          확인
        </StyledButton>
      </Span>
      <ErrorMessage>{errors.email}&nbsp;</ErrorMessage>
      <Input
        width="100%"
        height="2.5rem"
        name="name"
        value={values.name}
        type="text"
        placeholder="이름을 입력해주세요."
        onChange={handleChange}
      />
      <ErrorMessage>{errors.name}&nbsp;</ErrorMessage>
      <Span>
        <Input
          width="78%"
          height="2.5rem"
          name="nickname"
          value={values.nickname}
          type="text"
          placeholder="닉네임을 입력해주세요."
          onChange={handleChange}
        />
        <StyledButton type="button" width="20%" height="2.5rem">
          확인
        </StyledButton>
      </Span>
      <ErrorMessage>{errors.nickname}&nbsp;</ErrorMessage>
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

SignUpForm.defaultProps = {
  onSubmit: () => {},
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
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

const StyledButton = styled(Button)`
  margin: 1rem 0 0.5rem 0;
  background-color: #ffb15c;
  color: #041b1d;
  &:hover {
    background-color: #041b1d;
    color: #ffffff;
  }
`;