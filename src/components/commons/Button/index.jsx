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
  ...props
}) => (
  <StyledButton
    type={type}
    width={width}
    height={height}
    disabled={disabled}
    circle={circle}
    onClick={onClick}
    {...props}
  >
    {children}
  </StyledButton>
);

export default Button;

Button.defaultProps = {
  type: '',
  width: 'auto',
  height: 'auto',
  disabled: false,
  circle: false,
  onClick: () => {},
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
};

const StyledButton = styled.button`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  border: 0.0625rem solid #000;
  border-radius: ${({ circle }) => (circle ? '50px' : '4px')};
  padding: 0.5rem;
`;
