import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '@styles/theme';

const SectionTitle = ({ children, size, ...props }) => (
  <Heading size={size} {...props}>
    {children}
  </Heading>
);

const Heading = styled.h3`
  margin-bottom: 1.8rem;
  font-weight: 700;
  font-size: ${({ size }) =>
    size === 'small'
      ? theme.font.small
      : size === 'base'
      ? theme.font.base
      : size === 'medium'
      ? theme.font.medium
      : size === 'large'
      ? theme.font.large
      : size === 'xLarge'
      ? theme.font.xLarge
      : typeof size === 'number'
      ? `${size}rem`
      : size};
  color: ${theme.color.greyDark};
`;

export default SectionTitle;

SectionTitle.defaultProps = {
  size: 'large',
};

SectionTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
