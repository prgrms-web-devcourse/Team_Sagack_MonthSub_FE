import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { ButtonHTMLAttributes, ReactElement } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  name?: string;
  value?: string;
  margin?: string | number;
  round?: boolean;
}

const Button = ({
  type,
  width,
  height,
  disabled,
  circle,
  onClick,
  children,
  name,
  value,
  margin,
  round,
  ...props
}: ButtonProps): ReactElement => (
  <StyledButton
    type={type}
    width={width}
    height={height}
    disabled={disabled}
    circle={circle}
    name={name}
    value={value}
    onClick={onClick}
    margin={margin}
    round={round}
    {...props}
  >
    {children}
  </StyledButton>
);

export default Button;

Button.defaultProps = {
  width: 'auto',
  height: 'auto',
  circle: false,
  name: '',
  value: '',
  margin: 0,
  round: true,
};

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}rem` : height};
  border: 0.0625rem solid ${theme.color.main};
  border-radius: ${({ round }) => (round ? '0.25rem' : 'none')};
  padding: 0.5rem;
  margin: 0 ${({ margin }) => `${margin}rem`};
  color: ${theme.color.main};
  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: ${theme.color.main};
    transition: all 200ms ease-out;
  }
  ${({ circle }) =>
    circle &&
    css`
      border: none;
      border-radius: 50px;
      box-shadow: ${theme.style.boxShadow};
    `}
`;
