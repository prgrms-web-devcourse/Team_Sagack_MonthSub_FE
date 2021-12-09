import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Title = ({
  name,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  size,
  weight,
  marginBottom,
  ...props
}) => {
  const Tag = h1
    ? 'h1'
    : h2
    ? 'h2'
    : h3
    ? 'h3'
    : h4
    ? 'h4'
    : h5
    ? 'h5'
    : h6
    ? 'h6'
    : 'div';

  const StyledTag = styled(Tag)`
    font-size: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
    font-weight: ${({ weight }) => weight};
    margin-bottom: ${({ marginBottom }) =>
      typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom};
  `;

  return (
    <StyledTag
      size={size}
      weight={weight}
      marginBottom={marginBottom}
      {...props}
    >
      {name}
    </StyledTag>
  );
};
export default Title;

Title.defaultProps = {
  h1: true,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  marginBottom: '1rem',
  weight: 700,
  size: '1.125rem',
};

Title.propTypes = {
  name: PropTypes.string.isRequired,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  weight: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
