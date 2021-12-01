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
  ...props
}) => (
  <StyledInput
    name={name}
    width={width}
    height={height}
    disabled={disabled}
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    {...props}
  />
);
export default Input;

Input.defaultProps = {
  width: 'auto',
  height: 'auto',
  disabled: false,
  type: 'text',
  placeholder: '',
  onChange: () => {},
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

const StyledInput = styled.input`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  padding: 0.2rem;
`;
