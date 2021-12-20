import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Wrapper = ({ children, width, whole, ...props }) => (
  <StyledDiv width={width} whole={whole} {...props}>
    {children}
  </StyledDiv>
);

Wrapper.defaultProps = {
  width: '71.25rem',
  whole: false,
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  whole: PropTypes.bool,
};

export default Wrapper;

const StyledDiv = styled.div`
  height: auto;
  max-width: ${props => props.width || '71.25rem'};
  margin: 0 auto;
  padding: 3rem 0;
  ${({ whole }) =>
    whole &&
    css`
      margin: 5rem auto 0;
    `}
`;
