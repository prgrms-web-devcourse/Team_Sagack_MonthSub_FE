import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Container = ({ children }) => <Wrapper>{children}</Wrapper>;

Container.defaultProps = {
  children: [],
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Container;

const Wrapper = styled.div`
  width: 80%;
  height: 50%;
  margin: 15rem auto;
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
    0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
`;
