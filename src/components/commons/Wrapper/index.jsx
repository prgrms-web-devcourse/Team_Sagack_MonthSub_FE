import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = ({ children, width }) => (
  <StyledDiv width={width}>{children}</StyledDiv>
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: ${props => props.width || '71.25rem'};
  margin: 0 auto;
  text-align: center;
  border: 2px #000000 solid;
`;
