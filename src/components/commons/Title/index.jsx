import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '@styles/theme';

const Title = ({
  children,
  h2,
  h3,
  h4,
  h5,
  h6,
  size,
  color,
  weight,
  marginBottom,
  extraItem,
  ...props
}) => {
  const Tag = h2 ? 'h2' : h3 ? 'h3' : h4 ? 'h4' : h5 ? 'h5' : h6 ? 'h6' : 'h1';
  const StyledTag = styled(Tag)`
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
    font-weight: ${({ weight }) => weight};
    color: ${({ color }) => color};
    margin-bottom: ${({ marginBottom }) =>
      typeof marginBottom === 'number' ? `${marginBottom}rem` : marginBottom};
    display: flex;
    justify-content: space-between;
  `;
  return (
    <StyledTag
      size={size}
      weight={weight}
      color={color}
      marginBottom={marginBottom}
      {...props}
    >
      {children}
      {extraItem}
    </StyledTag>
  );
};
Title.defaultProps = {
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  marginBottom: '1.5rem',
  weight: 700,
  size: 'large',
  color: theme.color.greyDark,
  extraItem: null,
};
Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  color: PropTypes.string,
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  weight: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  extraItem: PropTypes.node,
};
export default Title;
