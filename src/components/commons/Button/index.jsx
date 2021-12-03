import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

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
};

Button.propTypes = {
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  circle: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

const StyledButton = styled.button`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  border: 0.0625rem solid #000;
  border-radius: ${({ circle }) => (circle ? '50px' : '4px')};
  padding: 0.5rem;
`;
