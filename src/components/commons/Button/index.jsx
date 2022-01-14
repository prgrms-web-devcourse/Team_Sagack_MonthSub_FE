import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@styles/theme';

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
}) => (
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
  type: 'button',
  width: 'auto',
  height: 'auto',
  disabled: false,
  circle: false,
  onClick: () => {},
  name: '',
  value: '',
  children: 'text',
  margin: 1,
  round: true,
};

Button.propTypes = {
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  circle: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  name: PropTypes.string,
  value: PropTypes.string,
  margin: PropTypes.number,
  round: PropTypes.bool,
};

const StyledButton = styled.button`
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
