import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
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
  round,
  focus,
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
    round={round}
    focus={focus}
    {...props}
  />
);

Input.defaultProps = {
  width: 'auto',
  height: 'auto',
  disabled: false,
  type: 'text',
  placeholder: '',
  value: '',
  onChange: () => {},
  name: '',
  round: true,
  focus: true,
};

Input.propTypes = {
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  round: PropTypes.bool,
  focus: PropTypes.bool,
};

export default Input;

const StyledInput = styled.input`
  width: ${({ width }) => (typeof width === 'number' ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}rem` : height};
  padding: 0.5rem;
  font-size: 1rem;
  border: 0.063rem solid ${theme.color.greyMedium};
  border-radius: ${({ round }) => (round ? '0.2rem' : 'none')};
  ${({ focus }) =>
    focus
      ? `
    &:focus {
      border: 0.063rem solid ${theme.color.main};
    }
    `
      : null}
`;
