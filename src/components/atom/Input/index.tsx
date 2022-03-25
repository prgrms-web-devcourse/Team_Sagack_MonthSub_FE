import React from 'react';
import type { InputHTMLAttributes, ReactElement, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string | number;
  height?: string | number;
  round?: boolean;
  focus?: boolean;
}

const handleKeyDown = (e: KeyboardEvent) => {
  e.key === 'Enter' && e.preventDefault();
};

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
}: InputProps): ReactElement => (
  <StyledInput
    name={name}
    width={width}
    height={height}
    disabled={disabled}
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={handleKeyDown}
    round={round}
    focus={focus}
    {...props}
  />
);

Input.defaultProps = {
  width: 'auto',
  height: 'auto',
  round: true,
  focus: true,
};

export default Input;

const StyledInput = styled.input<InputProps>`
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
