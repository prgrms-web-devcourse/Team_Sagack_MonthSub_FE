import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const PageSectionContainer = ({ children }) => (
  <SectionContainer>{children}</SectionContainer>
);

PageSectionContainer.defaultProps = {
  children: '',
};

PageSectionContainer.propTypes = {
  children: PropTypes.node,
};

export default PageSectionContainer;

const SectionContainer = styled.div``;
