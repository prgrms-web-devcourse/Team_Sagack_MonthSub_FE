import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

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
    <Title style={{ display: title ? 'block' : 'none' }}>{title}</Title>
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
export default Input;

Input.defaultProps = {
  width: 'auto',
  height: 'auto',
  disabled: false,
  type: 'text',
  placeholder: '',
  title: '',
  onChange: () => {},
};

Input.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

const StyledInput = styled.input`
  width: ${({ width }) => (typeof width === 'number' ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}rem` : height};
  padding: 0.2rem;
  border: #041b1d 0.063rem;
  background-color: #ffffff;
  box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
    0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
  &:focus {
    background-color: #ffffff;
    border: #041b1d 0.063rem;
    box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
      0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
  }
  margin: 1rem 0 0.5rem 0;
`;

const Title = styled.h1`
  margin-bottom: 0.2rem;
  font-weight: 700;
`;
