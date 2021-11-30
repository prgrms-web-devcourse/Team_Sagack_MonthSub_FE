import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'

// eslint-disable-next-line react/prop-types
const Button = ({ type, width, height, disabled, onClick }) => (
    <StyledButton
      type={type}
      width={width}
      height={height}
      disabled={disabled}
      onClick={onClick}
    >
      버튼
    </StyledButton>
  );

export default Button;

Button.defaultProps = {
  type: '',
  width: 0,
  height: 0,
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

const StyledButton = styled.button`
  type: button;
  border-radius: 1rem;
  border: 1px solid bl1ack;
  psdding: 10px;
`;