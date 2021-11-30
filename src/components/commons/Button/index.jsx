import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'

const Button = ({ type, width, height, disabled, onClick, children }) => (
    <StyledButton
      type={type}
      width={width}
      height={height}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );

export default Button;

Button.defaultProps = {
  type: '',
  width: 0,
  height: 0,
  disabled: false,
  onClick: () => { },
  children: 'text',
};

Button.propTypes = {
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

const StyledButton = styled.button`
  type: button;
  border: 0.0625rem solid #000;
  padding: 0.5rem;
`;