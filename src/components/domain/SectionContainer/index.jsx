import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SectionContainer = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

SectionContainer.defaultProps = {
  children: '',
};

SectionContainer.propTypes = {
  children: PropTypes.node,
};

export default SectionContainer;

const StyledContainer = styled.div`
  margin-bottom: 80px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
