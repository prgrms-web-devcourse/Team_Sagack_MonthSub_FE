import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Title } from '@components';
import theme from '@styles/theme';

const Input = ({
  name,
  width,
  height,
  disabled,
  value,
  type,
  placeholder,
  onChange,
  title,
  ...props
}) => (
  <>
    <Title style={{ display: title ? 'block' : 'none' }} name={title} />
    <StyledInput
      name={name}
      width={width}
      height={height}
      disabled={disabled}
      value={value}
      type={type}
      title={title}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  </>
);

Input.defaultProps = {
  width: 'auto',
  height: 'auto',
  disabled: false,
  type: 'text',
  placeholder: '',
  title: '',
  value: '',
  onChange: () => {},
  name: '',
};

Input.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;

const StyledInput = styled.input`
  width: ${({ width }) => (typeof width === 'number' ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}rem` : height};
  padding: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  box-shadow: ${theme.style.boxShadow};
  background-color: #ffffff;
  &:focus {
    background-color: #ffffff;
    outline: 0.063rem solid ${theme.color.main};
  }
`;
