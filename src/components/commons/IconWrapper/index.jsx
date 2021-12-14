import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const IconWrapper = ({ children, color, fontSize }) => (
  <StyledWrapper color={color} fontSize={fontSize}>
    {children}
  </StyledWrapper>
);

IconWrapper.defaultProps = {
  children: '',
  color: theme.color.greyDark,
  fontSize: '1.5rem',
};

IconWrapper.propTypes = {
  children: PropTypes.symbol,
  color: PropTypes.string,
  fontSize: PropTypes.string,
};

export default IconWrapper;

const StyledWrapper = styled.div`
  color: ${({ color }) => color};

  .MuiSvgIcon-root {
    font-size: ${({ fontSize }) => fontSize};
  }
`;
