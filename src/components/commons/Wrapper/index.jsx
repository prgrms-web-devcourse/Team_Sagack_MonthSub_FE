import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = ({ children, width }) => (
  <StyledDiv width={width}>{children}</StyledDiv>
);

export default Wrapper;

Wrapper.defaultProps = {
  width: 0,
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const StyledDiv = styled.div`
  text-align: center;
  border: 2px #000000 solid;
  width: ${props => props.width || '71.25rem'};
`;
