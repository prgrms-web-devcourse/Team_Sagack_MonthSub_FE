import React from 'react';
import type { HTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

interface IconWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  fontSize?: number | string;
}

const IconWrapper = ({
  children,
  color,
  fontSize,
}: IconWrapperProps): ReactElement => (
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
  children: PropTypes.element,
  color: PropTypes.string,
  fontSize: PropTypes.string,
};

export default IconWrapper;

const StyledWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  color: ${({ color }) => color};

  .MuiSvgIcon-root {
    font-size: ${({ fontSize }) => fontSize};
  }
`;
