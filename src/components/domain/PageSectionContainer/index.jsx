import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const PageSectionContainer = ({ children }) => (
  <SectionContainer>
    { children }
  </SectionContainer>
);

PageSectionContainer.defaultProps = {
  children: '',
}

PageSectionContainer.propTypes = {
  children: PropTypes.node,
}

const SectionContainer = styled.div`
  margin-bottom: 50px;
`;

export default PageSectionContainer;