import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = ({ children, width, ...props }) => (
  <StyledDiv width={width} {...props}>
    {children}
  </StyledDiv>
);

export default Wrapper;

Wrapper.defaultProps = {
  width: '71.25rem',
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const StyledDiv = styled.div`
  height: 100%;
  min-height: 100vh;
  max-width: ${props => props.width || '71.25rem'};
  margin: 0 auto;
  /* border: 2px #000000 solid; */
  padding-top: 5rem;
`;
