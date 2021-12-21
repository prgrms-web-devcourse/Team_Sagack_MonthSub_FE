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
  title,
  round,
  focus,
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
      round={round}
      focus={focus}
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
  border: 0.063rem solid ${theme.color.greyMedium};
  border-radius: ${({ round }) => (round ? '0.2rem' : 'none')};
  background-color: #ffffff;
  ${theme.style.boxShadow}: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
    0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
  ${({ focus }) =>
    focus
      ? `
    &:focus {
      background-color: #ffffff;
      border: 0.063rem solid ${theme.color.main};
      ${theme.style.boxShadow}: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
        0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
    }
    `
      : null}
`;
